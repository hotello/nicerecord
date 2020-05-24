import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { Colors, Sizes } from '../../../constants';

export default React.forwardRef(function IconButton(
  {
    color = Colors.surface,
    disabled,
    icon,
    label,
    onPress,
    pressColor,
    primary,
    style,
    ...rest
  },
  ref
) {
  /*
  return (
    <View
      style={[
        styles.container,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text>Something</Text>
    </View>
  );
  */

  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.touchable}
      underlayColor={{
        windowsbrush: 'AppBarButtonBackgroundPressed'
      }}
      ref={ref}
    >
      <View style={styles.container}>
        <Text style={styles.icon}>{icon}</Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </TouchableHighlight>
  )
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: Sizes.unit * 3,
    backgroundColor: {
      windowsbrush: 'SystemControlBackgroundTransparentRevealBorderBrush',
    },
  },
  disabled: {
  },
  icon: {
    fontFamily: 'Segoe MDL2 Assets',
    fontSize: Sizes.unit * 5
  },
  label: {
    marginLeft: Sizes.unit * 2,
  },
  touchable: {
    backgroundColor: {
      windowsbrush: 'AppBarButtonBackground',
    },
  }
});
