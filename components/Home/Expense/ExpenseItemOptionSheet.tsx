import React, {useEffect, useRef} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {Text} from 'react-native-paper';
import {List, MD3Colors} from 'react-native-paper';

import RBSheet from 'react-native-raw-bottom-sheet';
import {SelectedExpense} from '../../shared/interface/Interface';

export type Props = {
  open: boolean;
  selectedExpense: SelectedExpense;
  getSelectedAction: (opt: number) => void;
  closeSheet: () => void;
};

const ExpenseItemOptionSheet: React.FC<Props> = ({
  open,
  selectedExpense,
  getSelectedAction,
  closeSheet,
}) => {
  useEffect(() => {
    if (open) refRBSheet.current.open();
    else refRBSheet.current.close();
  }, [open]);

  const actionSheetClose = (option: number) => {
    getSelectedAction(option);
    closeSheet();
  };

  const theme = useColorScheme();

  const expenseItemOptions = [
    {
      title: 'View',
      icon: 'briefcase-eye',
      onPress: () => actionSheetClose(1),
    },
    {
      title: 'Edit',
      icon: 'pencil-box',
      onPress: () => actionSheetClose(2),
    },
    {
      title: 'Delete',
      icon: 'delete',
      onPress: () => actionSheetClose(3),
    },
  ];

  const refRBSheet = useRef();
  return (
    <RBSheet
      ref={refRBSheet}
      animationType="fade"
      closeOnDragDown={true}
      onClose={closeSheet}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
        container: {
          backgroundColor: theme == 'dark' ? '#1b1d21' : MD3Colors.primary95,
        },
      }}>
      <Text style={{fontSize: 16, textAlign: 'center', marginVertical: 10}}>
        {selectedExpense.item?.name}
      </Text>
      {expenseItemOptions.map(expOpt => {
        return (
          <List.Item
            key={expOpt.icon}
            title={expOpt.title}
            left={props => <List.Icon {...props} icon={expOpt.icon} />}
            onPress={expOpt.onPress}
          />
        );
      })}
    </RBSheet>
  );
};

export default ExpenseItemOptionSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
