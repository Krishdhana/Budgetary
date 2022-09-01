import React from 'react';
import moment from 'moment';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {List, MD3Colors, Text} from 'react-native-paper';
import {ExpenseItem} from './interface/Interface';

export type Props = {
  expenseItem: {item: ExpenseItem; index: number};
  onClickExpenseItem: (index: number) => void;
};

const ExpenseItemRenderer: React.FC<Props> = ({
  expenseItem,
  onClickExpenseItem,
}) => {
  const getBGColor = (isIncome: boolean) => {
    const theme = useColorScheme();
    if (theme == 'light') {
      if (isIncome) return MD3Colors.primary80;
      else return MD3Colors.secondary90;
    } else {
      return MD3Colors.secondary20;
    }
  };

  return (
    <View style={{paddingHorizontal: 8}}>
      <List.Item
        style={[
          styles.listItem,
          {
            backgroundColor: getBGColor(expenseItem.item.isIncome),
          },
        ]}
        title={expenseItem.item.name}
        description={moment(expenseItem.item.date).calendar().split(' ')[0]}
        left={props => (
          <List.Icon
            style={{opacity: 0.7}}
            icon={expenseItem.item.isIncome ? 'trending-up' : 'trending-down'}
          />
        )}
        right={props => (
          <Text style={styles.amountText}>₹ {expenseItem.item.amount}</Text>
        )}
        onPress={() => onClickExpenseItem(expenseItem.index)}
      />
    </View>
  );
};

export default ExpenseItemRenderer;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 10,
    marginBottom: 13,
    padding: 3,
    elevation: 4,
  },
  amountText: {
    marginTop: 18,
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
