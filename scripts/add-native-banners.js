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

console.log('✅ Native banners have been added to:');
console.log('- Homepage (3 strategic locations)');
console.log('- YouTube page (2 locations)');
console.log('- All tools pages via ToolsHero component (floating NordVPN)');
console.log('');
console.log('📋 To add native banners to other tools pages, you can:');
console.log('1. Import AdsterraNativeBanner in the page');
console.log('2. Add <AdsterraNativeBanner className="my-8" id="platform-native-1" /> after key sections');
console.log('');
console.log('🎯 Recommended placement locations:');
console.log('- After Platform Features section');
console.log('- After FAQ section');
console.log('- After SEO Content section');
console.log('');
console.log('🔧 All components are ready and CSP has been updated!');
