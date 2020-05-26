import * as React from 'react';
import {
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default function IconButton(
  {
    children,
    disabled,
    onPress,
    style,
    ...rest
  }
) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <TouchableHighlight
      {...rest}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPress={onPress}
      style={[!disabled && styles.touchable, hovered && !disabled && styles.hovered, style]}
      underlayColor={{
        windowsbrush: 'SystemControlHighlightListMediumBrush',
      }}
    >
      {children}
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  hovered: {
    backgroundColor: {
      windowsbrush: 'SystemControlHighlightListLowBrush',
    },
  },
  touchable: {
    backgroundColor: {
      windowsbrush: 'SystemControlTransparentRevealBorderBrush',
    },
  }
});
