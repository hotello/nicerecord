import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import PatientList from '../components/PatientList';
import db from '../lib/db';

export default function MyPatientsScreen({ navigation, route }) {
  const [patients, setPatients] = React.useState([]);

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
  }, [route]);

  return (
    <View style={styles.screen}>
      <PatientList
        onPress={(patient) => navigation.navigate('Patient', { patient })}
        patients={patients}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
