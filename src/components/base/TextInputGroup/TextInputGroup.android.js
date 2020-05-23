import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Sizes } from '../../../constants';

export default function TextInputGroupAndroid({ children, style, ...props }) {
  return (
    <View {...props} style={[styles.group, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: Sizes.unit * 4,
    paddingHorizontal: Sizes.content,
  },
});
