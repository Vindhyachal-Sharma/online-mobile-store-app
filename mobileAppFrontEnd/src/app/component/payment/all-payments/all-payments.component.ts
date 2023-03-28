import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Order } from 'src/app/model/order';
import { Payment } from 'src/app/model/payment';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { LoginService } from 'src/app/service/authService/login.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

import { UpdatePaymentComponent } from '../update-payment/update-payment.component';

@Component({
  selector: 'app-all-payments',
  templateUrl: './all-payments.component.html',
  styleUrls: ['./all-payments.component.css'],
})
export class AllPaymentsComponent {
  paymentList: Payment[] = [];
  orderList: Order[] = [];

  customerId: any;
  role: any;

 
  constructor(
    public customerService: CustomerService,
    public user: LoginService,
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadOrdersData();
  }

  loadOrdersData() {
    this.role = localStorage.getItem('role');
    if (this.role == 'customer') {
      this.customerId = localStorage.getItem('userId');
      this.customerService.getOrdersListOfCustomer(this.customerId).subscribe({
        next: (data) => {
          this.orderList = data.reverse();
          this.paymentList = data.mobiles.reverse();
        },
        error: (error) => {},
      });
    } else {
      this.adminService.getAllOrders().subscribe({
        next: (data) => {this.orderList = data.reverse();},
        error: (error) => {},
      });
    }
  }

  updatePayment(paymentId: any, cost: any) {
    sessionStorage.setItem('updatecost', cost);
    sessionStorage.setItem('paymentIds', paymentId);
    this.dialog.open(UpdatePaymentComponent, {
      height: '365px',
      width: '400px',
    });
  }
}
