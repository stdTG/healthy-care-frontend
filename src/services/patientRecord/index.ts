import { createSlice } from '@reduxjs/toolkit';
import { SEX } from 'lib/enums/sex';
import { Allergy, Family, Lifestyle, MedicalCondition, MedicalHistory, Note, Vaccine } from '../../generated/graphql';
import { RootState } from '../../store/reducer';

const initialState: InitialState = {
  basicInformation: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: null,
    sex: SEX.undefined,
    fullAddress: {
      city: '',
      zipcode: '',
      country: '',
      address: '',
    },
    language: '',
    avatarPicture: null,
  },
  medicalHistory: [],
  medicalCondition: [],
  notes: [],
  vaccines: [],
  allergies: [],
  lifestyle: [],
  family: {
    mother: '',
    father: '',
    grandparents: '',
  },
}

export const getModuleState = (state: RootState) => state.patientRecord;

export const selectors = {
  getVaccines: (state: RootState): Vaccine[] => getModuleState(state).vaccines,
  getMedicalCondition: (state: RootState) => getModuleState(state).medicalCondition,
  getAllergies: (state: RootState): Allergy[] => getModuleState(state).allergies,
  getLifestyle: (state: RootState) => getModuleState(state).lifestyle,
  getFamily: (state: RootState) => getModuleState(state).family,
  getBasicInformation: (state: RootState) => getModuleState(state).basicInformation,
  getNotes: (state: RootState) => getModuleState(state).notes,
};

const slice = createSlice({
  name: 'patientRecord',
  initialState,
  reducers: {
    setPatientInformation(state, { payload }) {
      const {
        patientData,
        medicalHistory,
        medicalCondition,
        allergies,
        family,
        lifestyle,
        vaccines,
      } = payload;

      state.basicInformation = patientData;
      state.medicalHistory = medicalHistory;
      state.medicalCondition = medicalCondition;
      state.vaccines = vaccines;
      state.lifestyle = lifestyle;
      state.allergies = allergies;
      state.family = family;
      // state.notes = notes
    },
    setBasicInformation(state, { payload }) {
      const { patientData, medicalHistory, medicalCondition } = payload;
      state.basicInformation = patientData;
    },
    setNotes(state, { payload }) {
      const { notes } = payload;
      state.notes = notes;
    },
    setMedicalHistory(state, { payload }) {
      const { medicalHistory } = payload;
      state.medicalHistory = medicalHistory;
    },
    setMedicalCondition(state, { payload }) {
      const { medicalCondition } = payload;
      state.medicalCondition = medicalCondition;
    },
    setVaccines(state, { payload }) {
      const { vaccines } = payload;
      state.vaccines = vaccines;
    },
    setLifestyle(state, { payload }) {
      const { lifestyle } = payload;
      state.lifestyle = lifestyle;
    },
    setAllergies(state, { payload }) {
      const { allergies } = payload;
      state.allergies = [...state.allergies, allergies];
    },
    setFamily(state, { payload }) {
      const { family } = payload;
      state.family = family;
    },
  },
});

export const actions = slice.actions;
export const reducer = slice.reducer;


interface InitialState {
  basicInformation: {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    birthDate: null | Date | string,
    sex: string,
    fullAddress: {
      city: string,
      zipcode: string,
      country: string,
      address: string,
    },
    language: string,
    avatarPicture: any,
  },
  medicalHistory: MedicalHistory[],
  medicalCondition: MedicalCondition[],
  notes: Note[],
  vaccines: Vaccine[],
  allergies: Allergy[],
  lifestyle: Lifestyle[],
  family: Family,
}
