import { Rcv_message } from "./websocket/JSONmodels/rcv_message";

export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
  static LocalStorageMessage = {
    MESSAGE: Rcv_message
  };
}
