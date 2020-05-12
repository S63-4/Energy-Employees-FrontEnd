export class AppConfig {
  static ApiBaseURL = "http://localhost:8762";

  static ApiUrls = {
    LOGIN: "/login",
    CHANGEPASS: "/user/user/changepass",
    AllCUSTOMERS: "/user/customer/profiles",
    NEWCUSTOMER: "/user/customer/new",
    //AllCUSTOMERS: "/user/customer/profiles",
    SEARCHCUSTOMER: "/user/customer/getByCustomerCode",
    DELETECUSTOMER: "/user/customer/delete"
  };
  static LocalStorageKeys = {
    TOKEN: "token",
  };
}
