import { toast } from "react-toastify";

export const notifyFieldAdded = () => {
  toast.success("CRM Field has been added !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
export const notifyFieldRemoved = () => {
  toast.error("CRM field has been removed !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
export const notifyFieldUpdated = () => {
  toast.success("CRM Field details updated !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
