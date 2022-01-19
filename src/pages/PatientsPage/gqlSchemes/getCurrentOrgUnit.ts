import { gql } from '@apollo/client';

export const GET_CURRENT_ORG_UNIT = gql`
    query {
        user {
            dashboard {
                me {
                    orgUnit {
                        __typename
                        ... on CareTeam {
                            id_
                            name
                            __typename
                            subOrg {
                                id_
                                name
                            }
                        }
                        ... on SubOrganization {
                            id_
                            name
                            __typename
                        }
                    }

                }
            }
        }
    }
`;

