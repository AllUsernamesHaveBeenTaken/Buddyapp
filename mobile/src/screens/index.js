import { Navigation, ScreenVisibilityListener } from 'react-native-navigation-v1-v2-adapter';

import FeedScreen from './FeedScreen'
import ExploreScreen from './ExploreScreen'
import LoginScreen from './LoginScreen'
import CreateGigScreen from './CreateGigScreen'
import GigDetailScreen from './GigDetailScreen'

import WithProvider from "../components/WithProvider";

export const registerScreens = () => {
    Navigation.registerComponent('buddy.FeedScreen', () => WithProvider(FeedScreen))
    Navigation.registerComponent('buddy.ExploreScreen', () => WithProvider(ExploreScreen))
    Navigation.registerComponent('buddy.LoginScreen', () => WithProvider(LoginScreen))
    Navigation.registerComponent('buddy.CreateGigScreen', () => WithProvider(CreateGigScreen))
    Navigation.registerComponent('buddy.GigDetailScreen', () => WithProvider(GigDetailScreen))
}