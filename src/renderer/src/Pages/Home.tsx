import { Button } from 'antd';
import constant from 'main/constants';

const Home: React.FC<{ onThemeChange: any }> = ({ onThemeChange }: any) => {
  return (
    <>
      <Button onClick={() => onThemeChange()}>test button</Button>
    </>
  );
};
export default Home;
