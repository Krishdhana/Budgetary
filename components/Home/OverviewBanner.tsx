import React from 'react';
import {Text} from 'react-native-paper';

import {StyleSheet, useColorScheme, View} from 'react-native';
import {Surface, MD3Colors} from 'react-native-paper';
import {ExpenseList} from '../shared/interface/Interface';

export type Props = {
  expenseList: ExpenseList;
};

const OverviewBanner: React.FC<Props> = ({expenseList}) => {
  const bannersDetails = [
    {
      name: 'Income',
      amount: expenseList.income,
    },
    {
      name: 'Spent',
      amount: expenseList.spent,
    },
  ];

  const color = useColorScheme();

  const getBGColor = (income: string) => {
    if (color == 'light') {
      if (income == 'Income') return MD3Colors.primary80;
      else return MD3Colors.secondary90;
    } else {
      return MD3Colors.secondary20;
    }
  };

  return (
    <>
      <View style={styles.container}>
        {bannersDetails.map(banner => {
          return (
            <Surface
              key={banner.name}
              elevation={3}
              style={[
                styles.box,
                {
                  backgroundColor:
                    banner.name === 'Income'
                      ? getBGColor('Income')
                      : getBGColor('Saving'),
                },
              ]}>
              <Text style={styles.smallTxt}>{banner.name} </Text>
              <Text style={styles.text}>₹ {banner.amount || 0}</Text>
            </Surface>
          );
        })}
      </View>
      <Surface
        key={'Balance'}
        elevation={3}
        style={[
          styles.box,
          styles.balanceBox,
          {
            backgroundColor:
              color == 'light' ? MD3Colors.primary80 : MD3Colors.secondary20,
          },
        ]}>
        <Text style={styles.smallTxt}>{'Balance'} </Text>
        <Text style={styles.text}>₹ {expenseList.balance} </Text>
      </Surface>
    </>
  );
};

export default OverviewBanner;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 3,
    textAlign: 'center',
  },
  smallTxt: {
    marginLeft: 5,
    fontSize: 14,
  },
  box: {
    width: '45%',
    height: 80,
    padding: 10,
    borderRadius: 10,
  },
  balanceBox: {
    width: '50%',
    marginTop: 10,
    marginHorizontal: '25%',
  },
});
