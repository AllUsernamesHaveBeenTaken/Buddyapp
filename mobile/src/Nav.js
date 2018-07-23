import { Navigation, ScreenVisibilityListener } from 'react-native-navigation-v1-v2-adapter';

import { registerScreens } from './screens'
import { iconsMap } from './utils/themes'
import appInitialized from './utils/appInitialized'

import { fakeAvatar } from "./utils/constants";

registerScreens();

export function startLogin() {
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,     
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'buddy.LoginScreen',
          }
        }],
      }
    }
  });
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
                        icon: iconsMap['user-o']
                      }
                    ],
                    rightButtons: [
                      {
                        title: 'Notifications',
                        id: 'notifications',
                        icon: iconsMap['bell-o']
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
                            icon: iconsMap['user-o']
                          }
                        ],
                        rightButtons: [
                            {
                                title: 'Notifications',
                                id: 'notifications',
                                icon: iconsMap['bell-o']
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