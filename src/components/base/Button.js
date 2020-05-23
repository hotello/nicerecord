import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '../../constants';

export default class Button extends React.Component {
  render() {
    const {
      accessibilityLabel,
      bold,
      color,
      onPress,
      touchSoundDisabled,
      title,
      hasTVPreferredFocus,
      nextFocusDown,
      nextFocusForward,
      nextFocusLeft,
      nextFocusRight,
      nextFocusUp,
      disabled,
      testID,
    } = this.props;
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];
    if (color) {
      if (Platform.OS === 'ios') {
        textStyles.push({ color: color });
      } else {
        buttonStyles.push({ backgroundColor: color });
      }
    }
    const accessibilityState = {};
    if (disabled) {
      buttonStyles.push(styles.buttonDisabled);
      textStyles.push(styles.textDisabled);
      accessibilityState.disabled = true;
    }
    if (bold) {
      textStyles.push(styles.bold);
    }
    const formattedTitle =
      Platform.OS === 'android' ? title.toUpperCase() : title;
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
      <Touchable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        hasTVPreferredFocus={hasTVPreferredFocus}
        nextFocusDown={nextFocusDown}
        nextFocusForward={nextFocusForward}
        nextFocusLeft={nextFocusLeft}
        nextFocusRight={nextFocusRight}
        nextFocusUp={nextFocusUp}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        touchSoundDisabled={touchSoundDisabled}
      >
        <View style={buttonStyles}>
          <Text style={textStyles} disabled={disabled}>
            {formattedTitle}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  button: {},
  text: {
    textAlign: 'center',
    margin: 8,
    color: Colors.primary,
    fontSize: 18,
  },
  buttonDisabled: {},
  textDisabled: {
    color: Colors.muted,
  },
});
