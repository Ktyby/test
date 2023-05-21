import axios from 'axios';

const getPictureUrl = async () => {
  const response = await axios.get('https://dog.ceo/api/breeds/image/random/3');

  return response?.data?.message;
};

export default getPictureUrl;
