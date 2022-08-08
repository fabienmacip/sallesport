import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patientForm!: FormGroup;

  //patientList: any[] = [];
  patientList = [
    {
      /* id: 0, */
      lastName: 'Dupont',
      firstName: 'Fabrice',
      dob: '1989-04-01',
      sex: 'M',
      height: '178',
      weight: '75'
    },    {
      /* id: 1, */
      lastName: 'Bucanon',
      firstName: 'Michelle',
      dob: '1979-04-11',
      sex: 'F',
      height: '163',
      weight: '68'
    },    {
      /* id: 2, */
      lastName: 'Roustit',
      firstName: 'Julien',
      dob: '1965-11-30',
      sex: 'M',
      height: '169',
      weight: '78'
    },    {
      /* id: 3, */
      lastName: 'Iglesias',
      firstName: 'Juliette',
      dob: '2001-02-15',
      sex: 'F',
      height: '170',
      weight: '94'
    }
  ]

  currentPatient: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    /* const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if(patientId !== null){
      this.currentPatient = this.patientList.find(el => el.id === +<string>patientId);
    } */

    this.initPatientForm();
  }

  initPatientForm(): void{
    this.patientForm = this.formBuilder.group({
      index: [0],
      lastName: ['MACIP', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      firstName: ['Fabien',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dob: ['06/05/1977',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sex: ['M',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      height: ['169',[Validators.minLength(2), Validators.maxLength(3)]],
      weight: ['73',[Validators.maxLength(3)]]
    })
  }

  onEditPatient(patient: any, index: number): void{
    console.log(patient);
    this.patientForm.setValue({...patient, index});
  }

  onSubmitPatientForm(): void{
    const patientIndex = this.patientForm.value.index;
    let patient = this.patientForm.value;
    if(patientIndex == null || patientIndex == undefined){
      delete patient.index;
      this.patientList.push(patient);
    } else {
      delete patient.index;
      this.patientList[patientIndex] = patient;
    }

    //this.patientList.push(this.patientForm.value);
    this.patientForm.reset();
    console.log(this.patientList);
  }

  onDeletePatient(index: number): void{
    this.patientList.splice(index, 1);
  }

}
