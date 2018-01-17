import React from 'react';
import { AppLoading } from 'expo';

import Assets from './assets/';
import cacheAssetsAsync from './lib/assetCache';
import Game from './src/Game';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  loadAssetsAsync = async () => {
    await cacheAssetsAsync({
      audio: Assets.audio,
      fonts: Assets.fonts,
      images: Assets.images,
    });
  };

  handleLoadingError = error => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return <Game />;
  }
}
