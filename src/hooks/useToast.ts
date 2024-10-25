import { toast, ToastOptions } from "react-toastify";

export default function useToast() {
  const showToast = (message: string, options: ToastOptions) => {
    toast(message, { ...options, hideProgressBar: true });
  };

  return { showToast };
}
