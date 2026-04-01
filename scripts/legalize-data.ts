import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'Hải Quan');
const targetDir = path.join(rootDir, 'public', 'documents');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

function sanitize(filename: string): string {
    return filename.replace(/[^a-zA-Z0-9._-]/g, '_');
}

async function processFile(filePath: string, category: string) {
    const filename = path.basename(filePath);
    if (!filename.toLowerCase().endsWith('.pdf')) return;

    const sanitized = sanitize(filename);
    const targetPath = path.join(targetDir, sanitized);

    // Copy file
    fs.copyFileSync(filePath, targetPath);

    // Parse filename to extract code, date, name
    // Pattern: [CODE] [DATE] [REST].pdf
    const match = filename.match(/^(\d+)\s+(\d+)\s+(.+)\.pdf$/i);
    
    let code: string;
    let date: string;
    let name: string;

    if (match) {
        code = match[1];
        date = match[2];
        name = match[3];
    } else {
        // Fallback if filename is not in expected format
        code = filename.replace(/\D/g, '') || Date.now().toString().slice(-8);
        date = new Date().toLocaleDateString('vi-VN').replace(/\//g, '');
        name = filename.replace('.pdf', '');
    }

    // Upsert into prisma
    try {
        await prisma.document.upsert({
            where: { code },
            update: {
                name,
                date,
                filename: sanitized,
                type: category || 'Khác',
                description: `Văn bản ${category || 'SHTT'} liên quan đến ${name}`,
            },
            create: {
                code,
                name,
                date,
                filename: sanitized,
                type: category || 'Khác',
                description: `Văn bản ${category || 'SHTT'} liên quan đến ${name}`,
            },
        });
        console.log(`✓ processed: ${filename} as ${category}`);
    } catch (error) {
        console.error(`✗ error processing ${filename}:`, error);
    }
}

async function scan(dirPath: string, currentCategory: string = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory()) {
            let nextCategory = currentCategory;
            // Identify standard categories from specific folder names
            if (entry.name === 'Gia han') nextCategory = 'Gia hạn';
            else if (entry.name === 'Luật sở hữu trí tuệ') nextCategory = 'Luật SHTT';
            else if (entry.name === 'Nghị định hướng dẫn luật sở hữu trí tuệ') nextCategory = 'Nghị định hướng dẫn';
            else if (entry.name === 'Nghị định xử phạt vi phạm hành chính lĩnh vực SHTT') nextCategory = 'Nghị định xử phạt';
            else if (entry.name === 'Văn bản chỉ đạo của Cục Hải quan') nextCategory = 'Công văn chỉ đạo';
            else if (entry.name === 'Thông tư kiểm tra, giám sát, tạm dừng làm thủ tục hải quan đối với hàng hóa xuất khẩu, nhập khẩu có yêu cầu bảo vệ quyền sở hữu trí tuệ') nextCategory = 'Thông tư Hải quan';
            else if (['PDF', 'WORLD'].includes(entry.name)) {
                // Keep the parent category
            } else {
                nextCategory = entry.name;
            }

            await scan(fullPath, nextCategory);
        } else {
            await processFile(fullPath, currentCategory);
        }
    }
}

async function main() {
    console.log('--- STARTING DOCUMENT LEGALIZATION ---');
    if (!fs.existsSync(sourceDir)) {
        console.error(`ERROR: Directory "${sourceDir}" not found!`);
        return;
    }
    await scan(sourceDir);
    console.log('--- LEGALIZATION COMPLETED ---');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
