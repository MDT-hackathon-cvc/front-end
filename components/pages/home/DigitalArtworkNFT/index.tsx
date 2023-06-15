import React from 'react'
import { Typography } from 'antd';
import DigitalArtworkForm from '@components//CommonForm/DigitalArtworkForm';
import Link from 'next/link';

const { Title } = Typography;

const DigitalArtworkNFT = () => {
  return (
    <div className='digitalArtwork-home'>
      <div className='container'>
        <div className='digitalArtwork-head'>
          <Title level={4} className='title-digitalArtwork'>Digital Artwork NFT</Title>
          <Link href="#">Browse all</Link>
        </div>
        <DigitalArtworkForm />
      </div>
    </div>
  )
}

export default DigitalArtworkNFT