import { useAppSelector } from 'hooks/useStore';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { storeGlobal } from 'redux/configStore';
import { handleGetProfile } from 'redux/page/slice';
import accountServices from 'services/account';
import { checkSuccessRequest, getToken } from 'services/api';

export const useGetUserProfile = (token: string) => {
  const [userProfile, setUserProfile] = useState<any>(null);

  const handleGetUserProfile = async () => {
    getToken(token);

    return token !== '' ? await accountServices.getUserProfile() : null;
  };

  const getUserProfile = useQuery(['getProfile', token], handleGetUserProfile, {
    refetchOnWindowFocus: false,
    onSuccess: (res) => {
      storeGlobal?.dispatch(handleGetProfile(res?.data));
      setUserProfile(res?.data);
    },
    onError: (error: any) => console.log(error, 'error'),
  });

  return {
    userProfile,
    onGetUserProfile: getUserProfile,
  };
};

export const useReferrerUser = (referrer: string) => {
  const [checkIsSuccess, setCheckIsSuccess] = useState(true);
  const handleCheckReferrer = async () => {
    return await accountServices.checkReferrer(referrer);
  };

  const checkReferrerUser = useQuery(['checkReferrer', referrer], handleCheckReferrer, {
    refetchOnWindowFocus: false,
    enabled: !!referrer,

    onSuccess: (res: any) => {
      setCheckIsSuccess(checkSuccessRequest(res));
    },
    onError: (error: any) => {
      console.log(error);
    },
  });
  return {
    checkIsSuccess,
    checkReferrerUser: checkReferrerUser,
  };
};
