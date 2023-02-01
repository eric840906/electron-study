import { Button, Image } from 'antd';
import { useEffect } from 'react';
import opening from '../../../../assets/images/1674093337907.png';
import useAdvertiser from '../hooks/useAdvertiser';

const Home: React.FC<{ onThemeChange: any }> = ({ onThemeChange }: any) => {
  const { getList, advertiser } = useAdvertiser()
  useEffect(() => {
    console.log(advertiser)
  }, [advertiser])
  return (
    <>
      <Button onClick={getList}>test list</Button>
    </>
  );
};
export default Home;
