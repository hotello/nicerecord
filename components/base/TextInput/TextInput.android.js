import * as React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

import { Colors, Sizes } from '../../../constants';

export default React.forwardRef(function TextInputAndroid(
  {
    disabledUnderlineAndroid,
    placeholderTextColor = Colors.muted,
    selectionColor = Colors.primary,
    style,
    underlineColorAndroid = Colors.primary,
    ...props
  },
  ref
) {
  if (disabledUnderlineAndroid) {
    underlineColorAndroid = undefined;
  }

  return (
    <RNTextInput
      {...props}
      placeholderTextColor={placeholderTextColor}
      ref={ref}
      selectionColor={selectionColor}
      style={[styles.input, style]}
      underlineColorAndroid={underlineColorAndroid}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    fontSize: Sizes.text,
    paddingHorizontal: Sizes.unit,
    paddingVertical: Sizes.unit * 3,
  },
});
