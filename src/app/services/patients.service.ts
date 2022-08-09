import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor() { }

  private patients: Patient[] = [
    {
      /* id: 0, */
      lastName: 'Dupont',
      firstName: 'Fabrice',
      dob: '1989-04-01',
      sex: 'M',
      height: 178,
      weight: 75
    },    {
      /* id: 1, */
      lastName: 'Bucanon',
      firstName: 'Michelle',
      dob: '1979-04-11',
      sex: 'F',
      height: 163,
      weight: 68
    },    {
      /* id: 2, */
      lastName: 'Roustit',
      firstName: 'Julien',
      dob: '1965-11-30',
      sex: 'M',
      height: 169,
      weight: 78
    },    {
      /* id: 3, */
      lastName: 'Iglesias',
      firstName: 'Juliette',
      dob: '2001-02-15',
      sex: 'F',
      height: 170,
      weight: 94
    }
  ]


  getPatients(): Patient[]{
    return this.patients
  }

  createPatient(patient: Patient): Patient[]{
    this.patients.push(patient);
    return this.patients;
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
