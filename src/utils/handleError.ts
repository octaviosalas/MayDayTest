import axios from 'axios';
import { shootErrorToast } from './toastError';

const handleError = (error: unknown, setLoad: (value: boolean) => void) => {
  setLoad(false);
  if (axios.isAxiosError(error)) {
    setLoad(false);
    return shootErrorToast(error.response?.data.message)
   }
};

export default handleError;