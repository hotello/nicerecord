import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '../components/base';
import NoteContext from '../components/NoteContext';
import NoteList from '../components/NoteList';
import { Sizes } from '../constants';
import db from '../lib/db';

export default function PatientScreen({ route, navigation }) {
  const [notes, setNotes] = React.useState([]);
  const { setNote } = React.useContext(NoteContext);
  const { patient } = route.params;

  const newNote = () =>
    setNote({ subject: { reference: patient._id, type: 'Patient' } });

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <IconButton
            icon="information-circle-outline"
            onPress={() =>
              navigation.navigate('Profile', { edit: false, patient: patient })
            }
            style={styles.icon}
          />
          <IconButton
            icon="add"
            onPress={() => newNote()}
            primary
            style={styles.icon}
          />
        </View>
      ),
      title: patient.name.text,
    });
  }, [patient]);

  React.useEffect(() => {
    const findNotes = () =>
      db
        .allDocs({
          descending: true,
          endkey: `ClinicalImpression_${patient._id}_'`,
          include_docs: true,
          startkey: `ClinicalImpression_${patient._id}_\uffff`,
        })
        .then(({ rows }) => setNotes(rows.map(({ doc }) => doc)))
        .catch(console.error);
    const changes = db.changes({
      filter: (doc) =>
        doc.resourceType === 'ClinicalImpression' || doc._deleted,
      live: true,
    });

    db.allDocs({
      descending: true,
      endkey: `ClinicalImpression_${patient._id}_'`,
      include_docs: true,
      startkey: `ClinicalImpression_${patient._id}_\uffff`,
    }).then(console.log);

    findNotes().then(() => changes.on('change', findNotes));

    return function () {
      changes.cancel();
    };
  }, [patient._id]);

  React.useEffect(() => {
    newNote();

    return function () {
      setNote(null);
    };
  }, [patient._id]);

  return <NoteList notes={notes} onPress={(note) => setNote(note)} />;
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: Sizes.edge,
  },
  screen: {
    flex: 1,
  },
});
