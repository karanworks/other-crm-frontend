import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Default Login Method
// export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// Login Method
export const postLogin = (data) => {
  return api.create(url.POST_LOGIN, data);
};
// *****************************************************************
// *************************** USERS *******************************
// *****************************************************************
export const getUsers = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/users`);
};

export const createUser = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/user/register`, data);
};
export const updateUser = (userId, data, status) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/user/${userId}/edit`, {
    ...data,
    status,
  });
};

export const searchUsers = (searchQuery) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/users/${searchQuery}`);
};

// now user gets removed from update api
// export const removeUser = (userId) => {
//   return api.delete(
//     `${process.env.REACT_APP_SERVER_URL}/user/${userId}/delete`
//   );
// };

// *****************************************************************
// **************************** MAPPING ****************************
// *****************************************************************

export const getMenus = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/mapping`);
};
export const getMenusByRole = (roleId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`);
};
export const getRoles = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/roles`);
};
export const changePermission = ({ menuId, subMenuId, roleId }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`,
    { menuId, subMenuId, roleId }
  );
};

export const createRole = (values) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/role/create`, values);
};

export const updateRole = (roleId, values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/edit`,
    values
  );
};

export const removeRole = (roleId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/delete`
  );
};

// *****************************************************************
// ************************* MONITORING ****************************
// *****************************************************************

export const monitoringGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/monitoring`);
};

export const getMonitoringData = (selectedCampaigns) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/monitoring`, {
    campaigns: selectedCampaigns,
  });
};

// *****************************************************************
// ****************** UPDATE SESSION (ACTIVE TIME) *****************
// *****************************************************************
export const updateSession = () => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/update-session`);
};

// *****************************************************************
// ************************* LOGIN HISTORY ************************
// *****************************************************************

export const loginHistoryGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/login-activity`);
};
export const loginHistoryData = ({ campaignIds: campaigns }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/login-activity`,
    campaigns
  );
};

// *****************************************************************
// *********************** IVR CAMPAIGNS ***************************
// *****************************************************************
export const getIVRCampaigns = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/ivr-campaign`);
};

export const createIVRCampaign = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/create`,
    data
  );
};
export const removeIVRCampaign = (ivrCampaignId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/delete`
  );
};

export const updateIVRCampaign = (ivrCampaignId, data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/edit`,
    data
  );
};

// *****************************************************************
// ************************ IVR NUMBER *****************************
// *****************************************************************

export const getNumbers = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/number`);
};
export const createNumber = ({ name, number, department, ivrCampaignId }) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/number/create`, {
    name,
    number,
    department,
    ivrCampaignId,
  });
};
export const updateNumber = ({
  ivrCampaignId,
  numberId,
  name,
  number,
  department,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/number/${numberId}/edit`,
    {
      name,
      number,
      department,
    }
  );
};
export const removeNumber = ({ ivrCampaignId, numberId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/number/${numberId}/delete`
  );
};

// *****************************************************************
// ************************ IVR SPEECH *****************************
// *****************************************************************

export const getSpeeches = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/speech`);
};
export const createSpeech = ({
  title,
  speechText,
  speechAudio,
  speechAudioName,
  ivrCampaignId,
}) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/speech/create`, {
    title,
    speechText,
    speechAudio,
    speechAudioName,
    ivrCampaignId,
  });
};
export const updateSpeech = ({
  ivrCampaignId,
  speechId,
  title,
  speechText,
  speechAudio,
  speechAudioName,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/speech/${speechId}/edit`,
    {
      title,
      speechText,
      speechAudio,
      speechAudioName,
    }
  );
};
export const removeSpeech = ({ ivrCampaignId, speechId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-campaign/${ivrCampaignId}/speech/${speechId}/delete`
  );
};

// *****************************************************************
// *************************** DESIGN ******************************
// *****************************************************************

