import React from 'react';

import Header from './Header';
import General from './General';
import Footer from './Footer';

const Detail = () => {
  return (
    <div className='nft-detail-page'>
      <Header />
      <div className='nft-detail-page__wrapper'>
        <div className='container'>
          <General />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Detail;
