
import { useAppSelector } from '../../redux/hook';
import AllSmmaries from './AllSummaries';
import MySmmaries from './MySummaries';

const Summaries = () => {
  const userInfo = useAppSelector(state => state.auth);
  console.log(userInfo)

  return (
    <>
      {
        (userInfo.role === 'admin' || userInfo.role === 'reviewer' || userInfo.role === 'editor') ? <AllSmmaries /> : <MySmmaries />
      }
    </>
  );
};

export default Summaries
