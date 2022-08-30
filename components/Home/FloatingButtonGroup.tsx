import React from 'react';

import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

export type Props = {
  getAddOption: (opt: string) => void;
};

const FloatingButtonGroup: React.FC<Props> = ({getAddOption}) => {
  const [isFABOpen, setIsFABOpen] = useState(false);
  const onStateChange = ({open}: any) => setIsFABOpen(open);

  return (
    <FAB.Group
      style={styles.fabStyle}
      visible={true}
      open={isFABOpen}
      icon={isFABOpen ? 'chevron-down' : 'plus'}
      actions={[
        {
          icon: 'trending-down',
          label: 'Expense',
          onPress: () => getAddOption('Expense'),
        },
        {
          icon: 'trending-up',
          label: 'Income',
          onPress: () => getAddOption('Income'),
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        setIsFABOpen(!isFABOpen);
      }}
    />
  );
};

export default FloatingButtonGroup;

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
