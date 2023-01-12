import { toast } from "react-toastify";

const successLoginNotify = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const errorLoginNotify = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const successRegisterNotify = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const errorRegisterNotify = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const warningNotify = () =>
  toast.warning("Please fill all the fields", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const errorDataNotify = () =>
  toast.error("There was an error while receiving data!", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const successUpdateNotify = () =>
  toast.success("Updated successfully!", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const successDeleteNotify = () =>
  toast.success("Deleted successfully!", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const successCreateNotify = () =>
  toast.success("Created successfully!", {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    pauseOnHover: false,
    theme: "light",
  });

const successLogoutNotify = () =>
  toast.success(
    "You have logged out successfully, you are being redirected...",
    {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      pauseOnHover: false,
      theme: "light",
    }
  );

export {
  successLoginNotify,
  errorLoginNotify,
  successRegisterNotify,
  errorRegisterNotify,
  warningNotify,
  errorDataNotify,
  successUpdateNotify,
  successDeleteNotify,
  successCreateNotify,
  successLogoutNotify,
};
