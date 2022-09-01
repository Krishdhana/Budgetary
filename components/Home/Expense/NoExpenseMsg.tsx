import React from 'react';

import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

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
