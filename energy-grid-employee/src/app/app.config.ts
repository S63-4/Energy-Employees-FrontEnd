

export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

 // static WebSocketBaseUrl = "http://localhost:9060/";
  static WebSocketBaseUrl = "http://10.93.1.110:9060/";  
  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
    AllCUSTOMERS: "/user/customer/profiles",
    NEWCUSTOMER: "/user/customer/new",
    SEARCHCUSTOMER: "/user/customer/getByCustomerCode",
    DELETECUSTOMER: "/user/customer/delete"
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
/*  static LocalStorageMessage = {
    MESSAGE: Rcv_message
  };*/
}
