import format from 'date-fns/format';
import formatISO from 'date-fns/formatISO';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Linking,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { IconButton, Text } from '../components/base';
import { Sizes } from '../constants';
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
  const { note: externalNote } = React.useContext(
    NoteContext
  );
  const [note, setNote] = React.useState({});
  const [summary, setSummary] = React.useState('');
  const debouncedSummary = useDebounce(summary, 1000);
  const date = note.date ? new Date(note.date) : new Date();

  const deleteNote = (note) =>
    db
      .remove(note._id, note._rev)
      .then(() => {
        setNote({ subject: note.subject });
        setSummary('');
      })
      .catch(console.error);

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

  // Save note when summary changes
  React.useEffect(() => {
    if (note._id && note.subject && debouncedSummary.length > 0) {
      putNote({ ...note, summary: debouncedSummary })
        .then(({ rev: newRev }) => setNote({ ...note, _rev: newRev }))
        .catch(console.error);
    }
  }, [debouncedSummary]);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {note && note.date ? format(date, 'PP') : t('note')}
        </Text>
        <IconButton
          disabled={!note._id || !note.subject}
          icon="&#xE74D;"
          onPress={() => deleteNote(note)}
        />
      </View>
      <TextInput
        editable={!!note?.subject}
        multiline
        onChangeText={(text) => setSummary(text)}
        placeholder={!!note?.subject ? t('writeHere') : t('addOrSelectPatient')}
        style={styles.input}
        textAlignVertical={'top'}
        value={summary}
      />
      <View style={{ alignItems: 'flex-end', padding: Sizes.content }}>
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL('https://nicerecord.com/privacy-policy')}
        >
          <Text
            muted
            style={{
              fontSize: 12,
              textDecorationLine: 'underline',
            }}
          >
            {t('privacyPolicy')}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Sizes.content,
    paddingBottom: Sizes.unit * 4,
  },
  headerTitle: {
    fontSize: Sizes.header,
  },
  icon: {
    marginRight: Sizes.edge,
  },
  input: {
    flex: 1,
    fontSize: Sizes.text,
    borderColor: 'transparent',
    padding: Sizes.content,
  },
  screen: {
    flex: 1,
  },
});
