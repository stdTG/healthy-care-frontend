import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { GET_USER_INFO } from '../../pages/SchedulePage/gqlSchemes/getUserInfo'
import { actions as userActions } from '../../services/user';

export const useRefreshUserInfo = () => {

  const { data } = useQuery(GET_USER_INFO);
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(
        userActions.setUserInfo({ user: data?.user?.dashboard?.me })
      );
    }
  }, [data]);

}