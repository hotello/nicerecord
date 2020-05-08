import sub from 'date-fns/sub';
import * as faker from 'faker';
import { useFormik } from 'formik';
import * as pouchCollate from 'pouchdb-collate';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { Colors, Sizes } from '../constants';
import {
  Avatar,
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
  birthDate: Yup.date()
    .max(sub(new Date(), { days: 1 }))
    .required(),
  email: Yup.string().max(150).email(),
  firstName: Yup.string().max(50).required(),
  lastName: Yup.string().max(50).required(),
  notes: Yup.string().max(10000),
  patientId: Yup.string().max(100),
  phoneNumber: Yup.string().max(50),
});

export default function ProfileScreen({ route, navigation }) {
  const { t } = useTranslation();
  const edit = route.params?.edit;
  const patient = route.params?.patient;

  const { handleBlur, handleChange, handleSubmit, isValid, values } = useFormik(
    {
      initialValues: {
        _rev: patient?._rev,
        birthDate: patient?.birthDate
          ? new Date(patient.birthDate)
          : new Date(),
        email: patient?.email || '',
        firstName: patient?.firstName || '',
        homeAddress: patient?.homeAddress || '',
        lastName: patient?.lastName || '',
        notes: patient?.notes || '',
        patientId: patient?.patientId || '',
        phoneNumber: patient?.phoneNumber || '',
      },
      onSubmit: ({ _rev, birthDate, firstName, lastName, ...rest }) => {
        if (typeof birthDate === 'string') {
          birthDate = new Date(birthDate);
        }
        db.put({
          _id: pouchCollate.toIndexableString([lastName, firstName, birthDate]),
          _rev: _rev,
          birthDate: birthDate,
          firstName: firstName,
          lastName: lastName,
          name: `${lastName} ${firstName}`,
          type: 'patient',
          ...rest,
        })
          .then(() => navigation.navigate('Profile', { edit: false }))
          .catch((error) => console.error(error));
      },
      validationSchema: SignupSchema,
    }
  );

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
        <Avatar
          rounded
          title={`${values.lastName} ${values.firstName}`}
          size="large"
          style={styles.picture}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit && !patient?.firstName}
          maxLength={50}
          onBlur={handleBlur('firstName')}
          onChangeText={handleChange('firstName')}
          placeholder={t('firstName')}
          underlineIOS
          value={values.firstName}
        />
        <TextInput
          editable={edit && !patient?.lastName}
          maxLength={50}
          onBlur={handleBlur('lastName')}
          onChangeText={handleChange('lastName')}
          placeholder={t('lastName')}
          underlineIOS
          value={values.lastName}
        />
        <DateInput
          editable={edit && !patient?.birthDate}
          label={t('birthDate')}
          onChange={handleChange('birthDate')}
          value={values.birthDate}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit}
          maxLength={100}
          onBlur={handleBlur('patientId')}
          onChangeText={handleChange('patientId')}
          placeholder={t('patientId')}
          underlineIOS
          value={values.patientId}
        />
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
          underlineIOS
          value={values.email}
        />
        <TextInput
          editable={edit}
          maxLength={200}
          multiline={true}
          numberOfLines={2}
          onBlur={handleBlur('homeAddress')}
          onChangeText={handleChange('homeAddress')}
          placeholder={t('homeAddress')}
          value={values.homeAddress}
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
