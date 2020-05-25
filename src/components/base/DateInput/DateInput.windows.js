import { format } from 'date-fns';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Sizes } from '../../../constants';

export default function DateInput(
  { editable, label, onChange = () => { }, value, ...props },
  ref
) {

  const onChangeInternal = (_, selectedDate) => {
    onChange(selectedDate);
  };

  return (
    <DateTimePicker
      {...props}
      onChange={onChangeInternal}
      value={value}
      style={styles.picker}
    />
  );
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
  },
});
