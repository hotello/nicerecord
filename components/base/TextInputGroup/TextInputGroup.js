import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, Sizes } from '../../../constants';

export default function TextInputGroup({ children, style, ...props }) {
  return (
    <View {...props} style={[styles.group, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    borderBottomColor: Colors.border,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginBottom: Sizes.unit * 4,
  },
});
