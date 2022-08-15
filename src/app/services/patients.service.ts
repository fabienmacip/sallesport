import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
/* import { Observable } from 'rxjs'; */
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from '../interfaces/patient';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private authService: AuthService
  ) { }

  private patients: Patient[] = [];

  patientsSubject: BehaviorSubject<Patient[]> = new BehaviorSubject(<Patient[]>[]);

  getPatients(){
    this.db.list('patients').query.limitToLast(10).once('value', snapshot => {
      const tuplesSnapshotValue = snapshot.val();
      if(tuplesSnapshotValue){
        const tuples = Object.keys(tuplesSnapshotValue).map(id => ({id, ...tuplesSnapshotValue[id]}));
        this.patients = tuples;
      }
      this.dispatchPatients();
    })
  }

  getPatientById(){
    alert('GET Patient by id');
  }

  dispatchPatients() {
    this.patientsSubject.next(this.patients);
  }

  async createTuple(patient: Patient): Promise<Patient>{
    try {
       const response = this.db.list('patients').push(patient);
       const createdTuple = {...patient, id: <string>response.key};
       this.patients.push(createdTuple);
       this.dispatchPatients();
       return createdTuple;
    } catch(error) {
      throw error;
    }
  }

  async editTuple(patient: Patient, patientId: string): Promise<Patient>{
    try {
      await this.db.list('patients').update(patientId, patient)
      const tupleIndexToUpdate = this.patients.findIndex(el => el.id === patientId);
      this.patients[tupleIndexToUpdate] = {...patient, id: patientId};
      this.dispatchPatients();
      return {...patient, id: patientId};
    } catch(error) {
      throw error;
    }
  }

  async deleteTuple(patientId: string): Promise<Patient>{
    try {
      const tupleToDeleteIndex = this.patients.findIndex(el => el.id === patientId);
      const tupleToDelete = this.patients[tupleToDeleteIndex];
      await this.db.list('patients').remove(patientId);
      this.patients.splice(tupleToDeleteIndex, 1);
      this.dispatchPatients();
      return tupleToDelete;
    } catch(error) {
      throw error;
    }
  }
}
