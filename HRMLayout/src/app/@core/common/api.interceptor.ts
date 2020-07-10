import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment'



@Injectable()

export class ApiInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const { url } = req;

        

        req = req.clone(

            {

                url: environment.host + url

            }

        );

        console.log("url:",req)

        return next.handle(req);

    }

}