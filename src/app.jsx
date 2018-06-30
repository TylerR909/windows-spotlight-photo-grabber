import React from 'react';
import fs from 'fs';
import path from 'path';
import { remote, ipcRenderer } from 'electron';
import sizeOf from 'image-size';
import Gallery from './Gallery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'normal',
      savePath: '',
    };
  }

  getFilteredImageInfo() {
    const roamingPath = remote.app.getPath('appData');
    const imageDirPath = path.resolve(roamingPath, '../Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets');

    const files = fs.readdirSync(imageDirPath);
    const filePaths = files.map(file => path.resolve(imageDirPath, file));
    const fileData = filePaths.map((file) => {
      let dimensions;
      try {
        dimensions = sizeOf(file);
      } catch (e) {
        dimensions = { width: 0, height: 0 };
      }
      return {
        path: file,
        width: dimensions.width,
        height: dimensions.height,
      };
    });
    return fileData.filter(img => img.height > 650);
  }

  setSaveToPath([outputDir]) {
    ipcRenderer.send('updateOutputDir', { outputDir });
  }

  render() {
    /* eslint-disable */
    const images = this.getFilteredImageInfo().filter(img =>
      this.state.mode === 'normal'
        ? img.width >= img.height
        : img.height > img.width
    );
    /* eslint-enable */
    return (
      <div>
        <h2>Welcome to React!</h2>
        <button onClick={() => this.setState({ mode: 'normal' })}>
          Normal
        </button>
        <button onClick={() => this.setState({ mode: 'phone' })}>
          Phone
        </button>
        <br />
        { this.state.savePath && `Saving to ${this.state.savePath}`}
        <button onClick={() => remote.dialog.showOpenDialog({ properties: ['openDirectory'] }, this.setSaveToPath)}>
          { this.state.savePath ? 'Change' : 'Set Save Path' }
        </button>
        <Gallery images={images} />
      </div>
    );
  }
}

export default App;
