
import * as React from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Touchable from './Touchable';
import { Colors, Sizes } from '../../constants';

export default React.forwardRef(function IconButton(
  {
    color = Colors.primary,
    disabled,
    icon,
    onPress,
    pressColor,
    primary,
    style,
    ...rest
  },
  ref
) {
  return (
    <Touchable
      disabled={disabled}
      onPress={onPress}
      pressColor={pressColor}
      style={styles.touchable}
      ref={ref}
    >
      <View
        style={[
          styles.container,
          primary && styles.primary,
          disabled && styles.disabled,
          style,
        ]}
      >
        <Ionicons
          name={`${Platform.OS === 'android' ? 'md' : 'ios'}-${icon}`}
          size={26}
          color={disabled ? Colors.muted : primary ? 'white' : color}
          style={styles.icon}
        />
      </View>
    </Touchable>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: Sizes.unit * 100,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: 'transparent',
  },
  icon: {
    height: 28,
    margin: 4,
    textAlign: 'center',
    width: 28,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
});
