import Mobile from './Mobile';
import Desktop from './Desktop';
import AppLink from '../AppLink';
import Notification from '../Notification';

import AppIcon from 'public/svg/app_logo.svg';

import { useMobile } from 'hooks/useWindowSize';
import { useAppSelector } from 'hooks/useStore';
import { useGetConfig } from 'hooks/useGetConfig';

import { routeURLs } from 'constants/routes';
import selectedConnection from 'redux/connection/selector';
import { useTranslation } from 'next-i18next';
import EcosystemDropdown from './EcosystemDropdown';
import DocsDropdown from './DocsDropdown';

type HeaderProps = Record<string, never>;

const Header: React.FC<HeaderProps> = () => {
  const { t } = useTranslation();
  const isMobile = useMobile();

  const { isConnected } = useAppSelector(selectedConnection.getConnection);
  const { isMaintenance } = useGetConfig();

  return (
    <header className='app-header'>
      <div className='container'>
        <div className='menu'>
          <div className='logo'>
            <AppLink href={routeURLs.HOME}>
              <img src={AppIcon} className='app-header__app-icon' />
            </AppLink>
          </div>
          {!isMobile ? (
            <div className='items'>
              <AppLink href={routeURLs.HOME}>{t('home.txt_home')}</AppLink>
              <AppLink href={routeURLs.NFT}>{t('home.txt_myNft')}</AppLink>
              <AppLink href={routeURLs.MY_ACTIVITIES}>{t('home.txt_activity')}</AppLink>
            </div>
          ) : (
            <></>
          )}
        </div>

        {!isMaintenance && (
          <div className='app-header__toogle'>
            {isConnected && <div className='app-header__action'><AppLink href={routeURLs.CREATE_NFT}>
              <div className='item'>
                {t('nft_create.txt_title')}
              </div>
            </AppLink> <Notification /></div>}
            {isMobile ? <Mobile /> : <Desktop />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
