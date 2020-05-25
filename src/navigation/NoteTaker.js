import React from 'react';
import { StyleSheet, View } from 'react-native';

import NoteContext from '../components/NoteContext';
import { Colors } from '../constants';
import NoteScreen from '../screens/NoteScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function NoteTaker({ navigation: parentNavigation }) {
  const [note, setNoteState] = React.useState(null);
  const [route, setRoute] = React.useState({
    name: 'Profile',
    params: { edit: true },
  });
  const navigation = {
    goBack: () => parentNavigation.navigate('MyPatients'),
    navigate: (name, params) => setRoute({ name, params })
  };

  const setNote = (note) => setNoteState(note);

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      <View style={styles.container}>
        <View style={styles.left}>
          <ProfileScreen navigation={navigation} route={route} />
        </View>

        <View style={styles.right}>
          <NoteScreen navigation={navigation} route={route} />
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
    backgroundColor: {
      windowsbrush: 'SystemControlAcrylicWindowBrush'
    },
    flex: 1 / 3,
  },
  right: {
    flex: 2 / 3,
  },
});
