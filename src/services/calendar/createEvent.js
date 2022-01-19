import shortid from 'shortid';
import { any, map } from 'ramda';
import {
  addMinutes,
  differenceInMinutes,
  format,
  getHours,
  getISODay,
  getMinutes,
  getTime,
  set,
} from 'date-fns';
import { meetingTypesData, locationTypesData } from 'lib/enums/meetingTypes';

const status = {
  awaiting: 'AWAITING',
  approved: 'APPROVED',
  rejected: 'REJECTED',
  cancelled: 'CANCELLED',
};

export const getEvent = (result) => {
  const {
    patient,
    eventType,
    location,
    careTeamMember,
    note,
    title,
    patients,
    careTeamMembers,
    isAppointment,

    startDate,
    endDate,
  } = result.data;

  if (isAppointment) {
    return {
      event: {
        id: shortid.generate(),

        title: meetingTypesData[eventType].label,
        eventType,
        note,
        startDate,
        endDate,
        careTeamMember: { ...careTeamMember, status: status.approved }, //isAccepted

        patient: { ...patient, status: status.awaiting }, //isPending
        isAppointment,
        location, //ID
      },
    };
  }

  return {
    event: {
      id: shortid.generate(),
      startDate,
      endDate,
      patients: patients,
      careTeamMembers: careTeamMembers,

      title: title,
      isAppointment,
    },
  };
};
