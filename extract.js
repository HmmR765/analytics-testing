const ffmpeg = require('ffmpeg-static');
const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('public/frames')) {
    fs.mkdirSync('public/frames', { recursive: true });
}

try {
    console.log("Extracting frames using:", ffmpeg);
    execSync(`"${ffmpeg}" -i public/scene1.gif -vf "scale=-1:800" -qscale:v 2 public/frames/frame-%04d.jpg`, {stdio: 'inherit'});
    console.log("Extraction complete!");
} catch (err) {
    console.error("Failed to extract frames:", err.message);
    process.exit(1);
}
