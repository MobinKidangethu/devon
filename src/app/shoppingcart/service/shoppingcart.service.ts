import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../../shared/http.service';
@Injectable({
  providedIn: 'root'
})

export class ShoppingcartService {

  constructor(private http: HttpClient, private httpservice : HttpService) { }

  getServers(): Observable<any> {
    return this.httpservice.get('api/servers');
  }
  getFilteredServers(filteredValue): Observable<any> {
      console.log("filteredValue", filteredValue);
      return this.httpservice.get('api/servers?'+filteredValue);
  }
}
