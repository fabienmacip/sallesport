import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-edit-auth-infos',
  templateUrl: './edit-auth-infos.component.html',
  styleUrls: ['./edit-auth-infos.component.css']
})
export class EditAuthInfosComponent implements OnInit {

  @Input() currentUser!: User;

  passwordForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService
  ) { }


  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      /* oldPassword: ['', [Validators.required]], */
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: ['', [Validators.required]]
    })
  }

  typeText(){
    let mot1 = document.getElementById('newPasswordInput');
    let mot2 = document.getElementById('newPasswordConfirmInput');
    mot1?.setAttribute('type','text');
    mot2?.setAttribute('type','text');
  }

  typePass(){
    let mot1 = document.getElementById('newPasswordInput');
    let mot2 = document.getElementById('newPasswordConfirmInput');
    mot1?.setAttribute('type','password');
    mot2?.setAttribute('type','password');
  }

  onEditPassword(modal: any): void {
    this.modalService.open(modal, { centered: true});
  }

  onSubmitPasswordForm(): void {

    let id = this.authService.getId();
    let role = this.authService.getRole();

    if(role == 'partenaire'){
      this.apiService.updatePartenairePwd(id!, this.passwordForm.value.newPassword).subscribe({
        next: data => {
          this.modalService.dismissAll();
          this.passwordForm.reset();
        },
        error: error => {
          console.error('Erreur lors du changement de mot de passe !', error);
        }
      });
    } else if (role == 'admin') {
      this.apiService.updateAdminPwd(id!, this.passwordForm.value.newPassword).subscribe({
        next: data => {
          this.modalService.dismissAll();
          this.passwordForm.reset();
        },
        error: error => {
          console.error('Erreur lors du changement de mot de passe !', error);
        }
      });
    }

  }
}
