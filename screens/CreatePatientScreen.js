import * as faker from 'faker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, Sizes } from '../constants';
import {
  Button,
  IconButton,
  TextInput,
  TextInputGroup,
} from '../components/base';

export default function NoteScreen({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.done}>
          <Button bold title="Done" />
        </View>
      ),
    });
  }, []);
  return (
    <View style={styles.screen}>
      <TextInputGroup>
        <TextInput placeholder="First name" underlineIOS />
        <TextInput placeholder="Last name" />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          autoCompleteType="tel"
          keyboardType="number-pad"
          placeholder="Phone number"
          style={styles.input}
        />
      </TextInputGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  done: {
    marginRight: Sizes.edge,
  },
  screen: {
    flex: 1,
    paddingTop: Sizes.content,
  },
});
