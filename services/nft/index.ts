import { api } from 'services/api';

export interface withoutBlackProps {
  isWithoutBlack: number;
}
class NFTServices {
  handleGetListNFT = (params: withoutBlackProps) => {
    return api.get('nfts', params);
  };
  handleGetList = () => {
    return api.get('nfts');
  };

  handleGetNftDetail = (id: string) => {
    return api.get(`nfts/${id}`);
  };

  handleGetOwned = (id: string, params?: any) => {
    return api.get(`nfts/${id}/owned`, params);
  };

  handleGetListing = (id: string, params?: any) => {
    return api.get(`nfts/${id}/sale-orders`, params);
  };

  handleGetActivities = (id: string, params?: any) => {
    return api.get(`nfts/${id}/transactions`, params);
  };

  handleListForSaleNFT = (id: string, data: any) => {
    return api.post(`nfts/${id}/sale-orders`, data);
  };
}

const nftServices = new NFTServices();

export default nftServices;
