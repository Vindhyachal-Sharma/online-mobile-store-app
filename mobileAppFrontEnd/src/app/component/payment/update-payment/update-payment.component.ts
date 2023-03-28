import { Component } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';


@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.css']
})
export class UpdatePaymentComponent {
payment:Payment=new Payment()
cost:any
paymentId:any

constructor(private adminService:AdminService,private alert:AlertService){}
ngOnInit(): void {
  this.loadPaymentData()
}
loadPaymentData(){
  this.cost = sessionStorage.getItem('updatecost')
  this.paymentId = sessionStorage.getItem('paymentIds')
  this.adminService.getPaymentById(this.paymentId)
    .subscribe(
      {
        next: (data) => {this.payment=data;},
        error: (error) => {}
      });
}


updatePayment(){
  this.paymentId=sessionStorage.getItem("paymentIds")
   this.adminService.updatePaymentDetails(this.paymentId,this.payment)
     .subscribe(
       {
         next: (data) => {
          this.alert.apiSuccessMsgReload('Payment updated Succesfully',1000)
         },
         error: (error) => {this.alert.apiFailmsg(error)
         }
       });
     }
}
