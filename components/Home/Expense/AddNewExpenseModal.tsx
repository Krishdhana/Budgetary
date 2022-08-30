import React from 'react';

import {
  Modal,
  Portal,
  Button,
  TextInput,
  MD3Colors,
  RadioButton,
} from 'react-native-paper';
import {useContext, useEffect, useState} from 'react';
import {UserDataContext} from '../../../store/redux/userdata-context';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {SelectedExpense} from '../../shared/interface/Interface';

export type Props = {
  open: boolean;
  isIncome: boolean;
  isEditMode: boolean;
  selectedExpense: SelectedExpense;
  closeModal: () => void;
};

const AddNewExpenseModal: React.FC<Props> = ({
  open,
  isIncome,
  isEditMode,
  selectedExpense,
  closeModal,
}) => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<
    'CASH' | 'BANK' | 'CREDIT_CARD' | null
  >('CASH');

  const containerStyle = {
    backgroundColor: MD3Colors.primary95,
    padding: 20,
    borderRadius: 20,
  };
  const userDataCtx = useContext(UserDataContext);

  useEffect(() => {
    if (isEditMode && open) {
      setExpenseName(selectedExpense.item.name);
      setExpenseAmount(selectedExpense.item.amount.toString());
      setPaymentMode(selectedExpense.item.paymentMode);
    } else {
      setExpenseName('');
      setExpenseAmount('');
      setPaymentMode('CASH');
    }
  }, [open]);

  const addExpenseHandler = () => {
    if (
      !isNaN(+expenseAmount) &&
      expenseName.length > 2 &&
      +expenseAmount > 0
    ) {
      let expenseItem = {
        name: expenseName,
        amount: +expenseAmount,
        isIncome: isIncome,
        paymentMode: isIncome ? null : paymentMode,
        date: new Date().toISOString(),
      };

      if (!isEditMode) {
        userDataCtx.addExpense(expenseItem);
      } else {
        let newExpense = {...selectedExpense, item: expenseItem};
        userDataCtx.updateExpense(newExpense);
      }
      closeModal();
    } else {
      ToastAndroid.show('Amount should be numbers', 4000);
    }
  };

  return (
    <Portal>
      <Modal
        style={styles.modal}
        visible={open}
        dismissable={false}
        onDismiss={closeModal}
        contentContainerStyle={containerStyle}>
        <Text style={styles.title}>
          {isIncome ? 'Add Income' : 'Add Expense'}
        </Text>
        <TextInput
          onChangeText={setExpenseName}
          value={expenseName}
          mode="flat"
          dense={true}
          label="Name"
          style={{marginBottom: 15}}
        />
        <TextInput
          onChangeText={setExpenseAmount}
          value={expenseAmount}
          mode="flat"
          dense={true}
          label="Amount"
          keyboardType="number-pad"
          style={{marginBottom: 15}}
        />
        {!isIncome && (
          <View>
            <Text style={{marginBottom: 5}}>Payment Mode</Text>
            <RadioButton.Group
              value={paymentMode}
              onValueChange={setPaymentMode}>
              <View style={styles.radioBtnContainer}>
                <View style={styles.radioGroup}>
                  <RadioButton value="CASH" />
                  <Text>Cash</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="CREDIT_CARD" />
                  <Text>Credit Card</Text>
                </View>
                <View style={styles.radioGroup}>
                  <RadioButton value="BANK" />
                  <Text>Bank </Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>
        )}

        <View style={styles.btnContainer}>
          <Button
            style={{marginHorizontal: 10}}
            mode="text"
            compact={true}
            onPress={() => closeModal()}>
            Cancel
          </Button>
          <Button
            compact={true}
            mode="contained-tonal"
            onPress={addExpenseHandler}>
            {isEditMode
              ? `Update ${isIncome ? 'Income' : 'Expense'}`
              : `Add ${isIncome ? 'Income' : 'Expense'}`}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddNewExpenseModal;

const styles = StyleSheet.create({
  modal: {
    margin: 20,
  },
  title: {
    marginBottom: 15,
    fontSize: 15,
  },
  radioBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  radioGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
});
