import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Subscription } from 'rxjs';
import { Partenaire } from 'src/app/interfaces/partenaire';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.component.html',
  styleUrls: ['./partenaire.component.css']
})
export class PartenaireComponent implements OnInit, OnDestroy {

  partenaireForm!: FormGroup;

  partenaires: Partenaire[] = [];

  currentPartenaire: any;

  subscription! : Subscription;

  titrePage: string = 'Enregistrer un nouveau partenaire';

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
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initPartenaireForm();

    this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
      this.partenaires = partenaires;
    })

  }


  initPartenaireForm(): void{
    this.partenaireForm = this.formBuilder.group({
      id: [0],
      nomfranchise: ['TEST', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      sexegerant: ['M', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]],
      nomgerant: ['Durand', [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      mail: ['dudu@gmail.fr', [Validators.email, Validators.required, Validators.maxLength(45)]],
      password: ['qsdfqsdf', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]],
      actif: [true],
      grants: ['1'],
      passwordConfirm: ['qsdfqsdf', [Validators.required]]
    })
  }

  onCbChange(e: any): void {
    const allergens: FormArray = this.partenaireForm.get('allergens') as FormArray;

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


  onEditPartenaire(partenaire: Partenaire): void{
    this.titrePage = 'Modifier un partenaire';

    this.partenaireForm.setValue({
      id: partenaire.id ?? '',
      nomfranchise : partenaire.nomfranchise ?? '',
      sexegerant : partenaire.sexegerant ?? 'M',
      nomgerant: partenaire.nomgerant ?? '',
      mail: partenaire.mail,
      password: partenaire.password,
      passwordConfirm: partenaire.password,
      actif: partenaire.actif == 0 ? false : true,
      grants: partenaire.grants ?? 0,

    });

  }

  onSubmitPartenaireForm(): void{

    const partenaireId = this.partenaireForm.value.id;

    let partenaire = this.partenaireForm.value;
    if(!partenaireId || partenaireId && partenaireId == 0){

      // CREATE ligne PARTENAIRE
      partenaire.id = "";
      delete partenaire.passwordConfirm;
      //this.router.navigate(['/admin','dashboard']);



      this.apiService.createPartenaire(partenaire).subscribe({
        next: data => {
          //this.postId = data.id;
          console.log(data);
          //this.partenaires.push(partenaire);
          this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
            this.partenaires = partenaires;
          })

        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

    } else {

      delete partenaire.passwordConfirm;


      // UPDATE
      //delete partenaire.id;
      this.apiService.updatePartenaire(partenaireId, partenaire).subscribe({
        next: data => {
          //this.postId = data.id;
          console.log(data);
          this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
            this.partenaires = partenaires;
          });
        },
        error: error => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
        }
      });

    }

    this.partenaireForm.reset();
    this.titrePage = 'Enregistrer un nouveau partenaire';


  }

  onDeletePartenaire(partenaireId?: number): void{

    if(confirm("SUPPRIMER ?")){
      if(partenaireId && partenaireId != 0){
        this.apiService.deletePartenaire(partenaireId).subscribe((part: Partenaire)=>{
          console.log("Partenaire deleted, ", part);
          this.subscription = this.apiService.readPartenaireAll().subscribe((partenaires: Partenaire[])=>{
            this.partenaires = partenaires;
          });
          //this.router.navigate(['partenaires']);
        });
      } else {
        console.error('Un id doit être fourni pour pouvoir supprimer ce partenaire.');
      }

    }


  }

  ngOnDestroy(): void {
    if (this.subscription) {
           this.subscription.unsubscribe();
         }
  }

}
