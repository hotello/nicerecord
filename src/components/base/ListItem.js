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
  return (
    <TouchableHighlight
      {...rest}
      disabled={disabled}
      onPress={onPress}
      style={[styles.touchable, style]}
      underlayColor={{
        windowsbrush: 'SystemControlHighlightListMediumBrush',
      }}
    >
      {children}
    </TouchableHighlight>
  )
};

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: {
      windowsbrush: 'SystemControlTransparentRevealBorderBrush',
    },
  }
});
