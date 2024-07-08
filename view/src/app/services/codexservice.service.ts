import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodexserviceService {

  constructor(private http: HttpClient) { }
  getall() {
    return this.http.get("https://dummyjson.com/products/1");
  }
  public reqnewsession(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/newsession", body);
  }
  public reqallsessions(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/allsession", body);
  }
  public reqsession(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/getsession", body);
  }
  public reqsavesession(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/savesession", body);
  }
  public reqdeletesession(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/deletesession", body);
  }
  public reqistokenexpired(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/istokenexpired", body);
  }
  public reqdeletetoken(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/deletetoken", body);
  }
  public reqcompilecode(body: any) {
    return this.http.post(" http://20.204.25.49:8071/compile", body);
  }
  public reqinstantsession(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/instantsession", body);
  }
  public reqallproblems(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/allproblems", body);
  }
  public reqviewproblem(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/viewproblem", body);
  }
  public requpdateproblem(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/updateproblem", body);
  }
  public reqnewproblem(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/newproblem", body);
  }
  public reqdeleteproblem(body: any) {
    return this.http.post("http://127.0.0.1:8070/api/delproblem", body);
  }
}
