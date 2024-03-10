import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token:any = localStorage.getItem("token")
    
    let newReq = request.clone({
      headers:request.headers.set("Authorization", `Bearer${token}`)
    }) 
    return next.handle(newReq);
  }
}
