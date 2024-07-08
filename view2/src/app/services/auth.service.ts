import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { CryptoService } from './crypto.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private ssoAuthServer = environment.ssoAuthServer;
  private oauthUrl = environment.oauthUrl;
  private clientId = environment.clientId;
  private redirectUri = environment.redirectUri;
  private accessTokenKey = environment.accessTokenKey;
  private loginSuccessSubject = new Subject<void>();
  state: string | undefined;
  codeVerifier: string | undefined | null;
  constructor(
    private http: HttpClient,
    private location: Location,
    private cryptoService: CryptoService,
    private cookieService: CookieService,
    private router: Router) {
    
  }



  initiateOAuthLogin(prompt = false): void {
    this.state = this.generateRandomString(40);
    this.codeVerifier = this.generateRandomString(128);
    sessionStorage.setItem('state', this.state);
    sessionStorage.setItem('code_verifier', this.codeVerifier);
    
    const params: { [key: string]: string } = {
      client_id: this.clientId,
      redirect_uri: encodeURIComponent(this.redirectUri),
      response_type: 'code',
      scope: '',
      state: this.state,
      code_challenge: this.cryptoService.generateCodeChallenge(this.codeVerifier),
      code_challenge_method: 'S256',
      prompt: prompt ? "login" : ""
    };
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    window.location.href = `${this.ssoAuthServer+'/oauth/authorize'}?${queryString}`;
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
  }

  isLoggedIn(): boolean {
    // Check if access token exists in local storage
    // debugger
    return !!this.cookieService.get(this.accessTokenKey);
  }

  onLoginSuccess(): Observable<void> {
    return this.loginSuccessSubject.asObservable();
  }

  exchangeCodeForToken(code: string): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const body = {
      grant_type: 'authorization_code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      code: code,
      code_verifier: sessionStorage.getItem('code_verifier')
    };
    this.http.post<any>(this.ssoAuthServer+'/oauth/token', body, { headers: headers })
      .pipe(
        catchError(error => {
          // Handle error
          return throwError(error);
        })
      )
      .subscribe(
        response => {
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (1 * 60 * 60 * 1000)); 
          console.log(this.accessTokenKey, response.access_token);
          this.cookieService.set(this.accessTokenKey, response.access_token, expirationDate, '/', environment.baseurl, false, 'Strict');
          this.setUserDataInCookie(expirationDate)
          this.loginSuccessSubject.next();
          this.router.navigate(['']);
        }
      );
  }

  setUserDataInCookie(expirationDate: any) {
    const accessToken = this.cookieService.get(this.accessTokenKey);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+accessToken
    });
    this.http.get<any>(this.ssoAuthServer+'/api/user',{ headers })
    .subscribe(user_data => {
      const user_data_stingify = JSON.stringify(user_data);
      this.cookieService.set('user_data', user_data_stingify, expirationDate,  '/', environment.baseurl, false, 'Strict');
    })
  }
  
  getUserData(): Observable<any>{
    const accessToken = this.cookieService.get(this.accessTokenKey);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+accessToken
    });

    return this.http.get<any>(this.ssoAuthServer+'/api/user',{ headers })
    .pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
  logout() {
    console.log("yha hai")
    const accessToken = this.cookieService.get(this.accessTokenKey);
    this.cookieService.delete(this.accessTokenKey);
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
  
    this.http.get<any>(`${this.ssoAuthServer}/api/logmeout`, { headers })
        .pipe(
          catchError(error => {
            // Handle error
            console.log("test");
            this.cookieService.delete(this.accessTokenKey);
            this.initiateOAuthLogin(true);
            return throwError(error);
          })
        )
        .subscribe(
          response => {
            this.cookieService.delete(this.accessTokenKey);
            this.initiateOAuthLogin(true);
          }
        );
    
    
  }

}