import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mail } from 'src/app/interfaces/mail';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

declare const Swal: any;
@Component({
  selector: 'app-mails',
  templateUrl: './mails.component.html',
  styleUrls: ['./mails.component.css']
})
export class MailsComponent implements OnInit, OnDestroy {

  mails: Mail[] = [];

  role: string = '';
  userId: number = 0;

  subscription! : Subscription;

  displayMailToggle: number = 0;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.getRole() != ''){
      this.role = <string>this.authService.getRole();
    }

    if(this.authService.getId() != ''){
      this.userId = Number(this.authService.getId());
    }

    if(this.role == 'partenaire'){
      this.subscription = this.apiService.readMailsFromPartenaire(this.userId).subscribe((mails: Mail[])=>{
        this.mails = mails;
      })
    }
  }

  toggleDisplayMail(mailId: number = 0, mailLu: number = 0){

    if(this.displayMailToggle == mailId){
      this.displayMailToggle = 0;
    } else {
      this.displayMailToggle = mailId;
      if(mailLu == 0){
        let email: Mail;
        email = <Mail>this.mails.find((m) => m.id == mailId);
        this.subscription = this.apiService.updateMailLu(mailId, email).subscribe({
          next: data => {
            this.subscription = this.apiService.readMailsFromPartenaire(this.userId).subscribe((mails: Mail[])=>{
              this.mails = mails;
            });
          },
          error: error => {
            console.error('Erreur lors du marquage du mail LU !', error);
          }
        });
      }
    }
  }

  // Marquer le mail comme lu
  onDisplayOneMail(id: number): void{

    let email: Mail;
    email = <Mail>this.mails.find((m) => m.id == id);

    this.apiService.updateMailLu(id, email).subscribe({
      next: data => {
        this.subscription = this.apiService.readMailsFromPartenaire(this.userId).subscribe((mails: Mail[])=>{
          this.mails = mails;
        })
      },
      error: error => {
        console.error('Erreur lors du marquage du mail LU !', error);
      }
    });
  }

  activeStructure(mailId: number, lien: string): void{

      /* if(confirm("Confirmer l'activation de cette structure ?")){ */
    const confirmMsg = "Confirmer l'activation de cette structure ?";
    Swal.fire({
      title: confirmMsg,
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'OK'
    }).then((result: any) => {
      if (result.isConfirmed) {

        this.apiService.turnOnStructureActifAndDeleteMailLink(lien, mailId).subscribe({
          next: data => {
            this.subscription = this.apiService.readMailsFromPartenaire(this.userId).subscribe((mails: Mail[])=>{
              this.mails = mails;
            })
          },
          error: error => {
            //this.errorMessage = error.message;
            console.error('There was an error!', error);
          }
        });
      }
  });
}



  ngOnDestroy(): void {
    if (this.subscription) {
           this.subscription.unsubscribe();
         }
  }

}
