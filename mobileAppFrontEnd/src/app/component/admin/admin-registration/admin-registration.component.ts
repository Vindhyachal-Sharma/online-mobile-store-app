import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Admin } from 'src/app/model/admin';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-registration',
  templateUrl: './admin-registration.component.html',
  styleUrls: ['./admin-registration.component.css'],
})
export class AdminRegistrationComponent {
  admin: Admin = new Admin();

  adminRegister: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private alertService: AlertService
  ) {
    this.adminRegister = this.formBuilder.group(
      {
        name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,}$'),]),
        userName: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_-]{3,}$'),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,5}'),
        ]),
        mobileNo: new FormControl('', [
          Validators.required,
          Validators.pattern('^[6-9]\d{9}$'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
          ),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: this.checkPasswords.bind(this) }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };

  getControl(name: any): AbstractControl | null {
    return this.adminRegister.get(name);
  }
  get userName() {
    return this.adminRegister.get('userName');
  }

  registerAdmin() {
    console.log(this.admin);
    this.admin = this.adminRegister.value;
    this.admin.role = 'Admin';
    this.adminService.registerNewAdmin(this.admin).subscribe({
      next: (data) => {
        this.alertService.apiSuccessMsg(
          'New Admin Registered Successfully',
          3000
        );
      },
      error: (err) => {
        //  let abc= JSON.parse(JSON.stringify(err.error) )
        this.alertService.apiFail(err);
      },
    });
  }
}
