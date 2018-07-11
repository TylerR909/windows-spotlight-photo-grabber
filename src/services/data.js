import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import sizeOf from 'image-size';

const roamingPath = app.getPath('appData'); // returns .../AppData/Roaming/, need .../AppData/Local
const imageSourcePath = path.resolve(
  roamingPath,
  '../Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets',
);

const getImageMetaData = () => {
  const files = fs.readdirSync(imageSourcePath);
  const filePaths = files.map(file => path.resolve(imageSourcePath, file));
  let processedImages = filePaths.map((file) => {
    let dimensions;
    try {
      dimensions = sizeOf(file);
    } catch (e) {
      dimensions = { width: 0, height: 0 };
    }

    return {
      key: file.split('\\').pop(),
      path: file,
      width: dimensions.width,
      height: dimensions.height,
    };
  });

  processedImages = processedImages.filter(img => img.height > 650);

  return processedImages;
};

const saveImage = (sourceImage, destinationDir, newName) => {
  const filename = newName ||
    (sourceImage.split('\\').pop() + '.jpg'); // eslint-disable-line prefer-template
  const destinationFile = path.join(destinationDir, filename);
  try {
    fs.copyFileSync(sourceImage, destinationFile);
    return true;
  } catch (e) {
    console.log('There was an error saving the file:', e);
    return false;
  }
};


export default {
  getImageMetaData,
  saveImage,
};
