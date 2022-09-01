import React, {useContext} from 'react';
import {UserDataContext} from '../../store/redux/userdata-context';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import ExpenseItemRenderer from '../shared/ExpenseItemRenderer';

const ExpenseListHistory = () => {
  const userDataCtx = useContext(UserDataContext);

  return (
    <FlatList
      style={{marginTop: 10}}
      showsVerticalScrollIndicator={false}
      data={userDataCtx.expenseList}
      renderItem={data => {
        return (
          <View style={{marginBottom: 6}}>
            <Text style={{marginBottom: 8, marginLeft: 15, fontSize: 16}}>
              <Text style={{marginBottom: 8, marginLeft: 15, fontSize: 16}}>
                {data.index == 0 ? 'This month' : data.item.month}
              </Text>
            </Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.item.expList}
              style={{marginTop: 6}}
              renderItem={exp => {
                return (
                  <ExpenseItemRenderer
                    onClickExpenseItem={(idx: number) => {}}
                    expenseItem={exp}
                  />
                );
              }}
            />
          </View>
        );
      }}
    />
  );
};

export default ExpenseListHistory;
