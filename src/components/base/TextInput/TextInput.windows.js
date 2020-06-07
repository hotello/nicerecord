import * as React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

import { Sizes } from '../../../constants';
import Text from '../Text';

export default React.forwardRef(function TextInputWindows(
  {
    editable,
    label,
    multiline,
    numberOfLines = 1,
    required,
    style,
    ...props
  },
  ref
) {
  const height = { height: numberOfLines * Sizes.unit * 7 };
  return (
    <View>
      {label && (
        <Text style={{ marginBottom: Sizes.unit }}>
          {label + (required && editable ? ' *' : '')}
        </Text>
      )}
      <RNTextInput
        {...props}
        editable={editable}
        multiline={multiline}
        ref={ref}
        style={[styles.input, multiline && height, style]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    borderRadius: Sizes.radius,
    marginBottom: Sizes.unit * 2,
    minHeight: Sizes.unit * 8,
  },
});
