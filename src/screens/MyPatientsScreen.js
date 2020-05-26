import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Icon, ListItem, Text } from '../components/base';
import PatientList from '../components/PatientList';
import { Sizes } from '../constants';
import db from '../lib/db';

export default function MyPatientsScreen({ navigation, route }) {
  const [patients, setPatients] = React.useState([]);
  const { t } = useTranslation();

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
      <ListItem onPress={() => navigation.navigate('Profile', { patient: null, edit: true })}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: Sizes.unit * 3,
          }}
        >
          <Icon
            name="&#xE8FA;"
            style={{
              marginLeft: Sizes.unit * 5,
              marginRight: Sizes.unit * 5,
            }}
          />
          <Text>{t('addPatient')}</Text>
        </View>
      </ListItem>

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
    marginTop: Sizes.unit * 4
  },
})
