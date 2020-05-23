import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import NoteContext from '../components/NoteContext';
import { Colors } from '../constants';
// import NoteScreen from '../screens/NoteScreen';

export default function RootNavigator() {
  const [note, setNoteState] = React.useState(null);

  const setNote = (note) => setNoteState(note);

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text>Left</Text>
        </View>

        <View style={styles.right}>
          <Text>Right</Text>
        </View>
      </View>
    </NoteContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  left: {
    flex: 1 / 3,
    borderColor: Colors.border,
    borderWidth: StyleSheet.hairlineWidth,
  },
  right: {
    flex: 2 / 3,
  },
});
