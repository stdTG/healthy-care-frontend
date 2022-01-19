import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";

type SCHEMA = any // Tmprry type

export const useStatisticRequest = (gql_schema: SCHEMA) => {
	const [runRequest, { loading, data, error }] = useLazyQuery(gql_schema);

	useEffect(() => {
		runRequest()
	}, [])

	return {
		loading,
		data,
		error
	}
}