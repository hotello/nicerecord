import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { IconButton } from '../components/base';
import PatientList from '../components/PatientList';
import db from '../lib/db';

import { Sizes } from '../constants';

export default function MyPatientsScreen({ navigation }) {
  const [patients, setPatients] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="person-add"
          style={styles.icon}
          onPress={() =>
            navigation.navigate('Profile', { edit: true, patient: null })
          }
        />
      ),
    });
  }, []);

  React.useEffect(() => {
    const findPatients = () =>
      db
        .allDocs({
          startkey: 'Patient_',
          endkey: 'Patient_\uffff',
          include_docs: true,
        })
        .then(({ rows }) => setPatients(rows.map(({ doc }) => doc)))
        .catch(console.error);
    const changes = db.changes({
      filter: (doc) => doc.resourceType === 'Patient' || doc._deleted,
      live: true,
    });

    findPatients().then(() => changes.on('change', findPatients));

    return function () {
      changes.cancel();
    };
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <PatientList
        onPress={(patient) => navigation.navigate('Patient', { patient })}
        patients={patients}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Sizes.edge,
  },
});
