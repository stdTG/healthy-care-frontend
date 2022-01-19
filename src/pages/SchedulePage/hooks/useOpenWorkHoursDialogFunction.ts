import { WorkingHours } from '../../../generated/graphql';

const useOpenWorkHoursDialogFunction = (
  getWorkingHours: Function,
  workHoursDialog: { open: Function, close: Function, isOpen: boolean},
  saveWorkingHours: Function

) => {
  async function openWorkHoursDialog() {
    const workingHours = await getWorkingHours();

    const formatWorkingHours = Object.values(workingHours)?.map((item: any) => {
      return {
        dayOfWeek: item.dayOfWeek,
        startTime: new Date('2020-11-30T' + item.startTime),
        endTime: new Date('2020-11-30T' + item.endTime),
        startLunchTime: new Date('2020-11-30T' + item.startLunchTime),
        endLunchTime: new Date('2020-11-30T' + item.endLunchTime),
      };
    });

    const result = await workHoursDialog.open({
      workingHours: formatWorkingHours,
    });

    if (!result || !result.workingHours) return;

    saveWorkingHours({ ...result });
  }

  return {
    openWorkHoursDialog
  }
}

export default useOpenWorkHoursDialogFunction