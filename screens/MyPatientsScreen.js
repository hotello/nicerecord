import * as faker from 'faker';
import * as React from 'react';
import { View } from 'react-native';

import PatientList from '../components/PatientList';

const PATIENTS = [...Array(100).keys()].map((id) => ({
  birthDate: faker.date.past(),
  id: id,
  name: faker.fake('{{name.lastName}} {{name.firstName}}'),
  phoneNumber: faker.phone.phoneNumber(),
  picture: faker.image.avatar(),
}));

export default function MyPatientsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PatientList onPress={() => {}} patients={PATIENTS} />
    </View>
  );
}
