import "bootstrap/dist/css/bootstrap.min.css";
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

export default function showNotification(title, message){
    store.addNotification({
        title: title,
        message: message,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      })}