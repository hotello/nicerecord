import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import {
  Icon,
  IconButton,
  ListItem,
  Text
} from '../components/base';
import NoteContext from '../components/NoteContext';
import { Sizes } from '../constants';
import MyPatientsScreen from '../screens/MyPatientsScreen';
import NoteScreen from '../screens/NoteScreen';
import PatientScreen from '../screens/PatientScreen';
import ProfileScreen from '../screens/ProfileScreen';

export default function RootNavigator() {
  const { t } = useTranslation();
  const [note, setNoteState] = React.useState(null);
  const [open, setOpen] = React.useState(true);
  const [route, setRoute] = React.useState({
    name: 'Profile',
    params: { edit: true },
  });
  const navigation = {
    navigate: (name, params) => setRoute({ name, params })
  };

  const setNote = (note) => setNoteState(note);

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      <View style={styles.container}>
        <View style={[styles.sidebar, open && styles.open]}>
          <View style={{ alignItems: 'flex-start', marginTop: Sizes.unit * 4 }}>
            <IconButton icon="&#xE700;" onPress={() => setOpen(!open)} />
          </View>
          <IconButton
            icon="&#xE8FA;"
            label={open ? t('addPatient') : undefined}
            onPress={() => navigation.navigate('Profile', { patient: null, edit: true })}
          />
          {open && <MyPatientsScreen navigation={navigation} route={route} />}
        </View>

        <View style={styles.master}>
          {{
            'Patient': <PatientScreen navigation={navigation} route={route} />,
            'Profile': <ProfileScreen navigation={navigation} route={route} />,
          }[route.name]}
        </View>

        <View style={styles.detail}>
          <NoteScreen navigation={navigation} route={route} />
        </View>
      </View>
    </NoteContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: {
      windowsbrush: 'SystemControlPageBackgroundAltHighBrush'
    },
    flex: 1,
    flexDirection: 'row',
  },
  detail: {
    flex: 1,
  },
  master: {
    width: Sizes.unit * 100,
  },
  sidebar: {
    backgroundColor: {
      windowsbrush: 'SystemControlAcrylicWindowBrush'
    },
    width: Sizes.unit * 14,
  },
  open: {
    width: Sizes.unit * 80,
  },
});
