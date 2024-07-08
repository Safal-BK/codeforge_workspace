import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCandidatesService {

  constructor(private http:HttpClient,
    private _http:AuthService ) { }

  // user_id: any;
  // user_name: any;


  API_URL = 'http://20.197.44.191:18003/search-candidates'

  
  
  
  searchCandidates(body:any){
    return new Observable((observer) => {
      this._http.getUserData().subscribe(
        (userData: any) => {
          const user_id = userData.id;
          const user_name = userData.name;
          body['user_id'] = user_id;
          body['user_name'] = user_name;
          body['user_name'] = user_name;
          body['max_bing_search_res'] = 500;
          body['max_scrapin_res'] = body.max_shortlist;
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
}

