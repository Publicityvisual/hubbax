import fs from 'fs';
import https from 'https';
import path from 'path';

const ASSETS_DIR = path.join(process.cwd(), 'public', 'assets', 'reactions');

if (!fs.existsSync(ASSETS_DIR)) {
    fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

// List of potential base URLs for Facebook Reaction assets
const BASE_URLS = [
    'https://raw.githubusercontent.com/maykbrito/facebook-reactions/master/src/assets/',
    'https://raw.githubusercontent.com/maykbrito/facebook-reactions/main/src/assets/',
    'https://raw.githubusercontent.com/melvin0008/facebook-reactions-css/master/assets/',
    'https://raw.githubusercontent.com/bilo-io/facebook-reactions-animation/master/assets/',
    'https://raw.githubusercontent.com/Jinri/react-facebook-reactions/master/src/assets/'
];

const reactionFiles = ['like.gif', 'love.gif', 'haha.gif', 'wow.gif', 'sad.gif', 'angry.gif'];

// Specific overrides for reliable sources
const OVERRIDES = {
    'care.png': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Facebook_care_emoji.svg/240px-Facebook_care_emoji.svg.png'
};

const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                downloadFile(response.headers.location, dest).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                 fs.unlink(dest, () => {}); // Clean up
                 reject(new Error(`Status ${response.statusCode}`));
                 return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => {
                    const size = fs.statSync(dest).size;
                    if (size < 100) { // Filter out tiny error pages
                        fs.unlinkSync(dest);
                        reject(new Error(`File too small (${size} bytes)`));
                        return;
                    }
                    console.log(`Success: ${path.basename(dest)} from ${url} (${size} bytes)`);
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
};

async function downloadAsset(filename) {
    const dest = path.join(ASSETS_DIR, filename);
    
    // 1. Try Override First
    if (OVERRIDES[filename]) {
        try {
            await downloadFile(OVERRIDES[filename], dest);
            return;
        } catch (e) {
            console.log(`Override failed for ${filename}: ${e.message}`);
        }
    }

    // 2. Try Base URLs
    for (const base of BASE_URLS) {
        const url = base + filename;
        try {
            await downloadFile(url, dest);
            return; // Success, stop trying others
        } catch (e) {
            // Ignore and try next
        }
    }
    console.error(`FAILED to download ${filename} from any source.`);
}

async function start() {
    console.log("Starting Smart Asset Download...");
    // Only download GIF for motion, fallback to PNG if needed (but we prefer GIF)
    for (const file of reactionFiles) {
        await downloadAsset(file);
    }
    await downloadAsset('care.png'); // Always PNG for now
    console.log("Download process finished.");
}

start();
