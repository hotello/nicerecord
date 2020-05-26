import * as React from 'react';
import { Text } from 'react-native';

export default function IconWindows({ size = 20, name, style, ...props }) {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: 'Segoe MDL2 Assets',
          fontSize: size,
          color: {
            windowsbrush: 'SystemControlPageTextBaseHighBrush',
          },
        },
        style
      ]}
    >
      {name}
    </Text>
  );
}