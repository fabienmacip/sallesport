import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
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
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPasswordConfirm: ['', [Validators.required]]
    })
  }
}
