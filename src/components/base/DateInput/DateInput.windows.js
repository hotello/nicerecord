import format from 'date-fns/format';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Text from '../Text';
import TextInput from '../TextInput';
import { Sizes } from '../../../constants';

export default function DateInput({
  editable,
  label,
  onChange = () => { },
  placeholder,
  required,
  value,
  ...props
}) {
  const onChangeInternal = (_, selectedDate) => {
    onChange(selectedDate);
  };

  return editable === false || editable === null ? (
    <TextInput
      editable={false}
      label={label}
      value={value ? format(value, 'PP') : undefined}
    />
  ) : (
      <View>
        {label && (
          <Text style={{ marginBottom: Sizes.unit }}>
            {label + (required && editable ? ' *' : '')}
          </Text>
        )}
        <DateTimePicker
          {...props}
          onChange={onChangeInternal}
          placeholderText={placeholder}
          value={value}
          style={styles.picker}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  picker: {
    width: '100%',
  },
});
