import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from 'next-i18next';
import { Spin } from 'antd';

import Modal from '@components//Modal';
import AppButton from '@components//AppButton';
import LoadingIcon from '@components//LoadingIcon';

import NextIcon from 'public/svg/next_icon.svg';
import MetamaskLogo from 'public/svg/metamask_icon.svg';
import ConnectingIcon from 'public/svg/connect_wallet_icon.svg';
import WalletIcon from 'public/svg/wallet_icon.svg';
import WalletConnectIcon from 'public/svg/icon_walletconnect.svg';
import InfoIcon from 'public/svg/info_icon.svg';
import DownloadMetamaskIcon from 'public/svg/dowload_icon.svg';

import { handleSetConnectModal, handleSetLoadingMetamask, handleSetWrongNetwork } from 'redux/connection/slice';
import { handleSetConnectedWalletType } from 'redux/address/slice';
import selectedConnection from 'redux/connection/selector';
import { useConnectWallet } from 'hooks/useConnectWallet';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';

import { getErrorConnectMessage } from 'connectors';
import { METAMASK, METAMASK_DEEPLINK, WALLET_CONNECT } from 'connectors/constants';

declare let window: any;

const ModalConnectWallet = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { active, deactivate, account } = useWeb3React();

  const { isShowConnectModal, isConnectingWallet } = useAppSelector(selectedConnection.getConnection);

  const handleHideModalConnectWallet = () => dispatch(handleSetConnectModal(false));

  const handleCloseModalConnectWallet = () => {
    handleHideModalConnectWallet();
    dispatch(handleSetLoadingMetamask(false));
  };

  const [connectedWalletType, setConnectedWalletType] = useState('');

  const { connectInjected, connectWalletConnect } = useConnectWallet();

  const isEthereum = typeof window !== 'undefined' && !!window?.ethereum?.isMetaMask;

  useEffect(() => {
    if (active && account && connectedWalletType) {
      dispatch(handleSetConnectedWalletType(connectedWalletType));
    }
  }, [connectedWalletType, active, account]);

  const handleConnectMetamask = () => {
    handleHideModalConnectWallet();

    connectInjected(
      undefined,
      () => {
        dispatch(handleSetLoadingMetamask(true));
        setConnectedWalletType(METAMASK);
      },
      () => isEthereum && dispatch(handleSetLoadingMetamask(false)),
    );
  };

  const handleConnectWallet = () => {
    handleHideModalConnectWallet();

    connectWalletConnect({
      failed: (err) => {
        dispatch(handleSetLoadingMetamask(false));
        getErrorConnectMessage(err, deactivate);
        dispatch(handleSetWrongNetwork(true));
      },
    });

    setConnectedWalletType(WALLET_CONNECT);
  };

  const renderConnectWallet = () => (
    <div className='wallet-modal'>
      <p className='title'>{t('common.txt_connect_wallet_modal_title')}</p>
      <div className='wallet-modal__button'>
        <p className='sub-title' dangerouslySetInnerHTML={{ __html: t('common.txt_connect_wallet_modal_content') }} />
        <AppButton
          text={t('common.txt_metamask')}
          onClick={handleConnectMetamask}
          className='wallet-modal__button--first'
          variant='default'
          prefixIcon={<img src={MetamaskLogo} />}
          afterIcon={<img src={NextIcon} />}
        />
        <p className='sub-note'>
          <img className='sub-note__image' src={InfoIcon} />
          <span dangerouslySetInnerHTML={{ __html: t('common.txt_connect_to_metamask_note') }} />
        </p>
        {/* <AppButton
          onClick={handleConnectWallet}
          className='wallet-modal__button--second'
          variant='default'
          text={t('common.txt_walletconnect')}
          prefixIcon={<img src={WalletConnectLogo} />}
          afterIcon={<img src={NextIcon} />}
        /> */}
      </div>
    </div>
  );

  const renderWalletConnectContent = () => (
    <div className='metamask_notfound'>
      <p className='title'>{t('common.walletconnect_not_found_title')}</p>
      <img src={WalletConnectIcon} alt='' />
      <a href='' className='link' onClick={handleConnectWallet} rel='noreferrer'>
        {t('header.walletconnect_reconnect')}
      </a>
    </div>
  );

  const renderLoadingContent = () => (
    <div className='loading-metamask-modal'>
      <div className='loading-icon'>
        <img className='loading-icon__wallet' src={WalletIcon} alt='' />
        <Spin size='large' indicator={<LoadingIcon className='loading-icon__connecting' src={ConnectingIcon} />} />
      </div>
      <p className='title'>{t('common.txt_connecting_to_wallet')}</p>
      <p className='sub-title' dangerouslySetInnerHTML={{ __html: t('common.txt_connecting_to_wallet_content') }} />
    </div>
  );

  const renderMetamaskNotFoundContent = () => (
    <div className='metamask-notfound-modal'>
      <p className='title'>{t('common.txt_metamask_not_found_title')}</p>
      <p className='sub-title' dangerouslySetInnerHTML={{ __html: t('common.txt_metamask_not_found_content') }} />
      <img width={64} height={64} src={MetamaskLogo} alt='' />
      <div className='footer'>
        <img src={DownloadMetamaskIcon} />
        <a target='_blank' href={METAMASK_DEEPLINK} className='link' rel='noreferrer'>
          {t('common.txt_metamask_not_found_button')}
        </a>
      </div>
    </div>
  );

  const renderNoMetamask = () => (
    <div className='popup_metamask'>
      {connectedWalletType === WALLET_CONNECT
        ? renderWalletConnectContent()
        : isEthereum
        ? renderLoadingContent()
        : renderMetamaskNotFoundContent()}
    </div>
  );

  return (
    <Modal
      visible={isShowConnectModal || isConnectingWallet}
      onClose={handleCloseModalConnectWallet}
      showCloseIcon={isShowConnectModal || !isEthereum}
      wrapClassName='connect-wallet-modal'
    >
      {isShowConnectModal ? renderConnectWallet() : renderNoMetamask()}
    </Modal>
  );
};

export default ModalConnectWallet;
