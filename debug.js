import fs from 'fs';
import path from 'path';

function getFingerprint(content) {
    if (!content) return "";
    let clean = content;
    clean = clean.replace(/<[^>]*>?/gm, '');
    clean = clean.replace(/\s+/g, '');
    return clean.substring(0, 100).toLowerCase();
}

const htmlContent = fs.readFileSync('html_template/employee-dashboard.html', 'utf-8');
const regex = /<div class="card-header.*?(?=\s*<div class="card-body)(?:\s*)(<div class="card-body[^>]*>)([\s\S]{0,2000})/gs;

let match;
while ((match = regex.exec(htmlContent)) !== null) {
    const headerHtml = match[0].substring(0, match[0].indexOf('<div class="card-body')).trim();
    if (headerHtml.includes("My Skills")) {
        console.log("FOUND MY SKILLS HEADER!");
        console.log("FINGERPRINT:", getFingerprint(match[2]));
        console.log("HEADER:", headerHtml);
    }
}
