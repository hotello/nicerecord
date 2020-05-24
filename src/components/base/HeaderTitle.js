import * as React from 'react';
import { Text } from "@fluentui/react-native";

export default function ({ children, ...props }) {
  return <Text {...props} variant="heroLargeStandard">{children}</Text>;
}