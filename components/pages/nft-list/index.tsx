import DigitalArtworkForm from '@components//CommonForm/DigitalArtworkForm';
import React from 'react';
import NftTopImage2 from 'public/images/Rectangle_727.png';
import NftTopImage1 from 'public/images/Rectangle_729.png';
import { Typography } from 'antd';

const { Title } = Typography;

const data = [
    {
      name: "Dead Dragon Bone",
      img: NftTopImage2,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage1,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage2,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage1,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage2,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage1,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage2,
      price: "13,000 N1",
      priceSell: "~$1,600"
    },
    {
      name: "Dead Dragon Bone",
      img: NftTopImage1,
      price: "13,000 N1",
      priceSell: "~$1,600"
    }
  ]
const ListNft = () => {
  return (
    <div className='nft-ListNft-page'>
      <div className='nft-ListNft-page__wrapper'>
        <div className='container'>
          <Title level={4} className='title-ListNft'>List NFT</Title>

          <DigitalArtworkForm data={data}/>
        </div>
      </div>
    </div>
  );
};

export default ListNft;
