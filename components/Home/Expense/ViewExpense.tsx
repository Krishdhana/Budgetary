import React from 'react';
import moment from 'moment';
import {View, Text, StyleSheet} from 'react-native';
import {Dialog, Button, Portal} from 'react-native-paper';
import {SelectedExpense} from '../../shared/interface/Interface';

export type Props = {
  open: boolean;
  close: () => void;
  selectedExpense: SelectedExpense;
};

const ViewExpense: React.FC<Props> = ({open, close, selectedExpense}) => {
  return (
    <Portal>
      <Dialog visible={open} onDismiss={() => close()}>
        <Dialog.Title>Expense Details</Dialog.Title>
        <Dialog.Content style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Name :</Text>
            <Text>{selectedExpense.item?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Amount :</Text>
            <Text>₹ {selectedExpense.item?.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {selectedExpense.item?.isIncome ? 'Received' : 'Purchased'} on :
            </Text>
            <Text> {moment(selectedExpense.item?.date).calendar()}</Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => close()}>Close</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ViewExpense;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '12%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontWeight: 'bold',
  },
});
