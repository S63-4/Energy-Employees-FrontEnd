export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
    NEWCUSTOMER: "/customer/new"
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
}
