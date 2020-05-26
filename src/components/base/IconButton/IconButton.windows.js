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
  const [hovered, setHovered] = React.useState(false);

  return (
    <TouchableHighlight
      {...rest}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPress={onPress}
      style={[
        !disabled && styles.touchable,
        disabled && styles.disabled,
        hovered && !disabled && styles.hovered,
        style
      ]}
      underlayColor={{
        windowsbrush: 'AppBarButtonBackgroundPressed'
      }}
      ref={ref}
    >
      <View style={[styles.container, !disabled && styles.containerReveal]}>
        <Text style={[styles.icon, disabled && styles.foregroundDisabled]}>
          {icon}
        </Text>
        {label && (
          <Text style={[styles.label, disabled && styles.foregroundDisabled]}>
            {label}
          </Text>
        )}
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
  },
  containerReveal: {
    backgroundColor: {
      windowsbrush: 'SystemControlTransparentRevealBackgroundBrush',
    },
    borderColor: {
      windowsbrush: 'SystemControlBackgroundTransparentRevealBorderBrush',
    },
    borderWidth: StyleSheet.hairlineWidth,
  },
  disabled: {
    backgroundColor: {
      windowsbrush: 'AppBarButtonBackgroundDisabled',
    },
  },
  foregroundDisabled: {
    color: {
      windowsbrush: 'AppBarButtonForegroundDisabled',
    },
  },
  hovered: {
    backgroundColor: {
      windowsbrush: 'AppBarButtonBackgroundPointerOver',
    },
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
