import axios from 'axios';
const requestServices = () => {
  const configOption = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'app-id': '627f19bed866853dad97bfb5',
    },
  };

  let axiosInstance = axios.create(configOption);
  return axiosInstance;
};

export default requestServices();
