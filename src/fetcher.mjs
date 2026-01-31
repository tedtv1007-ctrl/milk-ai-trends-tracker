import { execSync } from 'child_process';
import fs from 'fs';

const query = "Latest AI and technology trends as of January 31, 2026";
console.log(`Researching: ${query}...`);

try {
    const apiKey = process.env.PERPLEXITY_API_KEY;
    if (!apiKey) throw new Error("PERPLEXITY_API_KEY not found in environment");
    const output = execSync(`node ../skills/perplexity/scripts/search.mjs "${query}"`, {
        env: { ...process.env, PERPLEXITY_API_KEY: apiKey }
    }).toString();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `./data/research-${timestamp}.md`;
    if (!fs.existsSync('./data')) fs.mkdirSync('./data');
    fs.writeFileSync(filename, output);
    console.log(`Research saved to ${filename}`);
} catch (error) {
    console.error("Research failed:", error.message);
}
