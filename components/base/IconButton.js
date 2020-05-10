import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import {
  Button as RNButton,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Touchable from './Touchable';
import { Colors, Sizes } from '../../constants';

export default React.forwardRef(function IconButton(
  {
    color = Colors.secondary,
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
    <View
      style={[
        styles.container,
        primary && styles.primary,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Touchable
        disabled={disabled}
        onPress={onPress}
        pressColor={pressColor}
        style={styles.touchable}
        ref={ref}
      >
        <Ionicons
          name={`${Platform.OS === 'android' ? 'md' : 'ios'}-${icon}`}
          size={26}
          color={disabled ? Colors.muted : primary ? 'white' : color}
          style={styles.icon}
        />
      </Touchable>
    </View>
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
