import { Navigation } from 'react-native-navigation';

import FeedScreen from './FeedScreen'
import ExploreScreen from './ExploreScreen'
import LoginScreen from './LoginScreen'

import WithProvider from "../components/WithProvider";

export const registerScreens = () => {
    Navigation.registerComponent('buddy.FeedScreen', () => WithProvider(FeedScreen))
    Navigation.registerComponent('buddy.ExploreScreen', () => WithProvider(ExploreScreen))
    Navigation.registerComponent('buddy.LoginScreen', () => WithProvider(LoginScreen))
}