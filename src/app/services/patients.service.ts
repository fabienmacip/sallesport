import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
/* import { Observable } from 'rxjs'; */
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
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

  editPatient(patient: Patient, index: number): Patient[]{
    this.patients[index] = patient;
    return this.patients;
  }

  deletePatient(patientIndex: number): Patient[]{
    this.patients.splice(patientIndex, 1);
    return this.patients;
  }
}
