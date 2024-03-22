import { toast } from "react-toastify";

export const notifyAddedCampaign = () => {
  toast.success("Campaign has been added !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
export const notifyDeletedCampaign = () => {
  toast.error("Campaign has been removed !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
export const notifyUpdatedCampaign = () => {
  toast.success("Campaign details updated !", {
    position: "bottom-center",
    autoClose: 3000,
    theme: "colored",
  });
};
