import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class CorsIntereptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            tap(
                (res :any) => {
                    if(res.status == 201)  {
                        // Alert notification
                        console.log(res.status)
                    }
    
                    return res
                }
            ),
            catchError((err) => {
                if(err.status == 400)  {
                    // Alert notification
                    console.log('yeu cau khong hop le')
                }

                return throwError(err)
            })
         
        )
    }
}