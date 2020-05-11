export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
    NEWCUSTOMER: "/user/customer/new",
    SEARCHCUSTOMER: "/user/customer/getByCustomerCode",
    DELETECUSTOMER: "/user/customer/delete"
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
}
