import { useEffect, useState } from "react";

import { GET_GENDER_STATISTIC } from "../../gqlSchemes/getGenderStatistic";
import { GET_AGE_STATISTIC } from "../../gqlSchemes/getAgeStatistic";
import { GET_LOCATION_STATISTIC } from "../../gqlSchemes/getLocationStatistic";
import { useStatisticRequest } from "./useStatisticRequest";
import useEventsRequest from "../useEventsRequest";

const useAllStatisticsRequest = () => {

  const [loading, setLoading] = useState(true)

  // Gender
  const {
    loading: genderStatisticLoading,
    data: genderStatistic,
    error: genderStatisticFetchingError
  } = useStatisticRequest(GET_GENDER_STATISTIC)

  // Age
  const {
    loading: ageStatisticLoading,
    data: ageStatistic,
    error: ageStatisticFetchingError
  } = useStatisticRequest(GET_AGE_STATISTIC)

  // Locations
  const {
    loading: locationStatisticLoading,
    data: locationStatistic,
    error: locationStatisticFetchingError
  } = useStatisticRequest(GET_LOCATION_STATISTIC)

  // Events
  const {
    loading: eventsLoading
  } = useEventsRequest();

  useEffect(() => {

    const isLoding = genderStatisticLoading
      || ageStatisticLoading
      || locationStatisticLoading
      || eventsLoading

    setLoading(isLoding)
  }, [
    genderStatisticLoading,
    ageStatisticLoading,
    locationStatisticLoading,
    eventsLoading
  ])

  return {
    loading,
    data: {
      genderStatistic,
      ageStatistic,
      locationStatistic
    }
  }
}

export default useAllStatisticsRequest