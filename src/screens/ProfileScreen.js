import sub from 'date-fns/sub';
import formatISO from 'date-fns/formatISO';
import { useFormik } from 'formik';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import * as Yup from 'yup';
import * as shortid from 'shortid';

import { Sizes } from '../constants';
import {
  Avatar,
  Button,
  DateInput,
  IconButton,
  Text,
  TextInput,
  TextInputGroup,
} from '../components/base';
import db from '../lib/db';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const PatientSchema = Yup.object().shape({
  birthDate: Yup.date().required(),
  email: Yup.string().max(150).email(),
  givenName: Yup.string().max(50).required(),
  familyName: Yup.string().max(50).required(),
  notes: Yup.string().max(10000),
  genericIdentifier: Yup.string().max(100),
  phone: Yup.string().max(50),
});

const createPatient = ({
  _id,
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
    _id: _id || `Patient_${shortid.generate()}`,
    birthDate: birthDateISO,
    name: {
      family: familyName,
      given: givenName.split(' '),
      text: `${givenName} ${familyName}`,
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
    patient.text = {
      status: 'additional',
      div: notes,
    };
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

  const getInitialValues = (patient) => ({
    _id: patient?._id,
    _rev: patient?._rev,
    birthDate: patient?.birthDate ? new Date(patient.birthDate) : undefined,
    email:
      patient?.telecom?.find(({ system }) => system === 'email')?.value || '',
    givenName: patient?.name?.given.join(' ') || '',
    homeAddress:
      patient?.address?.find(({ use }) => use === 'home')?.text || '',
    familyName: patient?.name.family || '',
    notes: patient?.text?.div || '',
    genericIdentifier:
      patient?.identifier?.find(({ use }) => use === 'usual')?.value || '',
    phone:
      patient?.telecom?.find(({ system }) => system === 'phone')?.value || '',
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    isValid,
    resetForm,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: getInitialValues(patient),
    onSubmit: (values) => {
      createPatient(values)
        .then(({ id }) => db.get(id))
        .then((newDoc) =>
          navigation.navigate('Patient', {
            edit: false,
            patient: newDoc,
          })
        )
        .catch(console.error);
    },
    validationSchema: PatientSchema,
  });

  React.useEffect(() => {
    resetForm({ values: getInitialValues(patient) });
  }, [patient])

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {edit ? patient ? t('profileEdit') : t('addPatient') : t('profile')}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          {edit ? patient ? (
            <IconButton
              icon="&#xE74D;"
              onPress={() =>
                db
                  .allDocs({
                    endkey: `ClinicalImpression_${patient._id}_\uffff`,
                    include_docs: true,
                    startkey: `ClinicalImpression_${patient._id}_`,
                  })
                  .then(({ rows }) =>
                    db.bulkDocs(
                      rows.map(({ doc }) => ({ ...doc, _deleted: true }))
                    )
                  )
                  .then(() => db.remove(patient._id, patient._rev))
                  .then(() => navigation.navigate('Profile', { edit: true, patient: null }))
                  .catch(console.error)
              }
            />
          ) : null : (
              <IconButton
                icon="&#xE70F;"
                onPress={() => navigation.navigate('Profile', { edit: true, patient })}
              />
            )}
          {edit && patient && <IconButton
            icon="&#xE711;"
            onPress={() => {
              resetForm({ values: getInitialValues(patient) });
              navigation.navigate('Profile', { edit: false, patient });
            }}
            style={{ marginLeft: Sizes.unit * 2 }}
          />}
          {patient && <IconButton
            icon="&#xE7BC;"
            onPress={() => navigation.navigate('Patient', { patient })}
            style={{ marginLeft: Sizes.unit * 2 }}
          />}
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        <TextInputGroup style={styles.pictureContainer}>
          <Avatar
            rounded
            title={`${values.givenName} ${values.familyName}`}
            size="large"
            style={styles.picture}
          />
        </TextInputGroup>

        <TextInputGroup>
          <TextInput
            editable={edit}
            label={t('firstName')}
            maxLength={50}
            onBlur={handleBlur('givenName')}
            onChangeText={handleChange('givenName')}
            required
            underlineIOS
            value={values.givenName}
          />
          <TextInput
            editable={edit}
            label={t('lastName')}
            maxLength={50}
            onBlur={handleBlur('familyName')}
            onChangeText={handleChange('familyName')}
            required
            underlineIOS
            value={values.familyName}
          />
          <DateInput
            dateFormat="longdate"
            editable={edit}
            label={t('birthDate')}
            onChange={(date) => setFieldValue('birthDate', date)}
            placeholder={t('selectADate')}
            required
            value={values.birthDate}
          />
        </TextInputGroup>

        <TextInputGroup>
          <TextInput
            editable={edit}
            label={t('patientId')}
            maxLength={100}
            onBlur={handleBlur('genericIdentifier')}
            onChangeText={handleChange('genericIdentifier')}
            underlineIOS
            value={values.genericIdentifier}
          />
          <TextInput
            editable={edit}
            label={t('phoneNumber')}
            maxLength={50}
            keyboardType="phone-pad"
            onBlur={handleBlur('phone')}
            onChangeText={handleChange('phone')}
            underlineIOS
            value={values.phone}
          />
          <TextInput
            editable={edit}
            label={t('email')}
            maxLength={150}
            keyboardType="email-address"
            onBlur={handleBlur('email')}
            onChangeText={handleChange('email')}
            underlineIOS
            value={values.email}
          />
          <TextInput
            editable={edit}
            label={t('homeAddress')}
            maxLength={200}
            multiline={true}
            numberOfLines={2}
            onBlur={handleBlur('homeAddress')}
            onChangeText={handleChange('homeAddress')}
            textAlignVertical={'top'}
            value={values.homeAddress}
          />
        </TextInputGroup>

        <TextInputGroup>
          <TextInput
            editable={edit}
            label={t('notes')}
            maxLength={10000}
            multiline={true}
            numberOfLines={5}
            onBlur={handleBlur('notes')}
            onChangeText={handleChange('notes')}
            textAlignVertical={'top'}
            value={values.notes}
          />
        </TextInputGroup>

        {edit && (
          <View style={styles.save}>
            <Button
              title={t('save')}
              disabled={!isValid}
              bold
              onPress={handleSubmit}
            />
          </View>
        )}
      </ScrollView>
    </View>
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
  picture: {
    borderRadius: 60,
    height: 120,
    marginBottom: Sizes.unit * 2,
    width: 120,
  },
  pictureContainer: {
    paddingVertical: Sizes.content,
  },
  save: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.content,
    marginBottom: Sizes.content,
  },
  screen: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});
