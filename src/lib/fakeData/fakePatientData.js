import avatar from 'assets/avatarImages/img_avatar.png';

import AnneAdler from 'assets/avatarImages/AnneAdler.png';
import AntonySantos from 'assets/avatarImages/AntonySantos.png';
import BarbaraKerr from 'assets/avatarImages/BarbaraKerr.png';
import CarlaRossi from 'assets/avatarImages/CarlaRossi.png';
import ClareMendoza from 'assets/avatarImages/ClareMendoza.png';
import JohnSimon from 'assets/avatarImages/JohnSimon.png';
import LongDang from 'assets/avatarImages/LongDang.png';
import MichaelKumbala from 'assets/avatarImages/MichaelKumbala.png';
import PaulDoyle from 'assets/avatarImages/PaulDoyle.png';
import RobertMontgomery from 'assets/avatarImages/RobertMontgomery.png';

import AudreyTyler from 'assets/avatarImages/AudreyTyler.png';
import FatmaHamed from 'assets/avatarImages/FatmaHamed.png';
import FrancisPage from 'assets/avatarImages/FrancisPage.png';
import LaureAndreas from 'assets/avatarImages/LaureAndreas.png';
import PatriciaSousa from 'assets/avatarImages/PatriciaSousa.png';
import RichardOConnor from 'assets/avatarImages/RichardOConnor.png';

