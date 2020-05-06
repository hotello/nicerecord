import * as React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

import { Colors, Sizes } from '../../../constants';

export default React.forwardRef(function TextInput(
  {
    // Catch this property to avoid console notices
    disabledUnderlineAndroid,

    placeholderTextColor = Colors.muted,
    selectionColor = Colors.secondary,
    style,
    underlineIOS,
    ...props
  },
  ref
) {
  return (
    <View style={[styles.container, style]}>
      <RNTextInput
        {...props}
        placeholderTextColor={placeholderTextColor}
        ref={ref}
        selectionColor={selectionColor}
        style={[styles.input, underlineIOS ? styles.withBorder : null]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingLeft: Sizes.content,
  },
  input: {
    fontSize: Sizes.text,
    paddingVertical: Sizes.unit * 3,
  },
  withBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
});
