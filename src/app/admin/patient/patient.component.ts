import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Patient } from 'src/app/interfaces/patient';
import { AuthService } from 'src/app/services/auth.service';
import { PatientsService } from 'src/app/services/patients.service';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit, OnDestroy {

  patientForm!: FormGroup;

  patients: Patient[] = [];

  currentPatient: any;

  subscription! : Subscription;



  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private patientsService: PatientsService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.initPatientForm();

    this.subscription = this.patientsService.patientsSubject.subscribe({
      next: (patients: Patient[]) => {
        this.patients = patients;
      },
      error: (error) => {
        console.error(error);
      }
    });

    this.patientsService.getPatients();

    //this.patientsService.dispatchPatients();
  }



  initPatientForm(): void{
    this.patientForm = this.formBuilder.group({
      id: [0],
      lastName: ['MACIP', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      firstName: ['Fabien',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dob: ['06/05/1977',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sex: ['M',[Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      height: ['169',[Validators.minLength(2), Validators.maxLength(3)]],
      weight: ['73',[Validators.maxLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    })
  }

  onEditPatient(patient: Patient, index: number): void{
    this.patientForm.setValue({...patient, index});
  }

  onSubmitPatientForm(): void{
    const patientId = this.patientForm.value.id;
    let patient = this.patientForm.value;
    if(!patientId || patientId && patientId === ''){
      // CREATE ligne PATIENT
      delete patient.id;
      this.patientsService.createTuple(patient).catch(console.error);

      // CREATE ligne AUTHENTICATION
      this.authService.signupUser(this.patientForm.value.email, this.patientForm.value.password)
      .then(user => {
        //this.router.navigate(['/admin','dashboard']);
      }).catch(console.error);


    } else {
      // UPDATE
      delete patient.id;
      this.patients = this.patientsService.editPatient(patient, patientId);
    }

    this.patientForm.reset();
  }

  onDeletePatient(index: number): void{
    this.patients = this.patientsService.deletePatient(index);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
