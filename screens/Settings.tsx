import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import Wrapper from '../components/shared/Wrapper';
import {UserDataContext} from '../store/redux/userdata-context';
import {useEffect} from 'react';
import ResetCacheDialog from '../components/Setting/ResetCacheDialog';

const Settings = () => {
  const clearAppData = async () => {
    await AsyncStorage.removeItem('userData');
    setResetCacheDialogState(false);
    ToastAndroid.show('Cache cleared, please restart app to see changes', 4000);
  };

  const UserDataCtx = useContext(UserDataContext);
  const [isEditMode, setEditMode] = useState(false);
  const [resetCacheDialogState, setResetCacheDialogState] = useState(false);

  const [name, setName] = useState(UserDataCtx.userInfo?.name);
  const [role, setRole] = useState(UserDataCtx.userInfo?.role);
  const [income, setIncome] = useState(UserDataCtx.userInfo?.income || '0');
  const [balance, setBalance] = useState(
    UserDataCtx.expenseList[0].balance || '0',
  );

  useEffect(() => {
    setBalance(UserDataCtx.expenseList[0].balance);
  }, [UserDataCtx.expenseList[0].balance]);

  const updateUserData = () => {
    if (isNaN(+balance) || isNaN(+income)) {
      ToastAndroid.show('Balance and Income should be Numbers', 4000);
    } else {
      let obj = {
        name: name,
        role: role,
        income: +income,
        balance: +balance,
      };
      UserDataCtx.updateUserInfo(obj);
      setEditMode(false);

      ToastAndroid.show('User details Updated !', 5000);
    }
  };

  return (
    <Wrapper>
      <View>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.container}>
          <View style={styles.flex}>
            <Text style={{fontSize: 16}}>User Details</Text>
            {!isEditMode && (
              <IconButton
                icon="account-edit-outline"
                size={20}
                onPress={() => setEditMode(true)}
              />
            )}
          </View>
          <TextInput
            style={styles.textInput}
            disabled={!isEditMode}
            mode="flat"
            label="Name"
            value={name}
            onChangeText={setName}
            dense={true}
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            disabled={!isEditMode}
            value={role}
            onChangeText={setRole}
            label="Role"
            dense={true}
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            disabled={!isEditMode}
            label="Income"
            value={income.toString()}
            keyboardType="numeric"
            onChangeText={setIncome}
            dense={true}
          />
          <TextInput
            style={styles.textInput}
            mode="flat"
            disabled={!isEditMode}
            keyboardType="numeric"
            label="Balance"
            value={balance.toString()}
            onChangeText={setBalance}
            dense={true}
          />
          <View style={styles.btnContainer}>
            {isEditMode && (
              <Button mode="contained-tonal" onPress={updateUserData}>
                Update
              </Button>
            )}
            <Button
              style={{marginTop: 20}}
              onPress={() => setResetCacheDialogState(true)}
              icon={'close-circle-outline'}
              mode={'text'}>
              Reset App
            </Button>
          </View>
        </View>
        <View style={styles.creditContainer}>
          <Text style={styles.creditText}>Crafted</Text>
          <Text style={styles.creditText}>with</Text>
          <Icon name="heart" size={20} color="red" />
          <Text style={[styles.creditText, {letterSpacing: 1}]}>KD</Text>
        </View>
      </View>
      <ResetCacheDialog
        clearCache={clearAppData}
        close={() => setResetCacheDialogState(false)}
        open={resetCacheDialogState}
      />
    </Wrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
  },
  flex: {
    display: 'flex',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  textInput: {
    marginBottom: 20,
  },
  btnContainer: {
    width: '40%',
    marginHorizontal: '30%',
    marginTop: 20,
  },
  creditContainer: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    marginTop: 40,
    fontWeight: 'bold',
  },
  creditText: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});
