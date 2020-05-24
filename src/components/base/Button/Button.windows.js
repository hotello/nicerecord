import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { Sizes } from '../../../constants';

export default React.forwardRef(function ButtonWindows(
  {
    disabled,
    onPress,
    pressColor,
    style,
    title,
    ...rest
  },
  ref
) {
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onPress}
      style={[styles.touchable, disabled && styles.disabled]}
      underlayColor={{
        windowsbrush: 'ButtonBackgroundPressed'
      }}
      ref={ref}
    >
      <View style={styles.container}>
        <Text style={[styles.label, disabled && styles.labelDisabled]}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  )
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Sizes.unit * 2,
  },
  disabled: {
    backgroundColor: {
      windowsbrush: 'ButtonBackgroundDisabled',
    },
  },
  label: {
    color: {
      windowsbrush: 'ButtonForeground',
    },
  },
  labelDisabled: {
    color: {
      windowsbrush: 'ButtonForegroundDisabled',
    },
  },
  touchable: {
    backgroundColor: {
      windowsbrush: 'ButtonBackground',
    },
  }
});
