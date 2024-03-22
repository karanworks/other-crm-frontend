import { toast } from "react-toastify";

export const notifyAddedUser = () => {
  toast.success("User has been added !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
export const notifyDeletedUser = () => {
  toast.error("User has been removed !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
export const notifyUpdatedUser = () => {
  toast.success("User details updated !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
