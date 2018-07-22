import { Navigation, ScreenVisibilityListener } from 'react-native-navigation-v1-v2-adapter';

import { registerScreens } from './screens'
import { iconsMap } from './utils/themes'
import appInitialized from './utils/appInitialized'

import { fakeAvatar } from "./utils/constants";

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
    Navigation.setDefaultOptions({
        topBar: {
            visible: true,
            //searchBar: true,
            noBorder: true,
            buttonColor: '#1B9AAA',
            noBorder: true,
        },
        bottomTabs: {
            visible: true,
            currentTabIndex: 0,
            drawBehind: false,
            translucent: true,
            backgroundColor: 'white',
            drawBehind: false
        },
        bottomTab: {
            selectedIconColor: '#1B9AAA',
            iconColor: '#050505',
        }
      });

    Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [{
              stack: {
                children: [{
                  component: {
                    name: 'buddy.FeedScreen',
                  }
                }],
                options: {
                  bottomTab: {
                    icon: iconsMap.list,
                    testID: 'FEEDSCREEN_TAB_BAR_BUTTON'
                  },
                  topBar: {
                    leftButtons: [
                      {
                        title: 'Profile',
                        id: 'profile',
                        icon: iconsMap.user
                      }
                    ],
                    rightButtons: [
                      {
                        title: 'Notifications',
                        id: 'notifications',
                        icon: iconsMap.bell
                      }
                    ],
                  }
                }
              }
            },
            {
                component: {
                    name: 'buddy.ExploreScreen',
                    options: {
                      bottomTab: {
                        title: 'Explore',
                        icon: iconsMap.globe,
                        testID: 'EXPLORESCREEN_TAB_BAR_BUTTON'
                      },
                      topBar: {
                        leftButtons: [
                          {
                            title: 'Profile',
                            id: 'profile',
                            icon: iconsMap.user
                          }
                        ],
                        rightButtons: [
                            {
                                title: 'Notifications',
                                id: 'notifications',
                                icon: iconsMap.bell
                            }
                        ],
                      }
                    }
                  }
            }],
          }
        }
      });

    
}

export function init() {
    appInitialized();
}