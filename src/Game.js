import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo';
import Assets from '../assets';

export default class Game extends React.Component {
  state = { bubblePopped: false };

  popBubble = async () => {
    this.setState({ bubblePopped: !this.state.bubblePopped });
    if (!this.popSound) {
      this.popSound = (await Audio.Sound.create(Assets.audio.pop)).sound;
    }
    try {
      await this.popSound.setPositionAsync(0);
      await this.popSound.playAsync();
    } catch (error) {
      console.warn('sound error', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ZuckerBub</Text>
        <TouchableOpacity onPress={this.popBubble}>
          <View style={styles.bubbleWrap}>
            <Image
              style={[styles.bubble, this.state.bubblePopped && styles.hidden]}
              source={Assets.images.bubble}
            />
            <Image style={styles.zuckhead} source={Assets.images.zuckhead} />
          </View>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Your touch decides Zuck&apos;s fate!</Text>
        <Text style={{ color: '#fff' }}>Tap to toggle bubble</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2CFCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'zuckleberry',
    color: '#fff',
    fontSize: 48,
  },
  subtitle: {
    color: '#fff',
    fontFamily: 'montserrat-black',
    fontSize: 28,
    paddingTop: 10,
  },
  bubbleWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    width: 210,
    height: 213.5,
  },
  hidden: {
    opacity: 0,
  },
  zuckhead: {
    position: 'absolute',
    width: 95,
    height: 131,
  },
});
