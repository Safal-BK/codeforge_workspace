import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestCreditService {

  constructor(private http:HttpClient,
    private _http:AuthService ) {
      this.getcredits();
     }

  // user_id: any;
  // user_name: any;


  API_URL = environment.link_matcher_frontend_server+'/api/v1/credit/cred-req'

  
  
  
  requestforCredit(body:any){
    return new Observable((observer) => {
      this._http.getUserData().subscribe(
        (userData: any) => {
          const user_id = userData.id;
          body['user_id'] = user_id;
          this.http.post(`${this.API_URL}`, body).subscribe(
            (data: any) => {
              observer.next(data);
              observer.complete();
            },
            (error: any) => {
              observer.error(error);
            }
          );
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });

  }



  getcredits(): Observable<any> {
    return new Observable((observer) => {
      this._http.getUserData().subscribe(
        (userData: any) => {
          const user_id = userData.id;
          this.http.get(environment.link_matcher_frontend_server+'/api/v1/credit/user-credit/' + user_id).subscribe(
            (data: any) => {
              observer.next(data);
              observer.complete();
            },
            (error: any) => {
              observer.error(error);
            }
          );
        },
        (error: any) => {
          observer.error(error);
        }
      );
    });
  }


}
