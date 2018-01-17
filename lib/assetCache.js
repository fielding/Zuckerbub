import { Asset, Font } from 'expo';

function arrayFromObject(object) {
  let images = [];
  Object.keys(object).map( key => {
    const item = object[key];

    if (typeof item === 'object') {
      images = images.concat(arrayFromObject(item));
    } else {
      images.push(item);
    }
  });
  return images;
}

function cacheImages(images) {
  return images.map(image => Asset.fromModule(image).downloadAsync());
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

function cacheAudio(audio) {
  return audio.map(phile => Asset.fromModule(phile).downloadAsync());
}

export default function cacheAssetsAsync({ audio = [], fonts = [], images = [] }) {
  return Promise.all([...cacheImages(arrayFromObject(images)), ...cacheFonts(fonts),
    ...cacheAudio(arrayFromObject(audio))]);
}

