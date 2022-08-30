import React from 'react';

import {StatusBar, StyleSheet, View} from 'react-native';

const Wrapper: React.FC<any> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight - 10,
    marginTop: 5,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
});
