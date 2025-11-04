#!/usr/bin/env node



const fs = require("fs");

// Get the number of bytes in the file
function getBytes(filePath) {
    try {
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        return fileSizeInBytes;
    } catch(error) {
        console.log(`Error getting file size: ${error.message}`);
    }
}

function getLines(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const lines = fileContent.split("\n");

        let lineCount = 0;
        if (fileContent.length > 0) {
            lineCount = lines.length;
        }
        return lineCount;
    } catch(error) {
        console.log(`Error getting line count: ${error.message}`);
    }
}

function getWordCount(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const wordCount = countWordsInString(fileContent);
        return wordCount;
    } catch(error) {
        console.log(`Error getting word count : ${error.message}`);
    }
}

function countWordsInString(fileContent) {
    const trimmedText = fileContent.trim();

    if (trimmedText.length === 0) {
        return 0;
    }

    const words = trimmedText.split(/\s+/).filter(Boolean);
    return words.length;
}

function getCharacterCount(filePath) {
    try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const characterCount = fileContent.length;
        return characterCount;
    } catch(error) {
        console.log(`Error getting character count: ${error.message}`);
    }
}

const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .description('A simple wc like tool');

program
  .option("-c, --bytes")
  .option("-l, --lines")
  .option("-w, --words")
  .option("-m, --charactercount")

program.argument("<string>", "Filepath");

program.parse(process.argv);

let options = program.opts();
let filePath = program.args[0];

if (options.bytes === true) {
    const byteCount = getBytes(filePath);
    console.log(`${byteCount} ${filePath}`);
} else if (options.lines === true) {
    const lineCount = getLines(filePath);
    console.log(`${lineCount} ${filePath}`);
} else if (options.words === true) {
    const wordCount = getWordCount(filePath);
    console.log(`${wordCount} ${filePath}`);
} else if (options.charactercount === true) {
    const characterCount = getCharacterCount(filePath);
    console.log(`${characterCount} ${filePath}`);
} else  if (Object.keys(options).length === 0) {
    const byteCount = getBytes(filePath);
    const lineCount = getLines(filePath);
    const wordCount = getWordCount(filePath);
    console.log(`${lineCount} ${wordCount} ${byteCount} ${filePath}`);
}