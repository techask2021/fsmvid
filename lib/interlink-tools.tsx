import Link from 'next/link';
import { Platform, getUrlSlug, getPlatformName } from './download/platform-detector';
import React, { ReactNode } from 'react';

// Define the list of all available tools/platforms
const allPlatforms: Platform[] = [
  "youtube",
  "tiktok",
  "facebook",
  "twitter",
  "instagram",
  "dailymotion",
  "telegram",
  "tumblr",
  "snapchat",
  "pinterest",
  "linkedin",
  "imgur",
  "rumble",
  "9gag",
  "bitchute",
  "bsky",
  "capcut",
  "douyin",
  "kuaishou",
  "espn",
  "febspot",
  "ifunny",
  "imdb",
  "mixcloud",
  "reddit",
  "soundcloud",
  "spotify",
  "ted",
  "threads",
  "weibo",
  "xiaohongshu",
  "zingmp3",
];

// Helper function to generate a regex pattern that matches tool names in text
// The pattern will match both normal case and capitalized versions
const generateToolNamePattern = () => {
  const platformNames = allPlatforms.map(platform => getPlatformName(platform));
  const patterns = platformNames.map(name => `\\b${name}\\b`);
  return new RegExp(`(${patterns.join('|')})`, 'gi');
};

// Function to interlink tool names in HTML content
export const interlinkToolNames = (content: string, currentPlatform?: Platform): React.ReactElement => {
  if (!content) return <></>;
  
  const toolNamePattern = generateToolNamePattern();
  const parts: (string | React.ReactElement)[] = [];
  let lastIndex = 0;
  let match;
  
  // Create a copy of the content to work with
  const contentCopy = content.toString();
  
  // Reset the regex lastIndex
  toolNamePattern.lastIndex = 0;
  
  // Find all matches in the content
  while ((match = toolNamePattern.exec(contentCopy)) !== null) {
    const matchedText = match[0];
    const matchIndex = match.index;
    
    // Get platform name in correct case
    const platformName = matchedText.charAt(0).toUpperCase() + matchedText.slice(1).toLowerCase();
    
    // Find the platform key
    const platformKey = allPlatforms.find(
      platform => getPlatformName(platform).toLowerCase() === platformName.toLowerCase()
    );
    
    // Skip if the platform is the current one (don't link to the current page)
    if (platformKey && platformKey === currentPlatform) {
      // Add text before this match
      if (matchIndex > lastIndex) {
        parts.push(contentCopy.slice(lastIndex, matchIndex));
      }
      
      // Add the matched text without a link
      parts.push(matchedText);
      
      // Update lastIndex
      lastIndex = matchIndex + matchedText.length;
      continue;
    }
    
    // Add text before this match
    if (matchIndex > lastIndex) {
      parts.push(contentCopy.slice(lastIndex, matchIndex));
    }
    
    // Add the matched text with a link if we have a valid platform
    if (platformKey) {
      const platformSlug = getUrlSlug(platformKey);
      parts.push(
        <Link 
          key={`${platformKey}-${matchIndex}`} 
          href={`/${platformSlug}`}
          className="text-primary hover:underline font-medium"
        >
          {matchedText}
        </Link>
      );
    } else {
      // If no valid platform is found, just add the text
      parts.push(matchedText);
    }
    
    // Update lastIndex
    lastIndex = matchIndex + matchedText.length;
  }
  
  // Add any remaining text
  if (lastIndex < contentCopy.length) {
    parts.push(contentCopy.slice(lastIndex));
  }
  
  // Return the content with interlinked tool names
  return <>{parts}</>;
};

// Helper component to wrap text content with interlinked tool names
export const InterlinkText: React.FC<{ 
  children: ReactNode;
  currentPlatform?: Platform;
}> = ({ children, currentPlatform }) => {
  if (typeof children === 'string') {
    return interlinkToolNames(children, currentPlatform);
  }
  return <>{children}</>;
};
