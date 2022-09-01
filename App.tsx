import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  BottomNavigation,
  DefaultTheme,
  MD3Colors,
  Provider as PaperProvider,
} from 'react-native-paper';
import History from './screens/History';
import Home from './screens/Home';
import Settings from './screens/Settings';
import UserDataContextProvider from './store/redux/userdata-context';

const HomeRoute = () => <Home />;
const HistoryRoute = () => <History />;
const SettingRoute = () => <Settings />;

const App = () => {
  const customTheme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      background: MD3Colors.primary95,
    },
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: 'home',
      title: 'Home',
      focusedIcon: 'home-variant',
      unfocusedIcon: 'home-variant-outline',
    },
    {
      key: 'history',
      title: 'History',
      focusedIcon: 'clipboard-list',
      unfocusedIcon: 'clipboard-list-outline',
    },
    {
      key: 'settings',
      title: 'Settings',
      focusedIcon: 'cog',
      unfocusedIcon: 'cog-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    history: HistoryRoute,
    settings: SettingRoute,
  });

  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={MD3Colors.primary90}></StatusBar>
      <PaperProvider>
        <UserDataContextProvider>
          <BottomNavigation
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </UserDataContextProvider>
      </PaperProvider>
    </>
  );
};

export default App;
