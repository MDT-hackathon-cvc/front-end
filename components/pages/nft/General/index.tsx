import React from 'react';
import { Col, Row } from 'antd';

import Info from './Info';
import Preview from './Preview';
import Question from './Question';

const General = () => {
  return (
    <div className='nft-detail-page-general'>
      <Row>
        <Col lg={10} md={12} xs={24} xl={12} className='general__preview'>
          <Preview />
        </Col>
        <Col lg={12} md={10} xs={24} xl={12} className='general__info'>
          <Info />
        </Col>
        <Col xs={24}>
          <Question />
        </Col>
      </Row>
    </div>
  );
};

export default General;
