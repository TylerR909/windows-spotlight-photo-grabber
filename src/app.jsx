import React from 'react';
import fs from 'fs';
import path from 'path';
import { remote } from 'electron';

class App extends React.Component {
  static getFileNames() {
    const roamingPath = remote.app.getPath('appData');
    const imageDirPath = path.resolve(roamingPath, '../Local/Packages/Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy/LocalState/Assets');

    const files = fs.readdirSync(imageDirPath);
    const filePaths = files.map(file => path.resolve(imageDirPath, file));
    const fileData = filePaths.map(file => ({ path: file, size: fs.statSync(file).size }));
    console.log(fileData);
    return fileData;
  }

  render() {
    // console.log(remote.app.getPath('appData'));
    return (
      <div>
        <h2>Welcome to React!</h2>
        <ul>
          { App.getFileNames().map(item => (<li key={item.path}> { item.size } </li>)) }
        </ul>
      </div>
    );
  }
}

export default App;
