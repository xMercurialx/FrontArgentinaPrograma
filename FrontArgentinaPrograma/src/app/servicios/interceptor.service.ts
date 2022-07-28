import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private tokenService: TokenService){}

  interceptor(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      let intReq = req;
      const token = this.tokenService.getToken();
      if(token != null){
          intReq = req.clone({
              headers: req.headers.set('Authorization','Bearer'+token)
          });
      }
      return next.handle(intReq);
  }}
