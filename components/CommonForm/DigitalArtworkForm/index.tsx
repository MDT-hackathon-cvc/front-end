import { useGetListNFTs } from '@components//pages/nft/hooks';
import { Col, Row } from 'antd';
import { renderURLs } from 'constants/routes';
import Link from 'next/link';
import NftTopImage2 from 'public/images/Rectangle_727.png';
import NftTopImage1 from 'public/images/Rectangle_729.png';
import Usdt from 'public/svg/ustd_token.svg';
import { useRef } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

const DigitalArtworkForm = ({ data }: any) => {
  const timeRef = useRef<any>(null);
  // const { data: dataNft } = useGetListNFTs();
  const addSeconds = (numOfHours: number, date: Date) => {
    date.setTime(date.getTime() + numOfHours * 1000);
    return date;
  };
  const onComplete = () => {

  };

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    // Render a countdown
    return (
      <div className='countdown-form'>
        <p className='countdown-item'>{days}d</p>
        <p className='countdown-item'>{zeroPad(hours)}h</p>
        <p className='countdown-item'>{zeroPad(minutes)}m</p>
        <p className='countdown-item'>{zeroPad(seconds)}s</p>
      </div>
    );
  };

  const CommonDigital = ({ digitalVal, key }: any) => {

    return (
      <Col xs={24} md={8} lg={6} key={key}>
        <Link href={digitalVal?.nfts ? renderURLs.NFT_DETAIL(digitalVal?.nfts?._id) : renderURLs.NFT_DETAIL(digitalVal?._id)}>
          <a>
            <div className='digitalArtwork-content'>
              <div className='digitalImg'>
                <img src={digitalVal?.ipfsImage || digitalVal?.nfts?.ipfsImage} alt='' />
              </div>
              <div className='digitalArtwork-info'>
                <div className='highest-bid'>
                  <img className='icon' src={Usdt} alt="" />
                  <span>Highest Bid 1/1</span>
                </div>
                <div className='content'>
                  <p className='title'>{digitalVal?.name}</p>
                  <div className='price'>
                    <span>{digitalVal?.price || 0}</span>
                    <span className='price-item'>{digitalVal?.priceSell || 0}</span>
                  </div>
                </div>
                {/* <Countdown
                  date={addSeconds(5, new Date())}
                  renderer={renderer}
                  onComplete={onComplete}
                  ref={timeRef}
                /> */}
              </div>
            </div>
          </a>
        </Link>
      </Col>
    )
  }
  return (
    <div className='digitalArtwork-card'>
      <Row gutter={24}>
        {data?.map((val: any, index: number) => (
          <CommonDigital digitalVal={val} key={index} />
        ))}
      </Row>
    </div>
  )
}

export default DigitalArtworkForm;