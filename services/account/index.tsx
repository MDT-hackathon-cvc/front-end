import { api } from 'services/api';

class AccountServices {
  getUserProfile = () => {
    return api.get('users/profile');
  };

  checkReferrer = (referrer: string) => {
    return api.get(`users/${referrer}`);
  };
}

const accountServices = new AccountServices();

export default accountServices;
