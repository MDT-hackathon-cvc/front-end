import React from 'react'
import { Typography } from 'antd';
import DigitalArtworkForm from '@components//CommonForm/DigitalArtworkForm';
import Link from 'next/link';
import NftTopImage2 from 'public/images/Rectangle_727.png';
import NftTopImage1 from 'public/images/Rectangle_729.png';
import { routeURLs } from 'constants/routes';
import { useGetListNFTs } from '@components//pages/nft/hooks';
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
  }
]
const DigitalArtworkNFT = () => {
  // const { data: dataNft } = useGetListNFTs();

  // const dataAllNft = dataNft?.data?.docs?.filter((dtNft: any, index: number) => index < 8) || []

  return (
    <div className='digitalArtwork-home'>
      <div className='container'>
        <div className='digitalArtwork-head'>
          <Title level={4} className='title-digitalArtwork'>Digital Artwork NFT</Title>
          <Link href={routeURLs.NFT}>Browse all</Link>
        </div>
        <DigitalArtworkForm data={[]} />
      </div>
    </div>
  )
}

export default DigitalArtworkNFT