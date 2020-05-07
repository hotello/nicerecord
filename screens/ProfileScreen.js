import * as faker from 'faker';
import { useFormik } from 'formik';
import * as pouchCollate from 'pouchdb-collate';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { Colors, Sizes } from '../constants';
import {
  Button,
  DateInput,
  IconButton,
  TextInput,
  TextInputGroup,
} from '../components/base';
import db from '../lib/db';

const PATIENT = {
  birthDate: faker.date.past(),
  id: 1,
  name: faker.fake('{{name.lastName}} {{name.firstName}}'),
  phoneNumber: faker.phone.phoneNumber(),
  picture: faker.image.avatar(),
};

const SignupSchema = Yup.object().shape({
  birthDate: Yup.date().required(),
  email: Yup.string().max(150).email(),
  firstName: Yup.string().max(50).required(),
  lastName: Yup.string().max(50).required(),
  notes: Yup.string().max(10000),
  patientId: Yup.string().max(100),
  phoneNumber: Yup.string().max(50),
});

export default function ProfileScreen({ route, navigation }) {
  const { t } = useTranslation();
  const { handleBlur, handleChange, handleSubmit, isValid, values } = useFormik(
    {
      initialValues: {
        birthDate: new Date(),
        email: '',
        firstName: '',
        lastName: '',
        notes: '',
        patientId: '',
        phoneNumber: '',
      },
      onSubmit: ({ birthDate, firstName, lastName, ...rest }) => {
        if (typeof birthDate === 'string') {
          birthDate = new Date(birthDate);
        }
        db.put({
          _id: pouchCollate.toIndexableString([lastName, firstName, birthDate]),
          birthDate,
          firstName,
          lastName,
          ...rest,
        })
          .then(() => navigation.navigate('Profile', { edit: false }))
          .catch((error) => console.error(error));
      },
      validationSchema: SignupSchema,
    }
  );
  const edit = route.params?.edit;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.done}>
          {edit ? (
            <Button
              disabled={!isValid}
              bold
              onPress={handleSubmit}
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
  }, [route.params, isValid]);

  return (
    <ScrollView style={styles.screen}>
      <TextInputGroup style={styles.pictureContainer}>
        <Image source={{ uri: PATIENT.picture }} style={styles.picture} />
        {edit && <Button title={t('setPicture')} />}
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit}
          maxLength={50}
          onBlur={handleBlur('firstName')}
          onChangeText={handleChange('firstName')}
          placeholder={t('firstName')}
          underlineIOS
          value={values.firstName}
        />
        <TextInput
          editable={edit}
          maxLength={50}
          onBlur={handleBlur('lastName')}
          onChangeText={handleChange('lastName')}
          placeholder={t('lastName')}
          underlineIOS
          value={values.lastName}
        />
        <TextInput
          editable={edit}
          maxLength={100}
          onBlur={handleBlur('patientId')}
          onChangeText={handleChange('patientId')}
          placeholder={t('patientId')}
          value={values.patientId}
        />
      </TextInputGroup>

      <TextInputGroup>
        <DateInput
          editable={edit}
          label={t('birthDate')}
          onChange={handleChange('birthDate')}
          value={values.birthDate}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit}
          maxLength={50}
          keyboardType="phone-pad"
          onBlur={handleBlur('phoneNumber')}
          onChangeText={handleChange('phoneNumber')}
          placeholder={t('phoneNumber')}
          underlineIOS
          value={values.phoneNumber}
        />
        <TextInput
          editable={edit}
          maxLength={150}
          keyboardType="email-address"
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
          placeholder={t('email')}
          value={values.email}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit}
          maxLength={10000}
          multiline={true}
          numberOfLines={10}
          onBlur={handleBlur('notes')}
          onChangeText={handleChange('notes')}
          placeholder={t('notes')}
          value={values.notes}
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
