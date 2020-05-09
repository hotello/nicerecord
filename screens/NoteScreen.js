import format from 'date-fns/format';
import * as faker from 'faker';
import * as pouchCollate from 'pouchdb-collate';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

import { Colors, Sizes } from '../constants';
import { IconButton } from '../components/base';
import NoteContext from '../components/NoteContext';
import db from '../lib/db';
import useDebounce from '../lib/useDebounce';

export default function NoteScreen({ navigation }) {
  const { t } = useTranslation();
  const { note: externalNote, setNote: setExternalNote } = React.useContext(
    NoteContext
  );
  const [note, setNote] = React.useState({});
  const [content, setContent] = React.useState('');
  const debouncedContent = useDebounce(content, 1000);

  // Replace internal note state when external note changes
  React.useEffect(() => {
    setNote(externalNote || {});
    if (externalNote?.content) {
      setContent(externalNote.content);
    } else {
      setContent('');
    }
  }, [externalNote]);

  // Generate a new note _id when no _id is given
  React.useEffect(() => {
    if (note.patient && !note._id) {
      const createdAt = new Date();
      setNote({
        ...note,
        _id: pouchCollate.toIndexableString([note.patient, createdAt]),
        createdAt: createdAt,
      });
    }
  }, [note._id, note.patient]);

  React.useEffect(() => {
    const createdAt = note.createdAt ? new Date(note.createdAt) : new Date();
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          disabled={!note._id || !note.patient}
          onPress={() =>
            db
              .remove(note._id, note._rev)
              .then(() => {
                setNote({ patient: note.patient });
                setContent('');
              })
              .catch(console.error)
          }
          icon="trash"
          style={styles.icon}
        />
      ),
      title: note && note.createdAt ? format(createdAt, 'PP') : t('note'),
    });
  }, [note]);

  // Save note when content changes
  React.useEffect(() => {
    if (note._id && note.patient && debouncedContent.length > 0) {
      db.put({
        _id: note._id,
        _rev: note._rev,
        content: debouncedContent,
        createdAt: note.createdAt,
        patient: note.patient,
        type: 'note',
      })
        .then(({ rev: newRev }) => setNote({ ...note, _rev: newRev }))
        .catch(console.error);
    }
  }, [debouncedContent]);

  return (
    <View style={styles.screen}>
      <TextInput
        disabled={!note.patient}
        multiline
        onChangeText={(text) => setContent(text)}
        placeholder={t('writeHere')}
        style={styles.input}
        value={content}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Sizes.edge,
  },
  input: {
    alignItems: 'flex-start',
    flex: 1,
    fontSize: Sizes.text,
  },
  screen: {
    backgroundColor: Colors.surface,
    flex: 1,
    padding: Sizes.content,
  },
});
