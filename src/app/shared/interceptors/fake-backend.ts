import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
let api = environment.baseUrl;
// const users = require(environment.baseUrl + 'register');

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null).pipe(mergeMap(handleRoute));

    // check route and call resp method
    function handleRoute() {
      switch (true) {
        case url.endsWith('/register') && method === 'POST':
          return register();
        default:
          return next.handle(request);
      }
    }

    // to check if user exist and set local storage for new user
    function register() {
      console.log('inside fake backend');
      const user = body;
      console.log(user);
      if (users.find((x) => x.email === user.email)) {
        return error('Username "' + user.email + '" is already taken');
      }

      user.id = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));

      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }
  }
}
