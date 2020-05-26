import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Text } from '../components/base';
import NoteContext from '../components/NoteContext';
import MyPatientsScreen from '../screens/MyPatientsScreen';
import NoteScreen from '../screens/NoteScreen';
import PatientScreen from '../screens/PatientScreen';
import ProfileScreen from '../screens/ProfileScreen';

function StartBy() {
  const { t } = useTranslation();
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text>{t('startBy')}</Text>
    </View>
  );
}

export default function RootNavigator() {
  const [note, setNoteState] = React.useState(null);
  const [route, setRoute] = React.useState({
    name: 'Root',
    params: { edit: true },
  });
  const navigation = {
    navigate: (name, params) => setRoute({ name, params })
  };

  const setNote = (note) => setNoteState(note);

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          <MyPatientsScreen navigation={navigation} route={route} />
        </View>

        <View style={styles.master}>
          {{
            'Patient': <PatientScreen navigation={navigation} route={route} />,
            'Profile': <ProfileScreen navigation={navigation} route={route} />,
            'Root': <StartBy />,
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
    flex: 1,
    flexDirection: 'row',
  },
  detail: {
    flex: 2.5 / 5,
  },
  master: {
    flex: 1.5 / 5,
  },
  sidebar: {
    backgroundColor: {
      windowsbrush: 'SystemControlAcrylicWindowBrush'
    },
    flex: 1 / 5,
  },
});
