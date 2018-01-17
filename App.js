import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';

import Assets from './assets/'
import cacheAssetsAsync from './lib/assetCache';
import Game from './src/Game';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }

    return (
      <Game />
    )
  }
  _loadAssetsAsync = async () => {
      await cacheAssetsAsync({ audio: Assets.audio, fonts: Assets.fonts, images:
      Assets.images });
  };

  _handleLoadingError = error => {
    console.warn(error);
  };
  _handleFinishLoading = () => {
    this.setState({ isReady: true });
  };
}
