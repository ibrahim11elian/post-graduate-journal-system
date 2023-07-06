import fs from 'fs';
import path from 'path';

export const folderBuilder = () => {
  const destinationFolder = path.join(__dirname, '..', 'cv');

  // Check if the destination folder exists
  if (!fs.existsSync(destinationFolder)) {
    // Create the destination folder
    fs.mkdirSync(destinationFolder, { recursive: true });
  }
};
