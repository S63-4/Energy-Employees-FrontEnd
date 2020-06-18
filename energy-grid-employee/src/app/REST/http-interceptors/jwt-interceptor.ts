import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}

  //ZXh0ZXJuYWw6b1dQWW05dElPaVlhMU9iYUkybU0=

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      console.log(req);
      // Get the auth token from the service.
      var authToken = this.auth.getAuthorizationToken();
      if(req.url === "https://staging.external.powerprice.marstan.net/status/getStatus"){
        authToken = "Basic ZXh0ZXJuYWw6b1dQWW05dElPaVlhMU9iYUkybU0=";
      }
      if (!authToken) { return next.handle(req); }
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        setHeaders: { Authorization: authToken }
      });

      console.log("Authorized request: " + authReq);

      // send cloned request with header to the next handler.
      return next.handle(authReq);
  }
}
