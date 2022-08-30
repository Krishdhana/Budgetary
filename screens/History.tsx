import React from 'react';

import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import ExpenseListHistory from '../components/History/ExpenseList';

import Wrapper from '../components/shared/Wrapper';

const History = () => {
  return (
    <Wrapper>
      <View>
        <Text style={styles.title}>Expenses</Text>
        <ExpenseListHistory />
      </View>
    </Wrapper>
  );
};

export default History;

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
});
