import * as React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

import { Sizes } from '../../../constants';

export default React.forwardRef(function TextInputWindows(
  { multiline, numberOfLines = 1, style, ...props },
  ref
) {
  const height = { height: numberOfLines * Sizes.unit * 7 };
  return (
    <RNTextInput
      {...props}
      multiline={multiline}
      ref={ref}
      style={[styles.input, multiline && height, style]}
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
