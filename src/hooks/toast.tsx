import { ReactNode } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

type ToastType = 'error' | 'success';

const Icon: Record<ToastType, ReactNode> = {
  error: <AiFillCloseCircle color="#e63c3c" size={32} />,
  success: <FaCheckCircle color="#1E9164" size={32} />,
};

export const useToast = () => {
  const showToast = (message: string, type: ToastType) => {
    toast(message, { type, icon: () => Icon[type] });
  };

  return { showToast };
};
