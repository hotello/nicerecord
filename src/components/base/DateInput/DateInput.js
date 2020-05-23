import { format } from 'date-fns';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Text from '../Text';
import Touchable from '../Touchable';
import { Sizes } from '../../../constants';

export default function DateInput(
  { editable, label, onChange = () => {}, value, ...props },
  ref
) {
  const [show, setShow] = React.useState(false);

  const onChangeInternal = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');
    onChange(selectedDate);
  };

  const togglePicker = () => setShow(!show);

  return (
    <View>
      <Touchable onPress={togglePicker} disabled={!editable}>
        <View style={styles.content}>
          <Text>{label}</Text>
          <Text>{format(value, 'PP')}</Text>
        </View>
      </Touchable>
      {show && (
        <DateTimePicker {...props} onChange={onChangeInternal} value={value} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.content,
    paddingVertical: Sizes.unit * 3,
  },
});
