import color from 'color';
import * as React from 'react';
import {
  I18nManager,
  Platform,
  Text as RNText
} from 'react-native';

import { Colors, Sizes } from '../../constants';

export default class Text extends React.Component {
  render() {
    const { muted, style, ...rest } = this.props;
    const textColor = Platform.OS === 'windows' ?
      muted ?
        { windowsbrush: 'SystemControlPageTextBaseMediumBrush' } :
        { windowsbrush: 'SystemControlPageTextBaseHighBrush' } :
      color(Colors.text)
        .alpha(muted ? 0.5 : 1)
        .rgb()
        .string();
    const writingDirection = I18nManager.isRTL ? 'rtl' : 'ltr';

    return (
      <RNText
        {...rest}
        style={[
          {
            color: textColor,
            fontSize: Sizes.text,
            textAlign: 'left',
            writingDirection: writingDirection,
          },
          style,
          this.props.style,
        ]}
      />
    );
  }
}
