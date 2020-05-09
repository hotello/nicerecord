import * as faker from 'faker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '../components/base';
import NoteContext from '../components/NoteContext';
import NoteList from '../components/NoteList';
import { Sizes } from '../constants';
import db from '../lib/db';

const PATIENT = {
  birthDate: faker.date.past(),
  id: 1,
  name: faker.fake('{{name.lastName}} {{name.firstName}}'),
  phoneNumber: faker.phone.phoneNumber(),
  picture: faker.image.avatar(),
};

const NOTES = [...Array(100).keys()].map((id) => ({
  createdAt: faker.date.past(),
  content: faker.lorem.lines(),
  id: id.toString(),
}));

export default function PatientScreen({ route, navigation }) {
  const [notes, setNotes] = React.useState([]);
  const { setNote } = React.useContext(NoteContext);
  const { patient } = route.params;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="information-circle-outline"
          onPress={() =>
            navigation.navigate('Profile', { edit: false, patient: patient })
          }
          style={styles.icon}
        />
      ),
      title: patient.name,
    });
  }, [patient]);

  React.useEffect(() => {
    const findNotes = () =>
      db
        .find({
          selector: {
            type: 'note',
            patient: patient._id,
          },
        })
        .then(({ docs }) => setNotes(docs))
        .catch(console.error);
    const changes = db.changes({
      filter: (doc) => doc.type === 'note' || doc._deleted,
      live: true,
    });

    findNotes().then(() => changes.on('change', findNotes));

    return function () {
      changes.cancel();
    };
  }, [patient._id]);

  React.useEffect(() => {
    setNote({ patient: patient._id });

    return function () {
      setNote(null);
    };
  }, [patient._id]);

  return <NoteList notes={notes} onPress={(note) => setNote(note)} />;
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Sizes.edge,
  },
  screen: { flex: 1 },
});
