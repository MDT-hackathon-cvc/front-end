import { useTranslation } from 'next-i18next';

import AppButton from '@components//AppButton';

import BackIcon from 'public/svg/back_icon.svg';

import { useRouter } from 'next/router';

import selectedPage from 'redux/page/selector';

import { useAppSelector } from 'hooks/useStore';

import { renderURLs, routeURLs } from 'constants/routes';
import { useGetConfig } from 'hooks/useGetConfig';
import { useContext } from 'react';
import { NftDetailContext } from 'pages/nft/[id]';
import AppLink from '@components//AppLink';

const Header = () => {
  const { t } = useTranslation();
  const {
    query: { id },
  } = useRouter() as any;

  return (
    <div className='nft-detail-page-header'>
      <div className='container'>
        <div className='wrap'>
          <div className='breadcrum'>
            <AppLink href={renderURLs.MY_ACCOUNT()}>{t('common.txt_inventory')}</AppLink>
            <AppLink href={renderURLs.NFT_DETAIL(id)}>{t('common.txt_nft_detail')}</AppLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
