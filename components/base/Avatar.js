import React from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import initials from 'initials';

const avatarSizes = {
  small: 36,
  medium: 54,
  large: 76,
  xlarge: 146,
};
const bgColors = [
  '#9e2b25',
  '#51355a',
  '#241e4e',
  '#ce6c47',
  '#ffd046',
  '#eadaa2',
  '#f52f57',
  '#f79d5c',
  '#f3752b',
  '#5bc0eb',
  '#9bc53d',
];

const sumChars = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }

  return sum;
};
const generateBgStyle = (name) => {
  // Pick a deterministic color from the list
  const i = sumChars(name) % bgColors.length;
  const background = bgColors[i];

  return { backgroundColor: background };
};

const Avatar = ({
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  source,
  size,
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  imageProps,
  placeholderStyle,
  ImageComponent,
  style,
  ...attributes
}) => {
  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small;
  const height = width;
  const titleSize = width / 2;

  return (
    <Component
      onPress={onPress}
      onLongPress={onLongPress}
      style={[
        styles.container,
        { height, width },
        rounded && { borderRadius: width / 2 },
        title && generateBgStyle(title),
        style,
      ]}
      {...attributes}
    >
      {source ? (
        <Image
          placeholderStyle={placeholderStyle}
          PlaceholderContent={PlaceholderContent}
          containerStyle={StyleSheet.flatten([
            styles.overlayContainer,
            rounded && { borderRadius: width / 2, overflow: 'hidden' },
            overlayContainerStyle,
          ])}
          source={source}
          {...imageProps}
          style={StyleSheet.flatten([
            styles.avatar,
            imageProps && imageProps.style,
            avatarStyle,
          ])}
          ImageComponent={ImageComponent}
        />
      ) : (
        title && (
          <Text
            style={StyleSheet.flatten([
              styles.title,
              { fontSize: titleSize },
              titleStyle,
            ])}
          >
            {initials(title)}
          </Text>
        )
      )}
    </Component>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    flex: 1,
    width: null,
    height: null,
  },
  overlayContainer: {
    flex: 1,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
  },
});
