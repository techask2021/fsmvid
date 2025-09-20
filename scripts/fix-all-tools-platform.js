#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of all tools pages with their platform names
const toolsPages = [
  { file: 'youtube-video-saver', platform: 'youtube' },
  { file: 'tiktok-video-saver', platform: 'tiktok' },
  { file: 'facebook-media-grabber', platform: 'facebook' },
  { file: 'instagram-media-saver', platform: 'instagram' },
  { file: 'twitter-video-saver', platform: 'twitter' },
  { file: 'pinterest-media-saver', platform: 'pinterest' },
  { file: 'linkedin-content-saver', platform: 'linkedin' },
  { file: 'snapchat-story-saver', platform: 'snapchat' },
  { file: 'telegram-media-saver', platform: 'telegram' },
  { file: 'rumble-video-grabber', platform: 'rumble' },
  { file: 'dailymotion-video-saver', platform: 'dailymotion' },
  { file: 'imgur-media-saver', platform: 'imgur' },
  { file: 'reddit-video-saver', platform: 'reddit' },
  { file: 'vimeo-video-extractor', platform: 'vimeo' },
  { file: 'tumblr-content-saver', platform: 'tumblr' },
  { file: 'ted-video-saver', platform: 'ted' },
  { file: 'spotify-mp3-saver', platform: 'spotify' },
  { file: 'soundcloud-mp3-saver', platform: 'soundcloud' },
  { file: 'mixcloud-mp3-saver', platform: 'mixcloud' },
  { file: 'zingmp3-saver', platform: 'zingmp3' },
  { file: 'weibo-video-saver', platform: 'weibo' },
  { file: 'xiaohongshu-video-saver', platform: 'xiaohongshu' },
  { file: 'threads-video-saver', platform: 'threads' },
  { file: 'kuaishou-video-saver', platform: 'kuaishou' },
  { file: 'douyin-video-saver', platform: 'douyin' },
  { file: 'bluesky-video-saver', platform: 'bsky' },
  { file: 'imdb-video-saver', platform: 'imdb' },
  { file: 'ifunny-video-saver', platform: 'ifunny' },
  { file: 'febspot-video-saver', platform: 'febspot' },
  { file: 'espn-video-saver', platform: 'espn' },
  { file: 'capcut-video-saver', platform: 'capcut' },
  { file: 'bitchute-video-saver', platform: 'bitchute' },
  { file: '9gag-video-saver', platform: '9gag' }
];

console.log('🔄 Fixing all tools pages to ensure consistent ad placement...');

toolsPages.forEach(({ file, platform }) => {
  const filePath = path.join('app', file, 'page.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Check if ToolsHero has platform prop
    if (content.includes('<ToolsHero') && !content.includes('platform={platform}')) {
      // Find the ToolsHero component and add platform prop
      content = content.replace(
        /<ToolsHero\s+title="[^"]*"\s+subtitle="[^"]*"\s*>/g,
        `<ToolsHero
        title="${content.match(/title="([^"]*)"/)?.[1] || 'Tool'}"
        subtitle="${content.match(/subtitle="([^"]*)"/)?.[1] || 'Description'}"
        platform="${platform}"
      >`
      );
      updated = true;
    }
    
    // Remove ToolsPageAds import and usage if present
    if (content.includes('ToolsPageAds')) {
      content = content.replace(/import ToolsPageAds from "@\/components\/tools-page-ads";\n?/g, '');
      content = content.replace(/<ToolsPageAds platform={platform}>\s*<div><\/div>\s*<\/ToolsPageAds>/g, '');
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${file} - Updated with platform prop`);
    } else {
      console.log(`✅ ${file} - Already correct`);
    }
  } else {
    console.log(`❌ ${file} - File not found`);
  }
});

console.log('\n🎉 All tools pages have been updated!');
console.log('📋 Each tools page now has:');
console.log('- Platform prop passed to ToolsHero');
console.log('- Native banners automatically included via ToolsHero');
console.log('- Consistent ad placement across all pages');
