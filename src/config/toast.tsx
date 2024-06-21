import { Slide, ToastContainer as ToastContainerBase } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ToastContainer = () => (
  <ToastContainerBase
    hideProgressBar
    stacked
    bodyClassName="text-black"
    position="bottom-right"
    transition={Slide}
  />
);
