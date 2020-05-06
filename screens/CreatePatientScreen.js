import * as faker from 'faker';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, View } from 'react-native';

import { Colors, Sizes } from '../constants';
import {
  Button,
  IconButton,
  TextInput,
  TextInputGroup,
} from '../components/base';

const PATIENT = {
  birthDate: faker.date.past(),
  id: 1,
  name: faker.fake('{{name.lastName}} {{name.firstName}}'),
  phoneNumber: faker.phone.phoneNumber(),
  picture: faker.image.avatar(),
};

export default function NoteScreen({ navigation }) {
  const { t } = useTranslation();

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.done}>
          <Button bold title={t('save')} />
        </View>
      ),
    });
  }, []);

  return (
    <View style={styles.screen}>
      <TextInputGroup style={styles.pictureContainer}>
        <Image source={{ uri: PATIENT.picture }} style={styles.picture} />
        <Button title={t('setPicture')} />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput placeholder={t('firstName')} underlineIOS />
        <TextInput placeholder={t('lastName')} />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          autoCompleteType="tel"
          keyboardType="number-pad"
          placeholder={t('phoneNumber')}
          style={styles.input}
        />
      </TextInputGroup>
    </View>
  );
}

const styles = StyleSheet.create({
  done: {
    marginRight: Sizes.edge,
  },
  picture: {
    borderRadius: 60,
    height: 120,
    marginBottom: Sizes.unit * 2,
    width: 120,
  },
  pictureContainer: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Sizes.content,
  },
  screen: {
    flex: 1,
    paddingTop: Sizes.content,
  },
});