export const getDesign = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/ivr-design`);
};
export const createDesign = (
  audioText,
  ivrCampaignId,
  key,
  parentId,
  number
) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/ivr-design/create`, {
    audioText,
    ivrCampaignId,
    key,
    parentId,
    number,
  });
};
export const updateDesign = ({ designId, audioText }) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/ivr-design/${designId}/edit`,
    {
      audioText,
    }
  );
};

export const removeDesign = ({ designId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/ivr-design/${designId}/delete`
  );
};

// *****************************************************************
// ***************************** CLIENT ****************************
// *****************************************************************
export const getClients = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/clients`);
};

export const createClient = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/client/create`, data);
};

export const updateClient = (clientId, data, status) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/client/${clientId}/edit`,
    {
      ...data,
      status,
    }
  );
};

export const searchClient = (searchQuery) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/clients/${searchQuery}`);
};

// *****************************************************************
// ***************************** TASKS *****************************
// *****************************************************************
export const getTasks = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/tasks`);
};

export const createTask = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/task/create`, data);
};

export const updateTask = (taskId, data, status) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/task/${taskId}/edit`, {
    ...data,
    status,
  });
};

export const searchTask = (searchQuery) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/tasks/${searchQuery}`);
};

// *****************************************************************
// ************************ PROJECT DROPDOWN ***********************
// *****************************************************************

export const createDropdown = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/dropdown/create`,
    data
  );
};

// *****************************************************************
// ***************************** INVOICE ***************************
// *****************************************************************
export const getInvoices = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/invoices`);
};

export const searchInvoices = (searchQuery) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/invoices/${searchQuery}`);
};

export const createInvoice = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/invoice/create`, data);
};

export const updateInvoice = (invoiceId, data, status) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/edit`,
    {
      ...data,
      status,
    }
  );
};

export const removeInvoice = (invoiceId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/delete`
  );
};
// *****************************************************************
// ***************************** PAYMENT ***************************
// *****************************************************************

export const getPayments = (invoiceId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/${invoiceId}/payments`);
};

export const createPayment = ({
  listInvoiceId: invoiceId,
  paymentAmount,
  paymentDate,
}) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/payment/create`,
    {
      paymentAmount,
      paymentDate,
    }
  );
};

export const updatePayment = ({
  paymentAmount,
  paymentDate,
  listInvoiceId: invoiceId,
  listPaymentId: paymentId,
  status,
}) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/payment/${paymentId}/edit`,
    {
      paymentAmount,
      paymentDate,
      status,
    }
  );
};

export const removePayment = ({ invoiceId, paymentId }) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/invoice/${invoiceId}/payment/${paymentId}/delete`
  );
};

// *****************************************************************
// ***************************** EVENTS ****************************
// *****************************************************************

export const getAllEvents = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/events`);
};
export const getEvents = (taskId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/${taskId}/events`);
};

export const createEvent = (event) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/event/create`, {
    event,
  });
};

export const updateEvent = ({ eventName, eventDate, eventId, status }) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/event/${eventId}/edit`,
    {
      eventName,
      eventDate,
      status,
    }
  );
};

export const removeEvent = (eventId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/event/${eventId}/delete`
  );
};

// *****************************************************************
// ************************ BRANCH DROPDOWN ***********************
// *****************************************************************

export const getBranchDropdowns = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/branch-dropdown`);
};
export const createBranchDropdown = (branchName) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/branch-dropdown/create`,
    { branchName }
  );
};

// *****************************************************************
// ************************** PENDING TASKS ************************
// *****************************************************************

export const getPendingTasks = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/pending-tasks`);
};

export const searchPendingTask = (searchQuery) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/pending-tasks/${searchQuery}`
  );
};

// *****************************************************************
// ************************ COMPLETED TASKS ************************
// *****************************************************************

export const getCompletedTasks = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/completed-tasks`);
};

export const searchCompletedTask = (searchQuery) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/completed-tasks/${searchQuery}`
  );
};

// *****************************************************************
// ********************* CLIENT ALREADY EXIST **********************
// *****************************************************************

export const clientAlreadyExist = (mobileNo) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/client-already-exist`,
    { mobileNo }
  );
};

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);
