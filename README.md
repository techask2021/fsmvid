# Dailymotion Video Downloader

A web-based tool for downloading videos from Dailymotion and other popular platforms.

## Features

- Direct streaming video playback in browser
- Support for various video qualities
- Direct m3u8 streaming file download
- Helper for opening streams in VLC Media Player
- Support for both regular Dailymotion URLs and short URLs (dai.ly)

## Video Format Information

Dailymotion videos are delivered in the following formats:

- **Streaming Format (m3u8)**: Default format for Dailymotion videos. This is an HLS streaming format.

## How to Use

1. **Enter URL**: Paste a Dailymotion video URL (works with both regular URLs and dai.ly short links)
2. **Process**: Click the "Process" button
3. **Watch & Download**: For Dailymotion videos, use the "Watch & Download" button to play directly in browser
4. **Download Options**:
   - Use "Download MP4" button below the player to get instructions for downloading the MP4 file
   - Open in VLC for direct playback in an external player
   - Copy the stream URL for use in external downloading tools

## Limitations

- Dailymotion uses m3u8 (HLS) streaming format which requires conversion to MP4
- Direct MP4 conversion is not built-in - external tools like VLC are recommended
- Some network restrictions may prevent stream playback in the browser

## External Tools for MP4 Conversion

- **VLC Media Player**: Open > Media > Open Network Stream > paste URL > Convert/Save
- **FFmpeg**: `ffmpeg -i [URL] -c copy output.mp4`
- **4K Video Downloader**: Paste the stream URL for automated downloading

## Browser Compatibility

This tool works best in modern browsers. For optimal results:
- Chrome/Edge/Firefox on desktop
- Safari on macOS and iOS (has native HLS support)

## Technical Details

- Uses native HTML5 video capabilities with HLS stream proxying
- Proxies requests through the server to handle CORS and authentication
- Extracts highest quality stream from multi-quality playlists 