import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

import { Platform, PixelRatio } from 'react-native';

const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(25) : 25

const replaceSuffixPattern = /--(active|big|small|very-big)/g

const icons = {
    list: [navIconSize, Entypo],
    globe: [navIconSize, Entypo],
    cross: [navIconSize, Entypo],
    bell: [navIconSize, EvilIcons]
}

const iconsMap = {}

const iconsLoaded = () =>
 new Promise((resolve) => {
    new Promise.all(
      Object.keys(icons).map(iconName => {
        const Provider = icons[iconName][1] || defaultIconProvider;
        return Provider.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
        );
      }),
    ).then(sources => {
      Object.keys(icons).forEach(
        (iconName, idx) => (iconsMap[iconName] = sources[idx]),
      );
  
      resolve(true);
    });
  });

export { iconsMap, iconsLoaded }