import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'src/app/interfaces/patient';
import { PatientsService } from 'src/app/services/patients.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  patientForm!: FormGroup;

  patientList: Patient[] = [];

  currentPatient: any;



  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private patientsService: PatientsService
  ) {

  }

  ngOnInit(): void {
    /* const patientId = this.activatedRoute.snapshot.paramMap.get('id');
    if(patientId !== null){
      this.currentPatient = this.patientList.find(el => el.id === +<string>patientId);
    } */

    this.initPatientForm();
    this.patientList = this.patientsService.getPatients();
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

  onEditPatient(patient: Patient, index: number): void{
    console.log(patient);
    this.patientForm.setValue({...patient, index});
  }

  onSubmitPatientForm(): void{
    const patientIndex = this.patientForm.value.index;
    let patient = this.patientForm.value;
    if(patientIndex == null || patientIndex == undefined){
      delete patient.index;
      this.patientList = this.patientsService.createPatient(patient);
    } else {
      delete patient.index;
      this.patientList = this.patientsService.editPatient(patient, patientIndex);
    }

    //this.patientList.push(this.patientForm.value);
    this.patientForm.reset();
  }

  onDeletePatient(index: number): void{
    this.patientList = this.patientsService.deletePatient(index);
  }

}
