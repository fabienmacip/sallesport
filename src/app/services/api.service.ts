import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../interfaces/admin';
import { Partenaire } from '../interfaces/partenaire';
import { Structure } from '../interfaces/structure';
import { Grants } from '../interfaces/grants';
import { Mail } from '../interfaces/mail';
import { Observable } from 'rxjs';
/* import { Subject } from 'rxjs'; */
import { HttpHeaders } from '@angular/common/http';
/* import { user } from '@angular/fire/auth'; */


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  PHP_API_SERVER = "http://localhost:8080/sallesportapi/backend/api/";

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(
    private httpClient: HttpClient
  ) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Authorization', 'Basic ');
  }

  // * * * * *  PARTENAIRES  * * * * *

  readPartenaireAll(): Observable<Partenaire[]>{
    return this.httpClient.get<Partenaire[]>(`${this.PHP_API_SERVER}partenaire.php`);
  }

  readPartenaire(id: number): Observable<Partenaire[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}partenaire.php?id=${id}`);
  }

  createPartenaire(partenaire: Partenaire, currentPartenairePhotoFile: any = null): Observable<Partenaire>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    // Si Photo
/*     if(currentPartenairePhotoFile){
      let fileName: string = '';
      fileName = currentPartenairePhotoFile.name;
      const formData = new FormData();
      formData.append("thumbnail", currentPartenairePhotoFile);
      const upload$ = this.httpClient.post("assets/partenaires", formData);
      upload$.subscribe();
    } */
    // Fin Photo

    return this.httpClient.post<Partenaire>(`${this.PHP_API_SERVER}partenaire.php`, partenaire, { headers : headers, responseType: "json" });
  }

  updatePartenaire(id: number, partenaire: Partenaire): Observable<Partenaire>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    return this.httpClient.put<Partenaire>(`${this.PHP_API_SERVER}partenaire.php/${id}`, partenaire, { headers : headers, responseType: "json" });
  }

  updatePartenaireActif(id: string, actif: number): Observable<Partenaire>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const datas = {
      id: id,
      actif: actif,
      onlyone: true
    };

    return this.httpClient.put<any>(`${this.PHP_API_SERVER}partenaire.php/${id}`, datas, { headers : headers, responseType: "json" });
  }

  updatePartenairePwd(id: string, pwd: string): Observable<Partenaire>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const datas = {
      id: id,
      onlyone: true,
      pwd: pwd
    };
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}partenaire.php/${id}`, datas, { headers : headers, responseType: "json" });
  }

  deletePartenaire(id: number){
    return this.httpClient.delete<Partenaire>(`${this.PHP_API_SERVER}partenaire.php?id=${id}`);
  }

  // * * * * *  STRUCTURES  * * * * *

  readStructureAll(): Observable<Structure[]>{
    return this.httpClient.get<Structure[]>(`${this.PHP_API_SERVER}structure.php`);
  }

  readStructure(id: number): Observable<Structure[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}structure.php?id=${id}`);
  }

  readStructuresOfPartenaire(id: number): Observable<Structure[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}structure.php?partenaireId=${id}`);
  }

  readLastStructureOfPartenaire(id: number): Observable<Structure[]>{
    return this.httpClient.get<Grants[]>(`${this.PHP_API_SERVER}structure.php?partenaireId=${id}&last=yes`);
  }

  createStructure(structure: Structure): Observable<Structure>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.httpClient.post<Structure>(`${this.PHP_API_SERVER}structure.php`, structure, { headers : headers, responseType: "json" });
  }

  updateStructure(id: number, structure: Structure): Observable<Structure>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);

    return this.httpClient.put<Structure>(`${this.PHP_API_SERVER}structure.php/${id}`, structure, { headers : headers, responseType: "json" });
  }

  updateStructureActif(id: string, actif: number): Observable<Structure>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const datas = {
      id: id,
      actif: actif,
      onlyone: true
    };

    return this.httpClient.put<any>(`${this.PHP_API_SERVER}structure.php/${id}`, datas, { headers : headers, responseType: "json" });
  }

  turnOnStructureActifAndDeleteMailLink(structureId: string, mailId: number){
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const datas = {
      id: structureId,
      actif: 1,
      onlyone: true,
      mailId: mailId
    };
    let id = structureId;

    return this.httpClient.put<any>(`${this.PHP_API_SERVER}structure.php/${id}`, datas, { headers : headers, responseType: "json" });
  }

  deleteStructure(id: number){
    return this.httpClient.delete<Structure>(`${this.PHP_API_SERVER}structure.php?id=${id}`);
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

  updateOneGrant(id: number, grant: string, actif: number): Observable<Grants>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const datas = {
      id: id,
      grant: grant,
      actif: actif,
    };
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}grants.php?id=${id}`, datas, { headers : headers, responseType: "json" });
  }

  updateGrants(id: number, grants: Grants): Observable<Grants>{
    return this.httpClient.put<Grants>(`${this.PHP_API_SERVER}grants.php?id=${id}`, grants);
  }

  deleteGrants(id: number){
    return this.httpClient.delete<Grants>(`${this.PHP_API_SERVER}grants.php?id=${id}`);
  }

  // * * * * *  MAILS  * * * * *

  readMailsFromPartenaire(id = 0): Observable<Mail[]>{
    return this.httpClient.get<Mail[]>(`${this.PHP_API_SERVER}mail.php?partenaireId=${id}`);
  }

  readMail(id: number): Observable<Mail[]>{
    return this.httpClient.get<Mail[]>(`${this.PHP_API_SERVER}mail.php?id=${id}`);
  }

  createMail(mail: Mail): Observable<Mail>{
    return this.httpClient.post<Mail>(`${this.PHP_API_SERVER}mail.php`, mail);
  }

  updateMailLu(id: number, mail: Mail): Observable<Mail>{
    //mail = {...mail, lu: 1};
    //let datas = JSON.stringify(mail);
    const datas = {
      lu: 1,
      onlyLu: "yes"
    };
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.httpClient.put<Mail>(`${this.PHP_API_SERVER}mail.php?id=${id}`, datas, { headers : headers, responseType: "json" });
  }

  // * * * * *  ADMIN  * * * * *

  public userLogin(mail: string, password: string): Observable<Admin> {
    let user = {
      mail: mail,
      password: password,
    }
    /* return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password }) */
    return this.httpClient.post<any>(`${this.PHP_API_SERVER}login.php`, user);
    /* .pipe(map(Admin => {
    this.setToken(Admin[0].name);
    this.getLoggedInName.emit(true);
    return Admin;
    })); */
  }

  updateAdminPwd(id: string, pwd: string): Observable<Partenaire>{
    let headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    const datas = {
      id: id,
      pwd: pwd
    };
    return this.httpClient.put<any>(`${this.PHP_API_SERVER}user.php/${id}`, datas, { headers : headers, responseType: "json" });
  }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  setId(id: string) {
    localStorage.setItem('id', id);
  }


  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
      return false;
  }

}
