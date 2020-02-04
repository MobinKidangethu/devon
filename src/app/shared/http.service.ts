import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
const SERVER_URL = environment.serverUrl;
@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }
  get(endpoint) {
      return this.http.get(`${SERVER_URL}/${endpoint}`);
    }
}
