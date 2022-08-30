import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {createContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import * as Interface from '../../components/shared/interface/Interface';

export const UserDataContext = createContext<Interface.UserDataCtx>({
  userInfo: {
    name: '',
    role: '',
    income: 0,
    balance: 0,
  },
  expenseList: [],
  updateUserInfo: (userObj: Interface.UserInfo) => {},
  addExpense: (exp: Interface.ExpenseItem) => {},
  removeExpense: (selectedExp: Interface.SelectedExpense) => {},
  updateExpense: (exp: Interface.SelectedExpense) => {},
});

const UserDataContextProvider: React.FC<any> = ({children}) => {
  const [userInfo, setUserInfo] = useState<Interface.UserInfo>({
    name: '',
    role: '',
    income: 0,
    balance: 0,
  });

  const [expenseList, setExpenseList] = useState<Interface.ExpenseList[]>([
    {
      month: moment().format('MMMM'),
      expList: [],
      balance: 0,
      income: 0,
      spent: 0,
    },
  ]);

  const addExpense = (expense: Interface.ExpenseItem) => {
    if (expenseList[0].month != moment().format('MMMM')) {
      let newExp = {
        month: moment().format('MMMM'),
        expList: [expense],
        balance: expenseList[0].balance || userInfo.balance || 25000,
        income: expense.isIncome ? expense.amount : 0,
        spent: !expense.isIncome ? expense.amount : 0,
      };
      setExpenseList(curList => [newExp, ...curList]);
    } else {
      const curList = [...expenseList];
      curList[0].expList.unshift(expense);
      if (expense.isIncome) {
        curList[0].balance += expense.amount;
        curList[0].income += expense.amount;
      } else {
        curList[0].balance -= expense.amount;
        curList[0].spent += expense.amount;
      }
      setExpenseList(curList);
    }
    ToastAndroid.show(`${expense.name} added`, 4000);
  };

  const removeExpense = (selectedExp: Interface.SelectedExpense) => {
    let expName = selectedExp.item.name;
    let currentExpList = [...expenseList];
    currentExpList[selectedExp.mainIdx].expList.splice(selectedExp.index, 1);
    if (selectedExp.item.isIncome) {
      currentExpList[selectedExp.mainIdx].income -= selectedExp.item.amount;
      currentExpList[selectedExp.mainIdx].balance -= selectedExp.item.amount;
    } else {
      currentExpList[selectedExp.mainIdx].balance += selectedExp.item.amount;
      currentExpList[selectedExp.mainIdx].spent -= selectedExp.item.amount;
    }
    setExpenseList(currentExpList);

    ToastAndroid.show(`${expName} deleted`, 4000);
  };

  const updateExpense = (newExpense: Interface.SelectedExpense) => {
    let currentExpList = [...expenseList];
    const spliced = currentExpList[newExpense.mainIdx].expList.splice(
      newExpense.index,
      1,
      newExpense.item,
    );

    if (newExpense.item.isIncome) {
      currentExpList[0].balance -= spliced[0].amount;
      currentExpList[0].income -= spliced[0].amount;

      currentExpList[0].balance += newExpense.item.amount;
      currentExpList[0].income += newExpense.item.amount;
    } else {
      currentExpList[0].balance += spliced[0].amount;
      currentExpList[0].spent -= spliced[0].amount;

      currentExpList[0].balance -= newExpense.item.amount;
      currentExpList[0].spent += newExpense.item.amount;
    }
    setExpenseList(currentExpList);

    ToastAndroid.show(`Expense updated`, 4000);
  };

  const updateUserInfo = (userInfo: Interface.UserInfo) => {
    setUserInfo(userInfo);
    const currentExp = [...expenseList];
    currentExp[0].balance = userInfo.balance;
    setExpenseList(currentExp);
  };

  const _getUserDataFromStorage = async () => {
    let rawData = await AsyncStorage.getItem('userData');
    let jsoned = rawData ? JSON.parse(rawData) : '';
    if (jsoned) {
      updateUserInfo(jsoned.userInfo);
      setExpenseList(jsoned.expenseList);
    }
  };

  useEffect(() => {
    _getUserDataFromStorage();
  }, []);

  useEffect(() => {
    _setUserDataToStorage();
  }, [expenseList, userInfo]);

  const _setUserDataToStorage = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify(value));
    } catch (e) {}
  };

  const value = {
    userInfo: userInfo,
    expenseList: expenseList,
    updateUserInfo: updateUserInfo,
    addExpense: addExpense,
    updateExpense: updateExpense,
    removeExpense: removeExpense,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserDataContextProvider;
