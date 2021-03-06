export class AppConfig {
  // static WebSocketBaseUrl = "http://localhost:9060/";
  static WebSocketBaseUrl = "http://34.105.162.130:9060/";

  // static ApiBaseURL = "http://localhost:8762";
  static ApiBaseURL = "http://35.189.86.8";
  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
    AllCUSTOMERS: "/user/customer/profiles",
    NEWCUSTOMER: "/user/customer/new",
    SEARCHCUSTOMER: "/user/customer/getByCustomerCode",
    DELETECUSTOMER: "/user/customer/delete",
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
  /*  static LocalStorageMessage = {
    MESSAGE: Rcv_message
  };*/
}
