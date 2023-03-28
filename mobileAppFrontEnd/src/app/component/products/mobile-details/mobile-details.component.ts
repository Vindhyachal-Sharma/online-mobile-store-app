import { Component } from '@angular/core';
import { Mobile } from 'src/app/model/mobile';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { LoginService } from 'src/app/service/authService/login.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

@Component({
  selector: 'app-mobile-details',
  templateUrl: './mobile-details.component.html',
  styleUrls: ['./mobile-details.component.css']
})
export class MobileDetailsComponent {

mobile:Mobile=new Mobile()
mobileId:any
customerId:any

constructor(private alert:AlertService,private adminService:AdminService,private customerService:CustomerService,private loginService:LoginService){}

ngOnInit(): void {
  this.getMobileDetails()

}
getMobileDetails(){

  this.mobileId=sessionStorage.getItem('mobileDetailId')
  console.log(this.mobileId)
  this.adminService.getMobileById(this.mobileId)
  .subscribe(
    {
      next: (data) => {
        console.log(data);
        this.mobile=data
      },
      error: (error) => {

      }
    });
}
addtocart(mobileId:number){
  if (this.loginService.checkForLogin()) {
  this.customerId=localStorage.getItem('userId')
   this.customerService.addToCart(mobileId,this.customerId)
      .subscribe(
        {
          next: (data) => {
            this.alert.apiSuccessMsgReload('Item Added to cart Successfully',1000);
            
          },
          error: (error) => {
            console.log(error)
          }
        });
    }
  }
}
