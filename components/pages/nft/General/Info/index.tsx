import { Avatar, Button, Typography } from 'antd';
import { useTranslation } from 'next-i18next';
import { Fragment, useState } from 'react';




import { useAppSelector } from 'hooks/useStore';

import AppTab from '@components//AppTab';
import PaymentModal from '@components//Payment';
import { NFT_TABS } from 'constants/nft';
import NftTopImage1 from 'public/images/Rectangle_711.png';
import selectedAddress from 'redux/address/selector';
import OfferTab from './OfferTab';
import OwnersTab from './OwnersTab';
import PutOnSaleModal from '@components//PutOnSale';


const { Paragraph, Title } = Typography;
const { OFFER, OWNERS } = NFT_TABS;

const Info = ({ dataNftDetail }: any) => {
  const { t } = useTranslation();
  const [isModalPayment, setIsModalPayment] = useState(false);
  const [isModalPutOnSale, setIsModalPutOnSale] = useState(false);

  
  const { address } = useAppSelector(selectedAddress.getAddress);

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
  const handleOpenPutOnSale = () => setIsModalPutOnSale(true);
  const handleClosePayment = () => setIsModalPayment(false);
  const handleClosePutOnSale = () => setIsModalPutOnSale(false);

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
            icon={<img src={dataNftDetail[0]?.ipfsImage} alt='' />}
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
        {address !== dataNftDetail[0]?.address ? <div className='gr-btn'>
          <Button className='btn-buy' disabled={dataNftDetail[0]?.status === "MINTED"} onClick={handleOpenPayment}>Mint</Button>
          <Button className='btn-offer' onClick={handleOpenPutOnSale}>Put On Sale</Button>
        </div>
          : null
        }
        <div>
          <AppTab
            onChangeTab={handleChangeTab}
            activeKey={activeTab.tab}
            listTab={listTab}
            className='my-activities-page-tab container'
          />
        </div>
        <PaymentModal isModalPayment={isModalPayment} handleClosePayment={handleClosePayment} dataNftDetail={dataNftDetail} />
        <PutOnSaleModal isModalPutOnSale={isModalPutOnSale} handleClosePutOnSale={handleClosePutOnSale} dataNftDetail={dataNftDetail} />
      </div>
    </Fragment>
  );
};

export default Info;
