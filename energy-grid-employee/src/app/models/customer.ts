export class customer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  mobileNumber: string;
  street: string;
  houseNumber: number;
  zipCode: string;
  city: string;
  customerCode: string;

  constructor(firstName, lastName, email, phoneNumber, mobileNumber, street, houseNumber, zipcode, city, customerCode) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.mobileNumber = mobileNumber;
    this.street = street;
    this.houseNumber = houseNumber;
    this.zipCode = zipcode;
    this.city = city;
    this.customerCode = customerCode;
  }
}