var fakePatientsList = [
  {
    id: '6177c16a10e29d8ab44eb0e5',
    avatarPicture: LaureAndreas,

    metrics: [
      {
        id: '4',
        risk: 'HIGH',
        metricType: '4',
        date: '2021-06-21T10:12:06.964Z',
        value: '17.5',
      },
      {
        id: '1',
        risk: 'LOW',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '52',
      },
      {
        id: '5',
        risk: 'LOW',
        metricType: '5',
        date: '2021-06-21T10:12:06.964Z',
        value: '125*75',
      },
      {
        id: '3',
        risk: 'NORMAL',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '17.5',
      },
      {
        id: '6',
        risk: 'NORMAL',
        metricType: '6',
        date: '2021-06-21T10:12:06.964Z',
        value: '98',
      },
      {
        id: '2',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '179',
      },
    ],
    compliance: 100,

    lifeStyle: {
      id: '',
      healthRating: 'fair',
      sleepHealth: 'Less than 6 hours',
      fitness: 'once a week',
      smoking: 'active smoker',
      drinking: 'no',
      nutrition: 'fair',
      drugs: 'no',
      sexLife: 'once a week',
      diet: 'omnivore',
    },
    socialDeterminant: {
      genderIdentity: 'female',
      sexualOrientation: '',
      educationalLevel: 'bachelor',
      maritalStatus: 'married',
      housingStatus: '',
      loneliness: 'see or talk to people close to less than once a week',
      transportationAccess: '',
      safety: '',
      violence: '',
      finance: '',
    },
    medication: [
      {
        id_: '',
        name: 'Sertraline',
        date: '2020-08-21T10:12:06.964Z',
        duration: '6 weeks',
        comment: '100 mg/day',
      },
      {
        id_: '',
        name: 'Alprazolam',
        date: '2020-06-03T10:12:06.964Z',
        duration: '10 weeks',
        comment: '0.25mg, 4 times per day',
      },
    ],
    medicalHistory: [
      {
        id_: '',
        name: 'Sadness, irritable',
        date: '2020-04-14T10:12:06.964Z',
        comment:
          'Mrs. Andreas had a psycho-motor development within the norms and common.  diseases of the child. More and more a lack of energy and a tiredness settled down. Little by little, all these elements were amplified until dark thoughts appeared, and then she decided to consult. ',
      },
    ],
    medicalCondition: [
      {
        id_: '1',
        name: 'depression',
        isRecovered: false,
        startDate: '2020-10-04T10:12:06.964Z',
        endDate: null,
      },
    ],
  },
  {
    id: '6177c1ac10e29d8ab44eb0ec',
    avatarPicture: FatmaHamed,
    metrics: [
      {
        id: '9',
        risk: 'NORMAL',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '18',
      },
      {
        id: '10',
        risk: 'NORMAL',
        metricType: '4',
        date: '2021-06-21T10:12:06.964Z',
        value: '19',
      },
      {
        id: '11',
        risk: 'NORMAL',
        metricType: '5',
        date: '2021-06-21T10:12:06.964Z',
        value: '120*80',
      },
      {
        id: '12',
        risk: 'NORMAL',
        metricType: '6',
        date: '2021-06-21T10:12:06.964Z',
        value: '98',
      },
      {
        id: '7',
        risk: 'NORMAL',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '62',
      },
      {
        id: '8',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '163',
      },
    ],
    compliance: 60,
    lifeStyle: {},
    socialDeterminant: {},
    medicalHistory: [],
    medicalCondition: [
      {
        id_: '1',
        name: 'insomnia',
        isRecovered: false,
        startDate: '2020-08-11T10:12:06.964Z',
        endDate: null,
      },
    ],
  },
  {
    id: '6177c20510e29d8ab44eb0f2',
    avatarPicture: AudreyTyler,

    metrics: [
      {
        id: '15',
        risk: 'NORMAL',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '18',
      },
      {
        id: '16',
        risk: 'NORMAL',
        metricType: '4',
        date: '2021-06-21T10:12:06.964Z',
        value: '19',
      },
      {
        id: '17',
        risk: 'NORMAL',
        metricType: '5',
        date: '2021-06-21T10:12:06.964Z',
        value: '123.7*90',
      },
      {
        id: '18',
        risk: 'NORMAL',
        metricType: '6',
        date: '2021-06-21T10:12:06.964Z',
        value: '98',
      },
      {
        id: '13',
        risk: 'NORMAL',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '66',
      },
      {
        id: '14',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '177',
      },
    ],
    compliance: 95,
    lifeStyle: {},
    socialDeterminant: {},
    medicalHistory: [],
    medicalCondition: [
      {
        id_: '1',
        name: 'feverishness',
        isRecovered: false,
        startDate: '2020-07-01T10:14:06.964Z',
        endDate: null,
      },
      {
        id_: '2',
        name: 'sleep disturbances',
        isRecovered: false,
        startDate: '2020-03-11T10:12:06.964Z',
        endDate: null,
      },
    ],
  },
  {
    id: '6177c26410e29d8ab44eb0f8',
    avatarPicture: RichardOConnor,

    metrics: [
      {
        id: '19',
        risk: 'NORMAL',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '73',
      },
      {
        id: '23',
        risk: 'NORMAL',
        metricType: '5',
        date: '2021-06-21T10:12:06.964Z',
        value: '138*85',
      },
      {
        id: '21',
        risk: 'NORMAL',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '19',
      },
      {
        id: '22',
        risk: 'NORMAL',
        metricType: '4',
        date: '2021-06-21T10:12:06.964Z',
        value: '19',
      },
      {
        id: '24',
        risk: 'NORMAL',
        metricType: '6',
        date: '2021-06-21T10:12:06.964Z',
        value: '98',
      },
      {
        id: '20',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '185',
      },
    ],
    compliance: 100,
    lifeStyle: {},
    socialDeterminant: {},
    medicalHistory: [],
    medicalCondition: [
      {
        id_: '1',
        name: 'anxiety',
        isRecovered: true,
        startDate: '2020-08-08T10:14:06.964Z',
        endDate: '2020-11-23T08:14:09.964Z',
      },
      {
        id_: '2',
        name: 'diarrhea',
        isRecovered: true,
        startDate: '2020-06-11T10:12:06.964Z',
        endDate: '2020-07-01T10:14:06.964Z',
      },
    ],
  },
  {
    id: '6177c2a810e29d8ab44eb0fe',
    avatarPicture: PatriciaSousa,

    metrics: [
      {
        id: '28',
        risk: 'HIGH',
        metricType: '4',
        date: '2021-06-21T10:12:06.964Z',
        value: '17',
      },
      {
        id: '29',
        risk: 'NORMAL',
        metricType: '5',
        date: '2021-06-21T10:12:06.964Z',
        value: '110*85',
      },
      {
        id: '25',
        risk: 'NORMAL',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '62',
      },
      {
        id: '26',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '158',
      },
      {
        id: '27',
        risk: 'NORMAL',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '20',
      },
      {
        id: '30',
        risk: 'NORMAL',
        metricType: '6',
        date: '2021-06-21T10:12:06.964Z',
        value: '97',
      },
    ],
    compliance: 40,
    lifeStyle: {},
    socialDeterminant: {},
    medicalHistory: [],
    medicalCondition: [
      {
        id_: '1',
        name: 'binge eating',
        isRecovered: false,
        startDate: '2020-09-08T11:34:26.964Z',
        endDate: null,
      },
      {
        id_: '2',
        name: 'overeating',
        isRecovered: false,
        startDate: '2020-10-11T11:15:06.964Z',
        endDate: null,
      },
    ],
  },
  {
    id: '6177c2d910e29d8ab44eb104',
    avatarPicture: FrancisPage,

    metrics: [
      {
        id: '31',
        risk: 'NORMAL',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '52',
      },
      {
        id: '32',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '165',
      },
      {
        id: '33',
        risk: 'NORMAL',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '17.5',
      },
      {
        id: '34',
        risk: 'NORMAL',
        metricType: '4',
        date: '2021-06-21T10:12:06.964Z',
        value: '18',
      },
      {
        id: '35',
        risk: 'NORMAL',
        metricType: '5',
        date: '2021-06-21T10:12:06.964Z',
        value: '120*85',
      },
      {
        id: '36',
        risk: 'NORMAL',
        metricType: '6',
        date: '2021-06-21T10:12:06.964Z',
        value: '97.5',
      },
    ],
    compliance: 30,
    lifeStyle: {},
    socialDeterminant: {},
    medicalHistory: [],
    medicalCondition: [
      {
        id_: '1',
        name: 'stomachache',
        isRecovered: false,
        startDate: '2021-08-08T10:14:06.964Z',
        endDate: null,
      },
      {
        id_: '2',
        name: 'diarrhea',
        isRecovered: false,
        startDate: '2021-10-11T10:12:06.964Z',
        endDate: null,
      },
    ],
  },
  {
    id: '605d9cce16776a4cc622fec9',
    basicInformation: {},
    avatarPicture: avatar,
    metrics: [
      {
        id: '39',
        risk: 'HIGH',
        metricType: '3',
        date: '2021-06-21T10:12:06.964Z',
        value: '12',
      },
      {
        id: '38',
        risk: 'NORMAL',
        metricType: '2',
        date: '2021-06-21T10:12:06.964Z',
        value: '10',
      },
      {
        id: '37',
        risk: 'NORMAL',
        metricType: '1',
        date: '2021-06-21T10:12:06.964Z',
        value: '85',
      },
    ],
    compliance: 80,

    lifeStyle: {
      id: '1',
      healthRating: 'Good',
      sleepHealth: 'Less than 6 hours',
      fitness: 'fitness',
      smoking: 'smokinggg',
      drinking: 'drinkkk',
      nutrition: 'nutritionnn',
      drugs: 'dddd',
      sexLife: 'ssss',
      diet: 'dddd',
    },
    socialDeterminant: {
      genderIdentity: 'data',
      sexualOrientation: 'data',
      educationalLevel: 'data',
      maritalStatus: 'data',
      housingStatus: 'data',
      loneliness: 'data',
      transportationAccess: 'data',
      safety: 'data',
      violence: 'data',
      finance: 'data',
    },
    medication: [],
    medicalHistory: [
      {
        id_: '123',
        name: 'nameName',
        date: '2020-06-21T10:12:06.964Z',
        comment: 'my comment',
      },
    ],
    medicalCondition: [
      {
        id_: '1',
        name: 'Flue',
        isRecovered: true,
        startDate: '2020-06-21T10:12:06.964Z',
        endDate: null,
      },
      {
        id_: '2',
        name: 'Condition2',
        isRecovered: true,
        startDate: '2020-06-21T10:12:06.964Z',
        endDate: '2021-06-21T10:12:06.964Z',
      },
      {
        id_: '3',
        name: 'Condition3',
        isRecovered: true,
        startDate: '2020-06-21T10:12:06.964Z',
        endDate: '2021-06-21T10:12:06.964Z',
      },
    ],
  },
];

