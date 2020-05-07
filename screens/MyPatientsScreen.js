import * as faker from 'faker';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { IconButton } from '../components/base';
import PatientList from '../components/PatientList';

import { Sizes } from '../constants';

const PATIENTS = [...Array(100).keys()].map((id) => ({
  birthDate: faker.date.past(),
  id: id,
  name: faker.fake('{{name.lastName}} {{name.firstName}}'),
  phoneNumber: faker.phone.phoneNumber(),
  picture: faker.image.avatar(),
}));

export default function MyPatientsScreen({ navigation }) {
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="person-add"
          style={styles.icon}
          onPress={() => navigation.navigate('Profile', { edit: true })}
        />
      ),
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <PatientList
        onPress={() => navigation.navigate('Patient')}
        patients={PATIENTS}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: Sizes.edge,
  },
});
