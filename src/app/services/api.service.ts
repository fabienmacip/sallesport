import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partenaire } from '../interfaces/partenaire';
import { Grants } from '../grants';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://localhost:8080/sallesportapi/backend/api/";

  constructor(
    private httpClient: HttpClient
  ) { }



  // * * * * *  PARTENAIRES  * * * * *

  readPartenaireAll(): Observable<Partenaire[]>{
    return this.httpClient.get<Partenaire[]>(`${this.PHP_API_SERVER}partenaire.php`);
  }

  readPartenaire(id: number): Observable<Partenaire[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}partenaire.php?id=${id}`);
  }

  createPartenaire(partenaire: Partenaire): Observable<Partenaire>{
    return this.httpClient.post<Partenaire>(`${this.PHP_API_SERVER}partenaire.php`, partenaire);
  }

  updatePartenaire(id: number, partenaire: Partenaire): Observable<Partenaire>{
    return this.httpClient.put<Partenaire>(`${this.PHP_API_SERVER}partenaire.php?id=${id}`, partenaire);
  }

  deletePartenaire(id: number){
    return this.httpClient.delete<Partenaire>(`${this.PHP_API_SERVER}partenaire.php?id=${id}`);
  }




  // * * * * *  GRANTS  * * * * *

  readGrantsAll(): Observable<Grants[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}grants.php`);
  }

  readGrants(id: number): Observable<Grants[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}grants.php?id=${id}`);
  }

  createGrants(grants: Grants): Observable<Grants>{
    return this.httpClient.post<Grants>(`${this.PHP_API_SERVER}grants.php`, grants);
  }

  updateGrants(id: number, grants: Grants): Observable<Grants>{
    return this.httpClient.put<Grants>(`${this.PHP_API_SERVER}grants.php?id=${id}`, grants);
  }

  deleteGrants(id: number){
    return this.httpClient.delete<Grants>(`${this.PHP_API_SERVER}grants.php?id=${id}`);
  }

}
