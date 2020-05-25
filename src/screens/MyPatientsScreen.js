import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { IconButton, Text } from '../components/base';
import PatientList from '../components/PatientList';
import { Sizes } from '../constants';
import db from '../lib/db';

export default function MyPatientsScreen({ navigation }) {
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
  }, []);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('myPatients')}</Text>
        <IconButton
          icon="&#xE8FA;"
          label={t('addPatient')}
          onPress={() => navigation.navigate('NoteTaker')}
        />
      </View>

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
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.content,
  },
  headerTitle: {
    fontSize: Sizes.header,
  },
})
