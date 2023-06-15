import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Avatar, Button, Col, Image, Popover, Row, Typography } from 'antd';
import { FacebookShareButton, TelegramShareButton, TwitterShareButton } from 'react-share';

import NumberFormat from '@components//NumberFormat';
import EllipsisText from '@components//EllipsisText';
import AppNumber from '@components//AppNumber';
import BuyButton from '@components//BuyButton';
import AppButton from '@components//AppButton';

import PolygonIcon from 'public/svg/polygon_icon.svg';

import selectedConnection from 'redux/connection/selector';

import { useAppSelector } from 'hooks/useStore';
import { useGetConfig } from 'hooks/useGetConfig';

import { formatPadStart, getLocation } from 'utils';
import { DOLLAR_TEXT, PAGE_TAB_QUERY } from 'constants/common';
import { NFT_PERCENTAGE_SUFFIX, NFT_STANDARD, NFT_STATUS, NFT_TABS } from 'constants/nft';
import AppAddress from '@components//AppAddress';
import selectorNft from 'redux/nft/selector';
import selectedAddress from 'redux/address/selector';
import AppLink from '@components//AppLink';
import ReadMore from '@components//AppReadMore';
import ItemWithLabel from '@components//ItemWithLabel';
import NftTopImage1 from 'public/images/Rectangle_711.png';
import AppTab from '@components//AppTab';
import router, { useRouter } from 'next/router';
import EyeIcon from 'public/svg/EyeIcon';
import OwnersTab from './OwnersTab';
import OfferTab from './OfferTab';

const { Paragraph, Title } = Typography;
const { OFFER,OWNERS} = NFT_TABS;

const Info = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState({
    tab: OWNERS.query,
    isClick: false,
  });
  const handleChangeTab = (value: string) => {
    setActiveTab({
      ...activeTab,
      tab: value,
    });
  };
  const listTab = [
    {
      key: OWNERS.query,
      tab: t(OWNERS.label),
      content: <OwnersTab />,
    },
    {
      key: OFFER.query,
      tab: t(OFFER.label),
      content: <OfferTab />,
    },
  ];
  return (
    <Fragment>
      <div className='nft-detail-content'>
        <div className='nft-detail-head'>
          <Title level={4} className='title-collection'>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing</Title>
          <div className='nft-detail-evaluate'>
            <span>
            <EyeIcon /> 500
            </span>
          </div>
        </div>
        <div className='feature'>
          <span className='feature-item-unlock'>
            <img src='' alt='' />
            <span>UNLOCKABLE CONTENT</span>
          </span>
          <span className='feature-item'>Soul Dragon</span>
          <span className='feature-item'>Soul Dragon</span>
          <span className='feature-item'>Soul Dragon</span>
        </div>
        <div className='avatar'>
          <Avatar
            size={{ xs: 35, sm: 35, md: 35, lg: 35, xl: 40, xxl: 40 }}
            icon={<img src={NftTopImage1} alt='' />}
          />
          <div className='avatar-info'>
            <p>Collection</p>
            <p>Lunacy Icewar</p>
          </div>
        </div>
        <p className='statistical'>Edition 1/30 - 2.5% royalties </p>
        <div className='price'>
          <span>13,000 N1</span>
          <span className='price-item'>~$1,600</span>
        </div>
        <div className='gr-btn'>
          <Button className='btn-buy'>Buy Now</Button>
          <Button className='btn-offer'>Make Offer</Button>
        </div>
        <div>
          <AppTab
            onChangeTab={handleChangeTab}
            activeKey={activeTab.tab}
            listTab={listTab}
            className='my-activities-page-tab container'
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Info;
