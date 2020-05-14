import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import * as faker from 'faker';
import * as pouchCollate from 'pouchdb-collate';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

import { Colors, Sizes } from '../constants';
import { IconButton } from '../components/base';
import NoteContext from '../components/NoteContext';
import db from '../lib/db';
import useDebounce from '../lib/useDebounce';

const generateId = ({ date, subject }) =>
  `ClinicalImpression_${subject.reference}_${formatISO(date)}`;

const putNote = ({ date, summary, subject, ...rest }) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return db.put({
    ...rest,
    _id: generateId({ subject, date }),
    date: formatISO(date),
    subject: {
      reference: subject.reference,
      type: 'Patient',
    },
    status: 'in-progress',
    summary: summary,
    resourceType: 'ClinicalImpression',
  });
};

export default function NoteScreen({ navigation }) {
  const { t } = useTranslation();
  const headerHeight = useHeaderHeight();
  const { note: externalNote, setNote: setExternalNote } = React.useContext(
    NoteContext
  );
  const [note, setNote] = React.useState({});
  const [summary, setSummary] = React.useState('');
  const debouncedSummary = useDebounce(summary, 1000);

  // Replace internal note state when external note changes
  React.useEffect(() => {
    if (externalNote) {
      setNote(externalNote);
      setSummary(externalNote?.summary || '');
    } else {
      setNote({});
      setSummary('');
    }
  }, [externalNote]);

  // Generate a new note _id when no _id is given
  React.useEffect(() => {
    if (note.subject && !note._id) {
      const date = new Date();
      setNote({
        ...note,
        _id: generateId({ date, subject: note.subject }),
        date: date,
      });
    }
  }, [note._id, note.subject]);

  React.useEffect(() => {
    const date = note.date ? new Date(note.date) : new Date();
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          disabled={!note._id || !note.subject}
          onPress={() =>
            db
              .remove(note._id, note._rev)
              .then(() => {
                setNote({ subject: note.subject });
                setSummary('');
              })
              .catch(console.error)
          }
          icon="trash"
          style={styles.icon}
        />
      ),
      title: note && note.date ? format(date, 'PP') : t('note'),
    });
  }, [note]);

  // Save note when summary changes
  React.useEffect(() => {
    if (note._id && note.subject && debouncedSummary.length > 0) {
      putNote({ ...note, summary: debouncedSummary })
        .then(({ rev: newRev }) => setNote({ ...note, _rev: newRev }))
        .catch(console.error);
    }
  }, [debouncedSummary]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight}
      style={styles.screen}
    >
      <TextInput
        disabled={!note?.subject}
        multiline
        onChangeText={(text) => setSummary(text)}
        placeholder={t('writeHere')}
        style={styles.input}
        textAlignVertical={'top'}
        value={summary}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Sizes.edge,
  },
  input: {
    flex: 1,
    fontSize: Sizes.text,
  },
  screen: {
    backgroundColor: Colors.surface,
    flex: 1,
    padding: Sizes.content,
  },
});
