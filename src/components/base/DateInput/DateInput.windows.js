import format from 'date-fns/format';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import TextInput from '../TextInput';

export default function DateInput({
  editable,
  label,
  onChange = () => { },
  value,
  ...props
}) {
  const onChangeInternal = (_, selectedDate) => {
    onChange(selectedDate);
  };

  return editable === false || editable === null ? (
    <TextInput
      editable={false}
      placeholder={label}
      value={value ? format(value, 'PP') : undefined}
    />
  ) : (
      <DateTimePicker
        {...props}
        onChange={onChangeInternal}
        placeholderText={label}
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
