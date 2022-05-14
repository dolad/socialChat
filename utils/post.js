import requestServices from './request';

export const fetchPosts = async () => {
  try {
    const response = await requestServices.get(
      'https://dummyapi.io/data/v1/post?limit=20',
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
