export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
    NEWCUSTOMER: "/user/customer/new",
    SEARCHCUSTOMER: "/user/customer/getByCustomerCode"
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
}
