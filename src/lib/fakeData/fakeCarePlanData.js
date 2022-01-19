var fakeCarePlanList = [
  {
    id: '608825a0eb8a616405046918',
    is_template: false,
    status: 'PUBLISHED',
  },
  {
    id: '6092826805fac2792c62f907',
    is_template: true,
    status: 'PUBLISHED',
  },
  {
    id: '616b568e10e29d8ab44eaa01',
    is_template: false,
    status: 'PUBLISHED',
  },
];

function getCorrespondingFakeCarePlan(id) {
  for (var index in fakeCarePlanList) {
    if (fakeCarePlanList[index].id == id) {
      return fakeCarePlanList[index];
    }
  }
  return null;
}

function completeCarePlan(carePlan) {
  var fakeCarePlanData = getCorrespondingFakeCarePlan(carePlan.id_);

  if (fakeCarePlanData) {
    carePlan.status = fakeCarePlanData.status;
    carePlan.is_template = fakeCarePlanData.is_template;
  }

  return carePlan;
}

export const completeCarePlantInfo = (carePlan) => {
  return completeCarePlan(carePlan);
};

export const completeCarePlansInfo = (carePlansList) => {
  for (var index in carePlansList) {
    carePlansList[index] = completeCarePlan(carePlansList[index]);
  }

  return carePlansList;
};
