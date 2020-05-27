import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton, Text } from '../components/base';
import NoteContext from '../components/NoteContext';
import NoteList from '../components/NoteList';
import { Sizes } from '../constants';
import db from '../lib/db';

export default function PatientScreen({ route, navigation }) {
  const [notes, setNotes] = React.useState([]);
  const { note, setNote } = React.useContext(NoteContext);
  const { patient } = route.params;

  const newNote = () =>
    setNote({ subject: { reference: patient._id, type: 'Patient' } });

  React.useEffect(() => {
    const findNotes = () =>
      db
        .allDocs({
          descending: true,
          endkey: `ClinicalImpression_${patient._id}_`,
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

  return (
    <React.Fragment>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {patient.name.text}
        </Text>
        <View style={styles.headerRight}>
        <IconButton
            icon="&#xE779;"
            onPress={() => navigation.navigate('Profile', { patient, edit: false })}
            style={{ marginRight: Sizes.unit * 2 }}
        />
        <IconButton
            icon="&#xE710;"
          onPress={() => newNote()}
          />
        </View>
      </View>
      <NoteList
        notes={notes}
        onPress={(note) => setNote(note)}
        selected={note ? note._id : null}
      />
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Sizes.content,
  },
  headerRight: {
    flexDirection: 'row'
  },
  headerTitle: {
    fontSize: Sizes.header,
    marginLeft: Sizes.content,
  },
  screen: {
    flex: 1,
  },
});
