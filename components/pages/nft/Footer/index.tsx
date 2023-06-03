import React from 'react';
import { Col, Row } from 'antd';

import Info from './Info';
import { useTranslation } from 'next-i18next';
import Title from 'antd/lib/typography/Title';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className='nft-detail-page-footer'>
      <div className='nft-detail-page-footer__title'>
        <Title level={3}>{t('nft_detail.txt_item_list')}</Title>
      </div>
      <div className='nft-detail-page-footer__content'>
        <Info />
      </div>
    </div>
  );
};
export default Footer;
