import fs from 'fs';
import path from 'path';

export const folderBuilder = () => {
  const cvFolder = path.join(__dirname, '..', 'cv');
  const copiesFolder = path.join(__dirname, '..', 'research-copies');
  const summariesFolder = path.join(__dirname, '..', 'research-summaries');
  const summariesFolderAr = path.join(__dirname, '..', 'research-summaries-ar');

  // Check if the destination folder exists
  if (!fs.existsSync(cvFolder)) {
    // Create the destination folder
    fs.mkdirSync(cvFolder, { recursive: true });
  }
  if (!fs.existsSync(copiesFolder)) {
    // Create the destination folder
    fs.mkdirSync(copiesFolder, { recursive: true });
  }
  if (!fs.existsSync(summariesFolder)) {
    // Create the destination folder
    fs.mkdirSync(summariesFolder, { recursive: true });
  }
  if (!fs.existsSync(summariesFolderAr)) {
    // Create the destination folder
    fs.mkdirSync(summariesFolderAr, { recursive: true });
  }
};
