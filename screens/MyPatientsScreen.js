import * as faker from 'faker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '../components/base';
import PatientList from '../components/PatientList';
import db from '../lib/db';

import { Sizes } from '../constants';

const PATIENTS = [...Array(100).keys()].map((id) => ({
  birthDate: faker.date.past(),
  id: id,
  name: faker.fake('{{name.lastName}} {{name.firstName}}'),
  phoneNumber: faker.phone.phoneNumber(),
  picture: faker.image.avatar(),
}));

export default function MyPatientsScreen({ navigation }) {
  const [patients, setPatients] = React.useState([]);

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
        .find({
          selector: {
            type: 'patient',
          },
        })
        .then(({ docs }) => setPatients(docs))
        .catch(console.error);
    const changes = db.changes({
      filter: (doc) => doc.type === 'patient' || doc._deleted,
      live: true,
    });

    findPatients().then(() => changes.on('change', findPatients));

    return changes.cancel;
  }, []);

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
