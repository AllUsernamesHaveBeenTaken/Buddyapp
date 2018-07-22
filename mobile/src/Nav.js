import { Navigation, ScreenVisibilityListener } from 'react-native-navigation-v1-v2-adapter';

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
            navBarButtonColor:'#1B9AAA'
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
                icon: iconsMap.list,
                navigatorButtons: {
                    rightButtons: [
                        {
                            title: 'Noti',
                            id: 'notifications',
                            icon: iconsMap.bell
                        }
                    ]
                }
            },
            {
                screen: 'buddy.ExploreScreen',
                title: 'Buddy',
                icon: iconsMap.globe,
                navigatorButtons: {
                    rightButtons: [
                        {
                            title: 'Noti',
                            id: 'notifications',
                            icon: iconsMap.bell
                        }
                    ]
                }
            },
        ],
    })
}

export function init() {
    appInitialized();
}