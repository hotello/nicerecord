import * as React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

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
  return (
    <RNTextInput
      {...props}
      placeholderTextColor={placeholderTextColor}
      ref={ref}
      selectionColor={selectionColor}
      style={[styles.input, style]}
    />
  );
});

const styles = StyleSheet.create({
  input: {
    borderRadius: Sizes.radius,
    marginBottom: Sizes.unit * 2,
    minHeight: Sizes.unit * 8,
  },
});
