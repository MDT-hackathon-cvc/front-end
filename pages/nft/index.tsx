import React, { createContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Detail from '@components//pages/nft';
import PublicLayout from '@components//Layout/Public';

import { wrapper } from 'redux/configStore';
import { useGetNftDetail } from '@components//pages/nft/hooks';

import nftServices from 'services/nft';
import { checkSuccessRequest } from 'services/api';
import withServerSideProps from 'hoc/withServerSideProps';
import ListNft from '@components//pages/nft-list';

export const NftDetailContext = createContext({});

const NftList = () => {
  const {
    query: { id },
  } = useRouter() as any;
  // const { t } = useTranslation();

  // const { loading } = useGetNftDetail(id as string) as any;

  return (
    <PublicLayout>
      <ListNft />
    </PublicLayout>
  );
};

export const getServerSideProps: GetServerSideProps = withServerSideProps((context: any) => context);

export default NftList;
