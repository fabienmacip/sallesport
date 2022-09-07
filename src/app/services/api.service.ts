import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grants } from '../grants';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://localhost:8080/sallesportapi/backend/api/";

  constructor(
    private httpClient: HttpClient
  ) { }

  readGrantsAll(): Observable<Grants[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}grants.php`);
  }

  readGrants(id: number): Observable<Grants[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}grants.php?id=${id}`);
  }

  createGrants(grants: Grants): Observable<Grants>{
    return this.httpClient.post<Grants>(`${this.PHP_API_SERVER}grants.php`, grants);
  }

  updateGrants(grants: Grants): Observable<Grants>{
    return this.httpClient.put<Grants>(`${this.PHP_API_SERVER}grants.php`, grants);
  }

  deleteGrants(id: number){
    return this.httpClient.delete<Grants>(`${this.PHP_API_SERVER}grants.php?id=${id}`);
  }

}
