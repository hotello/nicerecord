import * as faker from 'faker';
import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Sizes } from '../constants';

export default function NoteScreen() {
  return (
    <View style={styles.screen}>
      <TextInput multiline placeholder="Write here..." style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: 'flex-start',
    flex: 1,
    fontSize: Sizes.text,
  },
  screen: {
    flex: 1,
    padding: Sizes.content,
  },
});
