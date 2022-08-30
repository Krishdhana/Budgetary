import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
// import { Entypo } from '@expo/vector-icons';

const NoExpenseMsg = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>
        No Expenses{' '}
        {/* <Entypo name="emoji-flirt" size={22} color="black" /> */}
      </Text>
    </View>
  );
};

export default NoExpenseMsg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  msg: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
