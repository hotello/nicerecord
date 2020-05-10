import sub from 'date-fns/sub';
import formatISO from 'date-fns/formatISO';
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

const SignupSchema = Yup.object().shape({
  birthDate: Yup.date()
    .max(sub(new Date(), { days: 1 }))
    .required(),
  email: Yup.string().max(150).email(),
  givenName: Yup.string().max(50).required(),
  familyName: Yup.string().max(50).required(),
  notes: Yup.string().max(10000),
  genericIdentifier: Yup.string().max(100),
  phone: Yup.string().max(50),
});

const createPatient = ({
  birthDate,
  email,
  familyName,
  genericIdentifier,
  givenName,
  homeAddress,
  notes,
  phone,
  ...rest
}) => {
  if (typeof birthDate === 'string') {
    birthDate = new Date(birthDate);
  }
  const birthDateISO = formatISO(birthDate, {
    representation: 'date',
  });

  const patient = {
    ...rest,
    _id: `Patient_${familyName}_${givenName}_${birthDateISO}`,
    birthDate: birthDateISO,
    name: {
      family: familyName,
      given: givenName.split(' '),
      text: `${familyName} ${givenName}`,
    },
    resourceType: 'Patient',
  };

  if (email?.length > 0 || phone?.length > 0) {
    patient.telecom = [];
  }
  if (email?.length > 0) {
    patient.telecom.push({
      system: 'email',
      value: email,
    });
  }
  if (genericIdentifier?.length > 0) {
    patient.identifier = [
      {
        use: 'usual',
        value: genericIdentifier,
      },
    ];
  }
  if (homeAddress?.length > 0) {
    patient.address = [
      {
        text: homeAddress,
        type: 'both',
        use: 'home',
      },
    ];
  }
  if (notes?.length > 0) {
    patient.notes = notes;
  }
  if (phone?.length > 0) {
    patient.telecom.push({
      system: 'phone',
      value: phone,
    });
  }

  return db.put(patient);
};

export default function ProfileScreen({ route, navigation }) {
  const { t } = useTranslation();
  const edit = route.params?.edit;
  const patient = route.params?.patient;

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: {
      _rev: patient?._rev,
      birthDate: patient?.birthDate ? new Date(patient.birthDate) : new Date(),
      email:
        patient?.telecom?.find(({ system }) => system === 'email')?.value || '',
      givenName: patient?.name?.given.join(' ') || '',
      homeAddress:
        patient?.address?.find(({ use }) => use === 'home')?.text || '',
      familyName: patient?.name.family || '',
      notes: patient?.notes || '',
      genericIdentifier:
        patient?.identifier?.find(({ use }) => use === 'usual')?.value || '',
      phone:
        patient?.telecom?.find(({ system }) => system === 'phone')?.value || '',
    },
    onSubmit: (values) => {
      createPatient(values)
        .then(({ id }) => db.get(id))
        .then((newDoc) =>
          navigation.navigate('Profile', {
            edit: false,
            patient: newDoc,
          })
        )
        .catch(console.error);
    },
    validationSchema: SignupSchema,
  });

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
          title={`${values.familyName} ${values.givenName}`}
          size="large"
          style={styles.picture}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit && !patient?.familyName}
          maxLength={50}
          onBlur={handleBlur('familyName')}
          onChangeText={handleChange('familyName')}
          placeholder={t('lastName')}
          underlineIOS
          value={values.familyName}
        />
        <TextInput
          editable={edit && !patient?.givenName}
          maxLength={50}
          onBlur={handleBlur('givenName')}
          onChangeText={handleChange('givenName')}
          placeholder={t('firstName')}
          underlineIOS
          value={values.givenName}
        />
        <DateInput
          editable={edit && !patient?.birthDate}
          label={t('birthDate')}
          onChange={(date) => setFieldValue('birthDate', date)}
          value={values.birthDate}
        />
      </TextInputGroup>

      <TextInputGroup>
        <TextInput
          editable={edit}
          maxLength={100}
          onBlur={handleBlur('genericIdentifier')}
          onChangeText={handleChange('genericIdentifier')}
          placeholder={t('patientId')}
          underlineIOS
          value={values.genericIdentifier}
        />
        <TextInput
          editable={edit}
          maxLength={50}
          keyboardType="phone-pad"
          onBlur={handleBlur('phone')}
          onChangeText={handleChange('phone')}
          placeholder={t('phoneNumber')}
          underlineIOS
          value={values.phone}
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

      {edit && patient && (
        <TextInputGroup style={styles.delete}>
          <Button
            title={t('deletePatient')}
            onPress={() =>
              db
                .remove(patient._id, patient._rev)
                .then(() => navigation.navigate('MyPatients'))
                .catch(console.error)
            }
          />
        </TextInputGroup>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  delete: {
    alignItems: 'flex-start',
    paddingHorizontal: Sizes.unit,
    paddingVertical: Sizes.unit,
  },
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
    paddingVertical: Sizes.content,
  },
  screen: {
    flex: 1,
    paddingTop: Sizes.content,
  },
});
