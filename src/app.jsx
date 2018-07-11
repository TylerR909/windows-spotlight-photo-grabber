import React from 'react';
import path from 'path';
import { remote, ipcRenderer } from 'electron';
import Gallery from './components/Gallery';

const defaultImagePath = path.resolve(
  remote.app.getPath('pictures'),
  'Windows Spotlight Photos',
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'normal',
      outputDir: localStorage.getItem('outputDir') || defaultImagePath,
      images: [],
    };

    this.setSaveToPath = this.setSaveToPath.bind(this);
    this.saveImage = this.saveImage.bind(this);
  }

  componentDidMount() {
    this.registerListeners.call(this);
  }

  registerListeners() {
    ipcRenderer.on('data', (event, data) => {
      this.setState({
        images: data,
      });
    });

    ipcRenderer.on('imageSaved', (event, data) => {
      console.log('image saved!', data);
    });

    ipcRenderer.on('imageSaveFailed', (event, data) => {
      console.log('failed to save image', data);
    });
  }

  saveImage(imgPath) {
    ipcRenderer.send('saveImage', {
      sourceImage: imgPath,
      destinationDir: this.state.outputDir,
    });
  }

  setSaveToPath(paths) {
    if (!paths) return;
    const [outputDir] = paths;
    localStorage.setItem('outputDir', outputDir);
    this.setState({ outputDir });
  }

  render() {
    /* eslint-disable */
    const images = this.state.images.filter(img =>
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
        { this.state.outputDir && `Saving to ${this.state.outputDir}`}
        <button
          onClick={() => {
            remote.dialog.showOpenDialog(
              { properties: ['openDirectory'] },
              this.setSaveToPath,
            );
          }}
        >
          Change
        </button>
        <Gallery images={images} onItemPress={this.saveImage} />
      </div>
    );
  }
}

export default App;
