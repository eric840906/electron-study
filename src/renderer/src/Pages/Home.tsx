import { Image } from 'antd';
import opening from '../../../../assets/images/1674093337907.png';

const Home: React.FC<{ onThemeChange: any }> = ({ onThemeChange }: any) => {
  return (
    <>
      <Image src={opening} />
    </>
  );
};
export default Home;
