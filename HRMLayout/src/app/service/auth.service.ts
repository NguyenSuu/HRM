import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Router, CanActivate } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service'


const signInEndPoint = 'authenticate'

const AUTH_TOKEN = 'AUTH_TOKEN'
const AUTH_DETAIL = 'AUTH_DETAIL'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  tokenSubject = new BehaviorSubject<string>(null);
  authDetailSubject = new BehaviorSubject<any>({});
  timeOut:any = null;
  constructor(private httpClient: HttpClient, private router: Router,
    private cookieService: CookieService) {

    const token = this.tokenFromCookie || ''

    console.log(this.tokenFromCookie)

    this.tokenSubject.next(token)

    this.authDetailSubject.next(!!token ? this.getAuthDetailFromToken(token) : {})
  }

  get authDetail$() {
    return this.authDetailSubject.asObservable();
  }

  get token$() {
    return this.tokenSubject.asObservable();
  }

  get tokenFromCookie() {
    return this.cookieService.get(AUTH_TOKEN)
  }

  get authDetailFromCookie() {
    return JSON.parse(this.cookieService.get(AUTH_DETAIL) || '{}')
  }

  goToSignInPage() {
    this.router.navigate(['/auth/login'])
  }

  getAuthDetailFromToken(token) {
    return jwt_decode(token);
  }

  signIn(credentials: Account) {
    return this.httpClient.post(signInEndPoint, credentials).pipe(
      tap(({ accessToken }: any) => {
        this.storeToken(accessToken)
        console.log("token: ",accessToken)
        this.cookieService.set(AUTH_TOKEN, accessToken) // Store JWT Token Into Cookie

        const payload = this.getAuthDetailFromToken(accessToken);

        this.cookieService.set(AUTH_DETAIL, JSON.stringify(payload)) // Store Auth Detail Into Cookie

        this.authDetailSubject.next(payload)
      })
    )
  }

  signOut() {
    this.tokenSubject.next(null)
    this.cookieService.delete(AUTH_TOKEN)
    this.goToSignInPage()
  }
  resetTime(){
    this.cookieService.set(AUTH_TOKEN,this.tokenSubject.value)

    clearTimeout(this.timeOut)

    this.timeOut = setTimeout(
      () => {
        this.signOut()

      }, 1000*60*15
    )
  }
  private storeToken(token) {
    this.tokenSubject.next(token)
    
    // Clear token after
    setTimeout(
      () => {
        this.signOut()

      }, 1000*60*15
    )
  }

  canActivate() {
    return this.token$.pipe(map(token => {
      const hasPermission = !!token;
      console.log(this.tokenFromCookie)
      console.log('token checked', token, hasPermission)

      if (hasPermission) {
        return true
      }

      this.goToSignInPage();

      return false;
    }))
  }
}
