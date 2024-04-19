import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import UsersReducer from "./Users/reducer";
import CampaignReducer from "./Campaigns/reducer";
import CRMConfigurationReducer from "./CRMConfiguration/reducer";
import MappingReducer from "./Mapping/reducer";
import DispositionReducer from "./Disposition/reducer";
import MonitoringReducer from "./UserStatus/reducer";

// SEPARATER
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Login: LoginReducer,
  Account: AccountReducer,
  Users: UsersReducer,
  Mapping: MappingReducer,
  Campaigns: CampaignReducer,
  CRMConfiguration: CRMConfigurationReducer,
  Disposition: DispositionReducer,
  Monitoring: MonitoringReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
