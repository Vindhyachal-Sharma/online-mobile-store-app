import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public search=new BehaviorSubject<string>("");


  private API_BASE_URL: string = 'http://localhost:8092';
  constructor(private http: HttpClient) { }

  post(uri: string, payload: any) {
    return this.http.post(this.API_BASE_URL + uri, payload);
  }
  put(uri: string, payload: any) {
    return this.http.put(this.API_BASE_URL + uri, payload);
  }
  get(uri: string) {
    return this.http.get(this.API_BASE_URL + uri);
  }
  delete(uri: string) {
    return this.http.delete(this.API_BASE_URL + uri);
  }
  postAuth(uri: string, payload: any) {
    const headers = this.getHeader();
    return this.http.post(this.API_BASE_URL + uri, payload,  {headers});
  }
  getAuth(uri: string) {

    // return this.http.get(apiUrl, { headers: headers })
    const headers = this.getHeader();
    return this.http.get(this.API_BASE_URL + uri,  {headers});
  }
  deleteAuth(uri: string) {
    const headers = this.getHeader();
    return this.http.delete(this.API_BASE_URL + uri, {headers});
  }

  getHeader():HttpHeaders {
    const token = localStorage.getItem('TOKEN');
    const headers = new HttpHeaders({
      'Authorization':  token || '',
    });
    return  headers;
  }


 public getAuthorizationHeader():HttpHeaders{
  // const token=localStorage.getItem('TOKEN');
  // const headers =new HttpHeaders().set('Authorization',''+token);
  // return headers

  const token = localStorage.getItem('TOKEN');
  console.log( token)
    const headers = new HttpHeaders().set('Authorization',''+token)
    return  headers;
}
}
