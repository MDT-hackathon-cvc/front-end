import React, { Fragment, useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Col, Image, Popover, Row, Typography } from 'antd';
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
import { DOLLAR_TEXT } from 'constants/common';
import { NFT_PERCENTAGE_SUFFIX, NFT_STANDARD, NFT_STATUS } from 'constants/nft';
import AppAddress from '@components//AppAddress';
import selectorNft from 'redux/nft/selector';
import selectedAddress from 'redux/address/selector';
import AppLink from '@components//AppLink';
import ReadMore from '@components//AppReadMore';
import ItemWithLabel from '@components//ItemWithLabel';

const { Paragraph } = Typography;

const Info = () => {
  const { t } = useTranslation();
  const { currencies = {} } = useGetConfig();
  const { ipfsGateway } = useGetConfig();
  const nftDetail = useAppSelector(selectorNft.getNftDetail);

  const { name, numberOfItem, noOfShare, description, cid } = nftDetail;

  return (
    <Fragment>
      <div className='title_header'>
        <div className='info__name'>
          <EllipsisText text={name} />
        </div>
        <AppLink href={`${ipfsGateway}${cid}`} target='_blank' rel='noreferrer'>
          <AppButton className='header__button' text={t('nft_detail.txt_view_on_ipfs')} />
        </AppLink>
      </div>

      <div className='info__content'>
        <ReadMore contentClassName='info__description' textContent={description} />
      </div>

      <div className='info__sale'>
        <div className='item'>
          <p className='label'>{t('nft_detail.txt_number_of_items')}</p>
          <p className='text'>
            <AppNumber value={numberOfItem} />
          </p>
        </div>

        <div className='item'>
          <p className='text'>
            <ItemWithLabel label={t('nft_detail.txt_no_of_shares')} helpText={t('nft_detail.txt_no_of_shares_help')}>
              <AppNumber value={noOfShare} />
            </ItemWithLabel>
          </p>
        </div>

        <div className='item'>
          <p className='label'>{t('nft_detail.txt_nft_format')}</p>
          <div className='text text-icon'>
            <img src={PolygonIcon} className='polygon-icon' />
            <EllipsisText text={t('common.txt_erc_721')} />
          </div>
        </div>
        <div className='item'>
          <p className='label'>{t('nft_detail.txt_contract_address')}</p>
          <AppAddress
            addressClassName={'text'}
            address={process.env.NEXT_PUBLIC_APP_CONTRACT_ERC721_ADDRESS!}
            isVisibleCopy={true}
            isVisibleKyc={false}
            isVisibleUserType={false}
            isVisibleOpenLink
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Info;
