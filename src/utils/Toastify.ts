import { toast } from "react-toastify";

export const successNotification = async (message: string) => {
  await toast.success(message, {
    position: "top-center",
    toastId: 5483,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};


export const errorNotification = async (message: string) => {
  await toast.error(message, {
    position: "top-center",
    toastId: 5483,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
};

