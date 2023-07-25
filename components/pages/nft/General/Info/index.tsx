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
import PaymentModal from '@components//Payment';

const { Paragraph, Title } = Typography;
const { OFFER, OWNERS } = NFT_TABS;

const Info = ({dataNftDetail}: any) => {
  const { t } = useTranslation();
  const [isModalPayment, setIsModalPayment] = useState(false);

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

  const handleOpenPayment = () => setIsModalPayment(true);
  const handleClosePayment = () => setIsModalPayment(false);

  return (
    <Fragment>
      <div className='nft-detail-content'>
        <div className='nft-detail-head'>
          <Title level={4} className='title-collection'>{dataNftDetail[0]?.name}</Title>
        </div>
        <div className='feature'>
          <span className='feature-item-unlock'>
            <img src='' alt='' />
            <span>{dataNftDetail[0]?.status}</span>
          </span>
        </div>
        <div className='avatar'>
          <Avatar
            size={{ xs: 35, sm: 35, md: 35, lg: 35, xl: 40, xxl: 40 }}
            icon={<img src={NftTopImage1} alt='' />}
          />
          <div className='avatar-info'>
            <p>Collection</p>
            <p>{dataNftDetail[0]?.name}</p>
          </div>
        </div>
        <p className='statistical'>{dataNftDetail[0]?.description}</p>
        <div className='price'>
          <span>{dataNftDetail[0]?.totalBurned} N1</span>
          <span className='price-item'>~$1,600</span>
        </div>
        <div className='gr-btn'>
          <Button className='btn-buy' disabled={dataNftDetail[0]?.status === "MINTED"} onClick={handleOpenPayment}>Mint</Button>
          <Button className='btn-offer'>Put On Sale</Button>
        </div>
        <div>
          <AppTab
            onChangeTab={handleChangeTab}
            activeKey={activeTab.tab}
            listTab={listTab}
            className='my-activities-page-tab container'
          />
        </div>
        <PaymentModal isModalPayment={isModalPayment} handleClosePayment={handleClosePayment} dataNftDetail={dataNftDetail}/>
      </div>
    </Fragment>
  );
};

export default Info;
