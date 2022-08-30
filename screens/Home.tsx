import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';
import {UserDataContext} from '../store/redux/userdata-context';

import WelcomeTitle from '../components/Home/WelcomeTitle';
import Expense from '../components/Home/Expense/Expense';
import Wrapper from '../components/shared/Wrapper';
import OverviewBanner from '../components/Home/OverviewBanner';
import AddNewExpenseModal from '../components/Home/Expense/AddNewExpenseModal';
import ExpenseItemOptionSheet from '../components/Home/Expense/ExpenseItemOptionSheet';
import ViewExpense from '../components/Home/Expense/ViewExpense';
import {SelectedExpense} from '../components/shared/interface/Interface';
import FloatingButtonGroup from '../components/Home/FloatingButtonGroup';

const Home = () => {
  const userDataCtx = useContext(UserDataContext);

  const [bottomSheetState, setBottomSheetState] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({} as SelectedExpense);
  const [expenseEditMode, setExpenseEditMode] = useState(false);

  const [addNewExpenseModalState, setAddNewExpenseModalState] = useState(false);
  const [isIncomeMode, setIsIncomeMode] = useState(false);
  const [viewExpenseDialog, setViewExpenseDialog] = useState(false);

  const resetToDefault = () => {
    setAddNewExpenseModalState(false);
    setExpenseEditMode(false);
    setViewExpenseDialog(false);
    setSelectedExpense({} as SelectedExpense);
    setIsIncomeMode(false);
  };

  const openBottomSheet = () => {
    setBottomSheetState(true);
  };

  const updateExpenseItem = () => {
    setExpenseEditMode(true);
    setAddNewExpenseModalState(true);
    setIsIncomeMode(selectedExpense.item.isIncome);
  };

  const deleteExpenseItem = () => {
    userDataCtx.removeExpense(selectedExpense);
  };

  const getBottomSheetAction = (option: number) => {
    switch (option) {
      case 1:
        setViewExpenseDialog(true);
        break;
      case 2:
        updateExpenseItem();
        break;
      case 3:
        deleteExpenseItem();
        break;
    }
  };

  const getAddOption = (opt: string) => {
    switch (opt) {
      case 'Income':
        setIsIncomeMode(true);
        break;
      case 'Expense':
        setIsIncomeMode(false);
    }
    setAddNewExpenseModalState(true);
  };

  return (
    <Wrapper>
      <View style={{flex: 1}}>
        <WelcomeTitle name={userDataCtx.userInfo.name} />
        <OverviewBanner expenseList={userDataCtx.expenseList[0]} />
        <View style={{flex: 2}}>
          <Expense
            setSelectedExpense={setSelectedExpense}
            onExpenseItemPress={openBottomSheet}
          />
        </View>
        <AddNewExpenseModal
          open={addNewExpenseModalState}
          isEditMode={expenseEditMode}
          isIncome={isIncomeMode}
          closeModal={resetToDefault}
          selectedExpense={selectedExpense}
        />
        <ViewExpense
          selectedExpense={selectedExpense}
          open={viewExpenseDialog}
          close={resetToDefault}
        />
        <ExpenseItemOptionSheet
          selectedExpense={selectedExpense}
          open={bottomSheetState}
          closeSheet={() => setBottomSheetState(false)}
          getSelectedAction={getBottomSheetAction}
        />
      </View>
      <FloatingButtonGroup getAddOption={getAddOption} />
    </Wrapper>
  );
};

export default Home;
