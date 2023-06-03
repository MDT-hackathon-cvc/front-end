import { TFunction } from 'next-i18next';
import { number, object } from 'yup';

import { formatCurrency } from 'utils';

import { BUY_FIELD, LIST_FOR_SALE_FIELD } from 'constants/nft';

const { QUANTITY: buyQuantity } = BUY_FIELD;
const { QUANTITY: listForSaleQuantity, UNIT_PRICE: listForSaleUnitPrice } = LIST_FOR_SALE_FIELD;

export const getBuySchema = (t: TFunction, maxQuantity: number) => {
  return object().shape({
    [buyQuantity]: number()
      .positive(t('message.E2'))
      .required(t('message.E1', { field: t('nft_detail.txt_quantity') }))
      .max(
        maxQuantity,
        t('message.E17', {
          number: formatCurrency(maxQuantity),
        }),
      ),
  });
};

export const getListForSaleSchema = (t: TFunction, maxQuantity: number, required: any) => {
  return object().shape({
    [listForSaleQuantity]: number()
      .positive(t('message.E2'))
      .test('required', t('message.E1', { field: t('nft_detail.txt_lfs_quantity') }), (value: string | any) => {
        return required?.requiredQuantity || value;
      })
      .max(
        maxQuantity,
        t('message.E17', {
          number: formatCurrency(maxQuantity),
        }),
      ),
    [listForSaleUnitPrice]: number()
      .positive(t('message.E2'))
      .required(t('message.E1', { field: t('nft_detail.txt_lfs_price') })),
  });
};
