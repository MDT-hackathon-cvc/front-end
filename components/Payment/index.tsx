import Modal from '@components//Modal';
import { Avatar, Typography } from 'antd';
import NftTopImage1 from 'public/images/Rectangle_711.png';
import { Form, Formik } from 'formik';
import FormItem, { TYPE_INPUT } from '@components//FormItem';
import { Col, Row } from 'antd';

import React from 'react'
import AppButton from '../AppButton';
import { useTranslation } from 'next-i18next';
import { LIST_FOR_SALE_FIELD, MAX_LENGTH_TOTAL_SUPPLY } from 'constants/nft';
import { limitMaxlengNumber } from 'utils';
import { ZERO_VALUE } from 'constants/common';
import { useAppDispatch, useAppSelector } from 'hooks/useStore';
import MetamaskService from 'services/MetamaskService';
import selectedAddress from 'redux/address/selector';
import { useWeb3React } from '@web3-react/core';
import { useMintNFT } from '@components//pages/nft/hooks';
import AppLoading from '@components//AppLoading';
import LoadingNFTIcon from 'public/svg/loading_nft_icon.svg';

interface PropsPayment {
  isModalPayment: boolean;
  handleClosePayment: () => void;
  dataNftDetail: any;
}

const { Title } = Typography;
const { AMOUNT } = LIST_FOR_SALE_FIELD;

const PaymentModal = ({ isModalPayment, handleClosePayment, dataNftDetail }: PropsPayment) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectedAddress.getAddress);
  const { library } = useWeb3React();
  const { onMintNFT, loadingMint } = useMintNFT()

  const handleApproveMinted = async (data?: any, values?: any) => {
    const wallet = new MetamaskService().getInstance();
    console.log(address)
    await wallet.mintNFT({
      account: address,
      library,
      data,
      onCallback: (response: any) => onMintNFT({
        id: dataNftDetail[0]?._id,
        totalSupply: 1,
        hash: response?.hash
      }),
    });
  };

  const handleSumbit = (values: any) => {
    const param: any = {
      data: {
        collection: "0xa751768ca19C804f24F4b6229D5c4930E1596de7",
        id: `0x${dataNftDetail[0]?._id}`,
        amount: 1,
        uri: dataNftDetail[0]?.ipfsImage,
      },
    };

    handleApproveMinted(param?.data, values)
    handleClosePayment()

  }
  const handleSetMaxQuantity = (setFieldValue: any, field: string) => () => setFieldValue(field, 0);

  return (
    <Modal
      visible={isModalPayment}
      onClose={handleClosePayment}>
      <AppLoading loading={loadingMint || false} src={LoadingNFTIcon}>

        <Title level={4} className='payment-title'>Mint NFT</Title>
        <div className='modal-payment'>
          <Formik
            onSubmit={handleSumbit}
            initialValues={[]}
          // validationSchema={}
          >
            {({ setFieldValue, values, errors }) => {

              return (
                <Row>
                  <Form className='payment-content'>
                    <Col xs={24} className='payment-item'>
                      <span className='payment-item__title'>Item</span>
                      <div className='payment-item-content'>
                        <p>From the Other worlds series.﻿( Original + NFT ) #1</p>
                        <Avatar shape="square" size={64} icon={<img src={NftTopImage1} alt='' />} />
                      </div>
                    </Col>
                    {/* <Col xs={24} className='list-for-sale-modal-form'>
                      <FormItem
                        containerClassName='payment-form__input'
                        typeInput={TYPE_INPUT.NUMBER}
                        placeholder={t('nft_detail.txt_lfs_input_quantity')}
                        decimalScale={ZERO_VALUE}
                        thousandSeparator
                        name={AMOUNT}
                        label={t('nft_detail.txt_lfs_quantity')}
                        appendInput={
                          <AppButton
                            text={t('nft_detail.txt_max')}
                            className='field__button'
                            onClick={handleSetMaxQuantity(setFieldValue, AMOUNT)}
                            variant='primary'
                          />
                        }
                        isAllowed={limitMaxlengNumber(MAX_LENGTH_TOTAL_SUPPLY)}
                      />
                    </Col> */}
                    <Col xs={24} className='payment-item'>
                      <span className='payment-item__title'>Subtotal</span>
                      <div className='payment-item__price'>
                        <p>1</p>
                      </div>
                    </Col>
                    <Col xs={24} className='payment-item'>
                      <span className='payment-item__title'>Amount</span>
                      <div className='payment-item__price'>
                        <p>1</p>
                      </div>
                    </Col>
                    {/* <Col xs={24} className='payment-item'>
                      <span className='payment-item__title'>You will pay</span>
                      <div className='payment-item__price'>
                        <p>13,000 N1</p>
                        <span className='price-item'>~$1,600</span>
                      </div>
                    </Col> */}
                    <div className='payment-btn'>
                      <AppButton
                        htmlType='submit'
                        // className={classNames('button--second')}
                        text={'Mint NFT'}
                        variant='primary'
                      />
                    </div>
                  </Form>
                </Row>
              );
            }}
          </Formik>

        </div>
      </AppLoading>
    </Modal>
  )
}

export default PaymentModal