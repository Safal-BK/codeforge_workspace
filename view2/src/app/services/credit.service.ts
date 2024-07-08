import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CreditService {
  constructor(private http: HttpClient, private cookieService: CookieService, private authService: AuthService) {}

  getUserCredit(): Observable<any> {
    const user_data = JSON.parse(this.cookieService.get('user_data'))
    return this.http.get<any>(
              `${environment.link_matcher_frontend_server}/api/v1/credit/user-credit/${user_data.id}`
            ).pipe(
              catchError((error: any) => {
                // Handle error if the API call fails
                return throwError(error);
              })
            );
          
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
