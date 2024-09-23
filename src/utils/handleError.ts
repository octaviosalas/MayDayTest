import axios from 'axios';
import { shootErrorToast } from './toastError';

const handleError = (error: unknown, setLoad: (value: boolean) => void) => {
  setLoad(false);
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data.message)
    return shootErrorToast(error.response?.data.message)
   } else {
        console.log('Unexpected error:', error);
    }
  setLoad(false);
};

export default handleError;