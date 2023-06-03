import React from 'react';
import { Col, Row } from 'antd';

import Info from './Info';
import Preview from './Preview';

const General = () => {
  return (
    <div className='nft-detail-page-general'>
      <Row>
        <Col lg={10} md={12} xs={24} xl={8} className='general__preview'>
          <Preview />
        </Col>
        <Col lg={12} md={10} xs={24} xl={15} className='general__info'>
          <Info />
        </Col>
      </Row>
    </div>
  );
};

export default General;
