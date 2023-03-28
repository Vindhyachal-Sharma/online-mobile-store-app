import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  customer:Customer =new Customer();
  confirmPassword?:string
  constructor(
    private customerService:CustomerService,
    private alert:AlertService,
    private router:Router){}

  register(){


    this.customerService.registerCustomer(this.customer).subscribe({
      next:(data)=>{
        console.log(data);
        this.alert.apiSuccessMsg('Registration Successfull',1000)
        this.router.navigate(['login'])},
      error:(err)=>{this.alert.apiFailmsg(err)}
    })
  }

  onSubmit(ngForm:NgForm) {
    

if(ngForm.form.invalid){

       this.alert.error('Please fill required elements')
    }
    else{
      this.register()
    }
  }
}
