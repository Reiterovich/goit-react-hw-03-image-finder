import { Hourglass } from 'react-loader-spinner';

export const Loader = ({ loader }) => {
  return (
    <>
      <Hourglass
        visible={loader}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    </>
  );
};