function getCorrespondingFakePatient(id) {
  for (var index in fakePatientsList) {
    if (fakePatientsList[index].id == id) {
      return fakePatientsList[index];
    }
  }
  return null;
}

export const getCorrespondingFakeDataFromFakePatient = (
  patientId,
  dataType
) => {
  let fakePatient = getCorrespondingFakePatient(patientId);

  if (fakePatient) {
    switch (dataType) {
      case 'metrics':
        return fakePatient.metrics;
      case 'lifeStyle':
        return fakePatient.lifeStyle;
      case 'socialDeterminant':
        return fakePatient.socialDeterminant;
      case 'medication':
        return fakePatient.medication;
      case 'medicalHistory':
        return fakePatient.medicalHistory;
      case 'medicalCondition':
        return fakePatient.medicalCondition;
      default:
        return [];
    }
  } else {
    return [];
  }
};

function completePatient(patient) {
  var fakePatientData = getCorrespondingFakePatient(patient.id_);
  patient.avatarPicture = null;

  if (fakePatientData) {
    patient.avatarPicture = fakePatientData.avatarPicture;
    patient.metrics = fakePatientData.metrics;
    patient.compliance = fakePatientData.compliance;

    patient.lifeStyle = fakePatientData.lifeStyle;
    patient.socialDeterminant = fakePatientData.socialDeterminant;
    patient.medication = fakePatientData.medication;
    patient.medicalHistory = fakePatientData.medicalHistory;
    patient.medicalCondition = fakePatientData.medicalCondition;
  }

  return patient;
}

export const completePatientInfo = (patient) => {
  return completePatient(patient);
};

export const completePatientsInfo = (patientsList) => {
  for (var index in patientsList) {
    patientsList[index] = completePatient(patientsList[index]);
  }

  return sortPatientBasedOnMetricRisk(patientsList);
};

export const sortPatientBasedOnMetricRisk = (patientsList) => {
  function metricRiskToNumeric(metricList) {
    if (metricList && metricList.length > 0) {
      var metric = metricList[0];
      if (metric && metric.risk) {
        var risk = metric.risk;
        if (risk == 'HIGH') {
          return 3;
        } else if (risk == 'LOW') {
          return 2;
        }
      }
    }
    return 1;
  }

  patientsList.sort(function (a, b) {
    var riskA = metricRiskToNumeric(a.metrics);
    var riskB = metricRiskToNumeric(b.metrics);

    if (riskA < riskB) {
      return 1;
    }
    if (riskA > riskB) {
      return -1;
    }
    // must be equal
    return 0;
  });

  return patientsList;
};
