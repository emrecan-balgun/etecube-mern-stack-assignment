import { toast } from 'react-toastify';

const successLoginNotify = (message) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: 'light',
  });

const errorLoginNotify = (message) =>
  toast.error(message, {
    position: 'top-right',
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: 'light',
  });

const successRegisterNotify = (message) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: 'light',
  });

const errorRegisterNotify = (message) =>
  toast.error(message, {
    position: 'top-right',
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: 'light',
  });

const warningNotify = () =>
  toast.warning('Please fill all the fields', {
    position: 'top-right',
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: 'light',
  });

export {
  successLoginNotify,
  errorLoginNotify,
  successRegisterNotify,
  errorRegisterNotify,
  warningNotify,
};
