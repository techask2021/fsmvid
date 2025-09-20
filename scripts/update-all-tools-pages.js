#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all tools pages
const toolsPages = [
  'youtube-video-saver',
  'tiktok-video-saver',
  'facebook-media-grabber',
  'instagram-media-saver',
  'twitter-video-saver',
  'pinterest-media-saver',
  'linkedin-content-saver',
  'snapchat-story-saver',
  'telegram-media-saver',
  'rumble-video-grabber',
  'dailymotion-video-saver',
  'imgur-media-saver',
  'reddit-video-saver',
  'vimeo-video-extractor',
  'tumblr-content-saver',
  'ted-video-saver',
  'spotify-mp3-saver',
  'soundcloud-mp3-saver',
  'mixcloud-mp3-saver',
  'zingmp3-saver',
  'weibo-video-saver',
  'xiaohongshu-video-saver',
  'threads-video-saver',
  'kuaishou-video-saver',
  'douyin-video-saver',
  'bluesky-video-saver',
  'imdb-video-saver',
  'ifunny-video-saver',
  'febspot-video-saver',
  'espn-video-saver',
  'capcut-video-saver',
  'bitchute-video-saver',
  '9gag-video-saver'
];

console.log('🔄 Updating all tools pages with native banners...');

toolsPages.forEach(page => {
  const filePath = path.join('app', page, 'page.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already updated
    if (content.includes('ToolsPageAds')) {
      console.log(`✅ ${page} - Already updated`);
      return;
    }
    
    // Add import
    if (content.includes('import PlatformHowTo')) {
      content = content.replace(
        'import PlatformHowTo from "@/components/platform-how-to";',
        'import PlatformHowTo from "@/components/platform-how-to";\nimport ToolsPageAds from "@/components/tools-page-ads";'
      );
    }
    
    // Add wrapper before closing tags
    if (content.includes('</>')) {
      content = content.replace(
        '    </>\n  );\n}',
        `    </>\n    \n    {/* Native Banners for Tools Page */}\n    <ToolsPageAds platform={platform}>\n      <div></div>\n    </ToolsPageAds>\n  );\n}`
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${page} - Updated successfully`);
  } else {
    console.log(`❌ ${page} - File not found`);
  }
});

console.log('\n🎉 All tools pages have been updated with native banners!');
console.log('📋 Each tools page now has:');
console.log('- Floating NordVPN banner (via ToolsHero)');
console.log('- Original banner above downloader (via ToolsHero)');
console.log('- 2 Native banners after key sections (via ToolsPageAds)');
