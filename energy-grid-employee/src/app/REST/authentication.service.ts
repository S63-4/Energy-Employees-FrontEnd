import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, of, BehaviorSubject, from } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { AppConfig } from "../app.config";
import { CookieService } from "ngx-cookie-service";
import { user } from "../models/user";
import { customer } from "../models/customer";
@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private http: HttpClient, private cookieService: CookieService) {
    var token = this.cookieService.get("authorization-key");
    this.isLoggedIn.next(!!token);
  }

  /** GET login codes from the server */
  getLogin(clientnr: string, password: string) {
    const URL = `${AppConfig.ApiBaseURL}${AppConfig.ApiUrls.LOGIN}`;
    this.http
      .post<HttpResponse<any>>(
        URL,
        { username: clientnr, password },
        { observe: "response" }
      )
      .subscribe(
        (response) => {
          let token = response.headers.get("Authorization");
          if (token) {
            // localStorage.setItem(AppConfig.LocalStorageKeys.TOKEN, token);
            this.cookieService.set("authorization-key", token);
          }
          this.isLoggedIn.next(!!token);
        },
        (error) => {
          alert("Email and Password combination is incorrect!");
        }
      );
  }

  // * Check if logged in */
  public loggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  // * Get authorization token */
  public getAuthorizationToken(): string {
    // return localStorage.getItem(AppConfig.LocalStorageKeys.TOKEN);
    return this.cookieService.get("authorization-key");
  }

  // * Logout */
  public logOut(): void {
    this.isLoggedIn.next(false);
  }

  /** POST: add a new user to the server */
  postRegister(user: user): Observable<any> {
    const serverURL = AppConfig.ApiBaseURL + "UserController/registration";
    return this.http.post<user>(serverURL, user).pipe(
      map((result) => (result as unknown) as string),
      catchError(this.handleError<any>("postRegistert"))
    );
  }

  postNewCustomer(customer: customer): Observable<any> {
    const serverURL = AppConfig.ApiBaseURL + AppConfig.ApiUrls.NEWCUSTOMER;
    return this.http.post<customer>(serverURL, customer).pipe(
      map((result) => (result as unknown) as string),
      catchError(this.handleError<any>("postNewCustomer"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // Let the user know how to register properly
      console.log(error);
      alert(error.error.text);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
