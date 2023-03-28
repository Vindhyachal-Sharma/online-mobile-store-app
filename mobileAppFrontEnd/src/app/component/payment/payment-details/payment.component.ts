import { Component } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { AdminService } from 'src/app/service/adminService/admin.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
payment:Payment=new Payment()

cost:any
paymentId:any

constructor(private adminService:AdminService){

}
 ngOnInit(): void {
    this.loadPaymentData()
  }

  loadPaymentData(){
    this.cost = sessionStorage.getItem('cost')
    this.paymentId = sessionStorage.getItem('paymentId')
    this.adminService.getPaymentById(this.paymentId)
      .subscribe(
        {
          next: (data) => {
            console.log(data);
            this.payment=data;
          },
          error: (error) => {
            console.log(error);
          }
        });
  }

  
}
