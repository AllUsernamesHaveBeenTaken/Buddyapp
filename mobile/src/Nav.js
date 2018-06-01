import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens'
import { iconsLoaded, iconsMap } from './utils/themes'

registerScreens();

export default class Nav {
    constructor() {
        iconsLoaded.then(() => this._initApp())
    }

    _initApp() {
        Navigation.startTabBasedApp({
            appStyle: {
                navBarTextColor: '#050505',
                navBarTransparent: true,
            },
            tabsStyle: {
                tabBarSelectedButtonColor: '#28E6FF',
                tabBarButtonColor: '#050505',
                tabBarTranslucent: true,           
            },
            tabs: [
                {
                    screen: 'buddy.FeedScreen',
                    title: 'Buddy',
                    icon: iconsMap.list
                },
                {
                    screen: 'buddy.ExploreScreen',
                    title: 'Buddy',
                    icon: iconsMap.globe
                }
            ]
        })
    }
}