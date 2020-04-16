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

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();
    if (!authToken) { return next.handle(req); }
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      setHeaders: { Authorization: authToken }
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
