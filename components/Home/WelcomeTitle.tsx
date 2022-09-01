import React from 'react';
import {Text} from 'react-native-paper';

import {StyleSheet} from 'react-native';
import {MD3Colors} from 'react-native-paper';

export type Props = {
  name: string;
};

const WelcomeTitle: React.FC<Props> = props => {
  return (
    <Text style={styles.titleContainer}>
      Welcome,
      <Text style={styles.name}> {props.name || 'user'}</Text>
    </Text>
  );
};

export default WelcomeTitle;

const styles = StyleSheet.create({
  titleContainer: {
    fontSize: 22,
    letterSpacing: 2.5,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  name: {
    color: MD3Colors.primary50,
  },
});
