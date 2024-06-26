import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import UsersReducer from "./Users/reducer";
import MappingReducer from "./Mapping/reducer";
import AddClientReducer from "./AddClient/reducer";
import InvoiceReducer from "./Invoice/reducer";
import PaymentReducer from "./Payment/reducer";
import EventReducer from "./Event/reducer";
import BranchDropdownsReducer from "./BranchDropdown/reducer";
import TaskReducer from "./Task/reducer";
import PendingTasksReducer from "./PendingTasks/reducer";

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
  AddClient: AddClientReducer,
  Invoice: InvoiceReducer,
  Payment: PaymentReducer,
  Event: EventReducer,
  BranchDropdowns: BranchDropdownsReducer,
  Task: TaskReducer,
  PendingTasks: PendingTasksReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
