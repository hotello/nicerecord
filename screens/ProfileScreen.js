import * as faker from 'faker';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { Colors, Sizes } from '../constants';
import {
  Button,
  DateInput,
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

export default function ProfileScreen({ route, navigation }) {
  const { t } = useTranslation();
  const edit = route.params?.edit;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.done}>
          {edit ? (
            <Button
              bold
              onPress={() => navigation.navigate('Profile', { edit: false })}
              title={t('save')}
            />
          ) : (
            <Button
              onPress={() => navigation.navigate('Profile', { edit: true })}
              title={t('edit')}
            />
          )}
        </View>
      ),
      title: edit ? t('profileEdit') : t('profile'),
    });
  }, [route.params]);

  return (
    <ScrollView style={styles.screen}>
      <TextInputGroup style={styles.pictureContainer}>
        <Image source={{ uri: PATIENT.picture }} style={styles.picture} />
        {edit && <Button title={t('setPicture')} />}
      </TextInputGroup>

      <TextInputGroup>
        <TextInput editable={edit} placeholder={t('firstName')} underlineIOS />
        <TextInput editable={edit} placeholder={t('lastName')} />
      </TextInputGroup>

      <TextInputGroup>
        <DateInput editable={edit} label={t('birthDate')} value={new Date()} />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput editable={edit} placeholder={t('patientId')} underlineIOS />
        <TextInput
          editable={edit}
          keyboardType="number-pad"
          placeholder={t('phoneNumber')}
          style={styles.input}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit}
          multiline={true}
          numberOfLines={10}
          placeholder={t('notes')}
        />
      </TextInputGroup>
    </ScrollView>
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
