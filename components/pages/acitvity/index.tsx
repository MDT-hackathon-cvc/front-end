import AppButton from '@components//AppButton';
import { Typography } from 'antd';
import LENGTH_CONSTANTS from 'constants/length';
import { REDEMPTION_LIST_FIELD } from 'constants/my-account';
import { routeURLs } from 'constants/routes';
import { useAppSelector } from 'hooks/useStore';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import selectAuthentication from 'redux/authentication/selector';
import SearchFilter from './component/SearchFilter';
import TableComponent from './component/TableComponent';

const { CREATED_AT, QUANTITY, TOTAL_VALUE, STATUS: STATUS_COLUMN, ACTION, REQUEST_ID } = REDEMPTION_LIST_FIELD;
const { DEFAULT_PAGE_SIZE, DEFAULT_PAGE } = LENGTH_CONSTANTS;

const { Title } = Typography;
const DATA_MOCK = [
  {
    NO: 'no',
  CREATED_AT: 'createdAt',
  NUMBER_CATEGORIES: 'numberCategories',
  QUANTITY: 'quantity',
  TOTAL_VALUE: 'totalValue',
  STATUS: 'status',
  ACTION: 'action',
  REQUEST_ID: 'requestId',
  CODE: 'code',
  INFORMATION: 'information',
  }
]
const ActivityContainer = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { authenticationToken } = useAppSelector(selectAuthentication.getAuthenticationToken);

  const [paramSearch, setParamSearch] = useState({ page: DEFAULT_PAGE, limit: DEFAULT_PAGE_SIZE });
  const [currentColumn, setCurrentColumn] = useState([
    REQUEST_ID,
    STATUS_COLUMN,
    QUANTITY,
    TOTAL_VALUE,
    CREATED_AT,
    ACTION,
  ]);


  useEffect(() => {
    if (authenticationToken) {
      //
    }
  }, [authenticationToken]);

  return (
    <div className='redemption'>
      <div className='container'>
        <div className='redemption--title'>
          <Title level={3}>{t('my_activities.txt_purchase_history')}</Title>
        </div>
        <div className='redemption--block'>
          <SearchFilter
            paramSearch={paramSearch}
            setParamSearch={setParamSearch}
            setCurrentColumn={setCurrentColumn}
            currentColumn={currentColumn}
          />
          <TableComponent
            data={DATA_MOCK}
            paramSearch={paramSearch}
            setParamSearch={setParamSearch}
            currentColumn={currentColumn}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityContainer;
