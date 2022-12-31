import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./overrideReactToastify.css"
import "./toast.css"
import errorImage from "./red_cross_circle_filled.png";
import successImage from "./green_check_small_filled.png";

let errorToast = (title, description) => toast.dark(
    ({closeToast, toastProps}) =>  <div className="error-toast">
         <img src={errorImage} className="error-image"/>
         <div className="text-content">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
         </div>
     </div>
 );


let successToast = (title, description) => toast.dark(
    ({closeToast, toastProps}) =>  <div className="error-toast">
         <img src={successImage} className="error-image"/>
         <div className="text-content">
            <p className="title">{title}</p>
            <p className="description">{description}</p>
         </div>
     </div>
 );

export { ToastContainer, errorToast, successToast }