import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text} from 'react-native-paper';

import {useContext, useEffect, useState} from 'react';

import {UserDataContext} from '../../../store/redux/userdata-context';
import NoExpenseMsg from './NoExpenseMsg';
import {SelectedExpense} from '../../shared/interface/Interface';
import {Button} from 'react-native-paper';
import ExpenseItemRenderer from '../../shared/ExpenseItemRenderer';
import * as Types from '../../shared/interface/Interface';

export type Props = {
  onExpenseItemPress: () => void;
  setSelectedExpense: (exp: SelectedExpense) => void;
};

const Expense: React.FC<Props> = ({onExpenseItemPress, setSelectedExpense}) => {
  const userDataCtx = useContext(UserDataContext);
  const [recentExpenses, setRecentExpenses] = useState<Types.ExpenseItem[]>([]);

  useEffect(() => {
    setRecentExpenses(userDataCtx.expenseList[0].expList.slice(0, 9));
  }, [userDataCtx.expenseList]);

  const onClickExpenseItem = (expIdx: number, mainIdx = 0) => {
    let exp = {
      item: userDataCtx.expenseList[mainIdx].expList[expIdx],
      index: expIdx,
      mainIdx: mainIdx,
    };
    setSelectedExpense(exp);
    onExpenseItemPress();
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 18}}>All Expenses</Text>
        <Button onPress={() => {}} mode="text">
          History
        </Button>
      </View>
      {userDataCtx.expenseList.length <= 1 &&
      userDataCtx.expenseList[0].expList.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recentExpenses}
          renderItem={exp => (
            <ExpenseItemRenderer
              expenseItem={exp}
              onClickExpenseItem={onClickExpenseItem}
            />
          )}
        />
      ) : (
        <NoExpenseMsg />
      )}
    </View>
  );
};

export default Expense;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 2,
  },
});
