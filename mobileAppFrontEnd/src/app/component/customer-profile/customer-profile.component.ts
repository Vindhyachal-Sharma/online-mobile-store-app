import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/model/admin';
import { Customer } from 'src/app/model/customer';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { LoginService } from 'src/app/service/authService/login.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css'],
})
export class CustomerProfileComponent implements OnInit {
  customerId: any;
  adminId: any;
  customer: Customer = new Customer();
  admin: Admin = new Admin();
  user: any;
  isEditable: Boolean = false;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private adminService: AdminService,
    public loginService: LoginService,
    private alert:AlertService
  ) {}
  ngOnInit() {
    this.getCustomerData();
  }

  editClicked() {
    this.isEditable = !this.isEditable;

  }

  onCancel(){
    this.isEditable = !this.isEditable;
    window.location.reload()
  }


  getCustomerData() {
    this.customerId = localStorage.getItem('userId');
    this.customerService.getUserData(this.customerId).subscribe({
      next: (data) => {this.user = data;
      console.log(data)},
      error: (error) => {
        console.log(error)
      },
    });
  }

  updateCustomerData() {
    this.customerId = localStorage.getItem('userId');
    console.log(this.user);
    this.user.password = 'Abc@1234';
    this.customerService.updateUserData(this.customerId, this.user).subscribe({
      next: (data) => {
        this.alert.apiSuccessMsgReload('Profile Updated Successfully',1000)
      },
      error: (error) => {},
    });
  }

  deactivateAccount() {
    Swal.fire({
      title: 'Are You Sure! Do you want to Deactivate your Account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Deactivate it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
    this.customerId = localStorage.getItem('userId');
    this.customerService.deactivateAccount(this.customerId).subscribe({
      next: (data) => {
        this.alert.apiSuccessMsgReload('Id DeActivated Successfully',1000)
      },
      error: (error) => {
        this.alert.apiSuccessMsgReload('Id DeActivated Successfully',1000)
      },
    })
  }});
  }



  activateAccount() {
    this.customerId = localStorage.getItem('userId');
    this.customerService.activateAccount(this.customerId).subscribe({
      next: (data) => {
        this.alert.apiSuccessMsgReload('Id Activated Successfully',1000)
      },
      error: (error) => {
        this.alert.apiSuccessMsgReload('Id Activated Successfully',1000)
      },
    });
  }



}
