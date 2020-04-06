export class user {
    firstName: string;
    lastName: string;
    customerCode: string;
    email: string;
    password: string;
    street: string;
    houseNr: number;
    zipCode: string;

    constructor(customerCode, email, password) {
        this.customerCode = customerCode;
        this.email = email;
        this.password = password;
    }
  }
