import * as faker from 'faker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import NoteList from '../components/NoteList';

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

export default function PatientScreen() {
  return <NoteList notes={NOTES} onPress={() => {}} />;
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
