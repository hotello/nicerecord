import * as React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View
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
      <View style={styles.container}>
        {children}
      </View>
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  hovered: {
    backgroundColor: {
      windowsbrush: 'SystemControlHighlightListLowBrush',
    },
  },
  container: {
    backgroundColor: {
      windowsbrush: 'SystemControlTransparentRevealBackgroundBrush',
    },
    borderColor: {
      windowsbrush: 'SystemControlBackgroundTransparentRevealBorderBrush',
    },
    borderWidth: StyleSheet.hairlineWidth,
  },
  touchable: {
    backgroundColor: {
      windowsbrush: 'SystemControlTransparentBrush',
    },
  }
});
