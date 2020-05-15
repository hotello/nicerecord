import * as React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

export default class Touchable extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    const Touchable =
      Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    return <Touchable {...rest}>{children}</Touchable>;
  }
}
