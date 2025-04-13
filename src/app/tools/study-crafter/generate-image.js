// Script to generate a thumbnail for StudyCrafter
// Run with Node.js: node generate-image.js

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a canvas with dimensions 800x600
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

// Create a gradient background
const gradient = ctx.createLinearGradient(0, 0, 800, 600);
gradient.addColorStop(0, '#0a192f');
gradient.addColorStop(1, '#112240');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);

// Add a subtle pattern
ctx.strokeStyle = 'rgba(100, 255, 218, 0.05)';
ctx.lineWidth = 1;
for (let i = 0; i < 800; i += 30) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, 600);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(800, i);
  ctx.stroke();
}

// Add icons to represent study tools
// Flashcard icon
ctx.fillStyle = 'rgba(100, 255, 218, 0.2)';
ctx.fillRect(170, 180, 120, 160);
ctx.fillStyle = 'rgba(100, 255, 218, 0.4)';
ctx.fillRect(190, 200, 80, 30);
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.font = '14px Arial';
ctx.fillText('Flashcard', 205, 220);

// Quiz icon
ctx.beginPath();
ctx.fillStyle = 'rgba(100, 255, 218, 0.2)';
ctx.arc(380, 260, 70, 0, Math.PI * 2);
ctx.fill();
ctx.font = 'bold 40px Arial';
ctx.fillStyle = 'rgba(100, 255, 218, 0.6)';
ctx.textAlign = 'center';
ctx.fillText('?', 380, 275);
ctx.font = '14px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.fillText('Quiz', 380, 320);

// Chat icon
ctx.beginPath();
ctx.fillStyle = 'rgba(100, 255, 218, 0.2)';
ctx.moveTo(530, 250);
ctx.lineTo(600, 250);
ctx.lineTo(600, 320);
ctx.lineTo(565, 320);
ctx.lineTo(550, 340);
ctx.lineTo(550, 320);
ctx.lineTo(530, 320);
ctx.closePath();
ctx.fill();
ctx.font = '14px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.textAlign = 'center';
ctx.fillText('AI Study Buddy', 565, 285);

// Add title text
ctx.font = 'bold 60px Arial';
ctx.fillStyle = '#64ffda';
ctx.textAlign = 'center';
ctx.fillText('StudyCrafter', 400, 100);

// Add subtitle
ctx.font = '24px Arial';
ctx.fillStyle = 'white';
ctx.fillText('Interactive Study Guides from Your Notes', 400, 140);

// Add description text at bottom
ctx.font = '16px Arial';
ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
ctx.fillText('Transform your notes into AI-powered study tools', 400, 450);

// Save the image to a file
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '../../../../public/images/studycrafter-thumbnail.png');
fs.writeFileSync(outputPath, buffer);

console.log(`Image saved to ${outputPath}`); 