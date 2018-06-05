import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens'
import { iconsMap } from './utils/themes'
import appInitialized from './utils/appInitialized'

registerScreens();

export function startLogin() {
    Navigation.startSingleScreenApp({
        screen: {
            screen: 'buddy.LoginScreen',
            navigatorStyle: {
                navBarHidden: true
            }
        }
    })
}

export function startMainApp() {
    Navigation.startTabBasedApp({
        appStyle: {
            navBarTextColor: '#050505',
            navBarTransparent: true,
        },
        tabsStyle: {
            tabBarSelectedButtonColor: '#1B9AAA',
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

export function init() {
    appInitialized();
}