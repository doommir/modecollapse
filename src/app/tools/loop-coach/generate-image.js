// Simple script to generate a placeholder image for LoopCoach
// Run with Node.js: node generate-image.js

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a canvas with dimensions 800x600
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

// Create a gradient background
const gradient = ctx.createLinearGradient(0, 0, 800, 600);
gradient.addColorStop(0, '#2e026d');
gradient.addColorStop(1, '#15162c');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 800, 600);

// Add a subtle pattern
ctx.strokeStyle = 'rgba(100, 255, 218, 0.1)';
ctx.lineWidth = 1;
for (let i = 0; i < 800; i += 40) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, 600);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(800, i);
  ctx.stroke();
}

// Add title text
ctx.font = 'bold 60px Arial';
ctx.fillStyle = '#64ffda'; // Primary color
ctx.textAlign = 'center';
ctx.fillText('LoopCoach', 400, 250);

// Add subtitle
ctx.font = '30px Arial';
ctx.fillStyle = 'white';
ctx.fillText('AI Speech Coach', 400, 310);

// Add microphone icon
ctx.beginPath();
ctx.arc(400, 400, 50, 0, Math.PI * 2);
ctx.fillStyle = 'rgba(100, 255, 218, 0.2)';
ctx.fill();

ctx.beginPath();
ctx.rect(390, 370, 20, 60);
ctx.arc(400, 370, 10, 0, Math.PI);
ctx.fillStyle = '#64ffda';
ctx.fill();

// Save the image to a file
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '../../../../public/images/loopcoach-thumbnail.png');
fs.writeFileSync(outputPath, buffer);

console.log(`Image saved to ${outputPath}`); 