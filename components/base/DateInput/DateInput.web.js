import { format } from 'date-fns';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../Text';
import { Sizes } from '../../../constants';

export default function DateInput(
  { editable, label, onChange = () => {}, value, ...props },
  ref
) {
  return (
    <View style={styles.content}>
      <Text>{label}</Text>
      <View>
        <input
          disabled={!editable}
          onChange={onChange}
          type="date"
          value={
            value.toISOString ? value.toISOString().substring(0, 10) : value
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.content,
    paddingVertical: Sizes.unit * 2,
  },
});
