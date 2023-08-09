import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const alertOptions = {
  position: "top-center",
  autoClose: 5000,
};

export function alert(text, type) {
  if (type === "success") {
    toast.success(text, alertOptions);
  } else if (type === "warning") {
    toast.warning(text, alertOptions);
  } else {
    toast.error(text, alertOptions);
  }
}
