import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  lesChecboxesFonctionnent = false; // Utilisé pour savoir si on affiche les checkboxes comme indiqué ici :
  // https://remotestack.io/angular-checkboxes-tutorial-example/

  allergens: Array<any> = [
    { name: 'cacao', value: 'cacao' },
    { name: 'lait', value: 'lait' },
    { name: 'gluten', value: 'gluten' },
    { name: 'cacahuètes', value: 'cacahuètes' },
    { name: 'arachides', value: 'arachides' }
  ];


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private patientsService: PatientsService,
    private authService: AuthService
  ) {}

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
  }

  initPatientForm(): void{
    this.patientForm = this.formBuilder.group({
      id: [0],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      dob: ['01/01/1999', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      sex: ['M', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      height: ['', [Validators.minLength(2), Validators.maxLength(3)]],
      weight: ['', [Validators.maxLength(3)]],
      diet: [''],
      /* allergens: this.formBuilder.array([], [Validators.required]), */
      allergenCacao: [''],
      allergenLait: [''],
      allergenCacahuete: [''],
      allergenGluten: [''],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required]]
    })
  }

  onCbChange(e: any): void {
    const allergens: FormArray = this.patientForm.get('allergens') as FormArray;

    if (e.target.checked) {
      allergens.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      allergens.controls.forEach((item) => {
        if (item.value == e.target.value) {
          allergens.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  onEditPatient(patient: Patient): void{
    this.patientForm.setValue({
      id: patient.id ?? '',
      firstName : patient.firstName ?? '',
      lastName: patient.lastName ?? '',
      email: patient.email,
      password: patient.password,
      passwordConfirm: patient.password,
      dob: patient.dob ?? 0,
      sex : patient.sex ?? 0,
      height: patient.height ?? 0,
      weight: patient.weight ?? '',
      diet: patient.diet ?? '',
      allergenCacao: patient.allergenCacao ?? '',
      allergenLait: patient.allergenLait ?? '',
      allergenCacahuete: patient.allergenCacahuete ?? '',
      allergenGluten : patient.allergenGluten ?? ''
    });

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
      this.patientsService.editTuple(patient, patientId);
    }

    this.patientForm.reset();
  }

  onDeletePatient(patientId?: string): void{
    if(patientId){
      this.patientsService.deleteTuple(patientId).catch(console.error);
    } else {
      console.error('Un id doit être fourni pour pouvoir supprimer ce patient.');
    }

  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
