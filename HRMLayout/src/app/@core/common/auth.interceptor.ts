import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { isNull } from 'util';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.tokenSubject.value
        console.log(`token:${token}`)
        if (token) {
            req = req.clone(
                {
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        
        if (!environment.production) console.log(req)

        return next.handle(req).pipe(
            map(e => {
                if (!environment.production){ console.log(e)}
                return e
                
            }),
            catchError(err => {
                if (err.status == 401) {
                    this.authService.goToSignInPage()
                }
                if (!environment.production) console.log(err.status)
                return throwError(err)
            })
        );
    }
}