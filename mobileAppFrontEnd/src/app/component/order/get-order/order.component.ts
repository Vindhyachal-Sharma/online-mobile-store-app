import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchAll } from 'rxjs';
import { Order } from 'src/app/model/order';
import { Payment } from 'src/app/model/payment';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

import Swal from 'sweetalert2';
import { PaymentComponent } from '../../payment/payment-details/payment.component';
import { ViewCancelMobilesComponent } from '../view-cancel-mobiles/view-cancel-mobiles.component';
import { ViewOrderDetailsComponent } from '../view-order-details/view-order-details.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  orderList: Order[] = [];
  customerId: any;
  role: any;
  payment: Payment = new Payment();
  searchKey: string = '';

  constructor(
    public customerService: CustomerService,
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
        next: (data) => {this.orderList = data.reverse();},
        error: (error) => {},
      });
    } else {
      this.adminService.getAllOrders().subscribe({
        next: (data) => {this.orderList = data.reverse();},
        error: (error) => {},
      });
    }
  }

  cancelOrder(orderId: any) {
    this.role = localStorage.getItem('role');
    if (this.role == 'customer') {
      this.customerId = localStorage.getItem('userId');
      Swal.fire({
        title: 'Are you sure want to Cancel Order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Cancel it!',
         cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.customerService
            .cancelOrderById(this.customerId, orderId)
            .subscribe({
              next: (data) => {},
              error: (error) => {
              },
            });
        }
         window.location.reload();
      });
    } else {
      Swal.fire({
        title: 'Are you sure want to Cancel Order?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Cancel it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.isConfirmed) {
          this.adminService.cancelOrderById(orderId).subscribe({
            next: (data) => {},
            error: (error) => {
            },
          });
        }window.location.reload();
      });
    }
  }

  goToOrder(orderId: any) {
    sessionStorage.setItem('orderId', orderId);
    this.dialog.open(ViewCancelMobilesComponent, {
      height: '340px',
      width: '700px',
    });
  }

  viewDetails(orderId: any) {
    sessionStorage.setItem('orderIdDetails', orderId);
     this.dialog.open(ViewOrderDetailsComponent, {
      height: '340px',
      width: '400px',
    });
  }
  viewPaymentDetails(paymentId: any, cost: any) {
    sessionStorage.setItem('cost', cost);
    sessionStorage.setItem('paymentId', paymentId);
    this.dialog.open(PaymentComponent, {
      height: '200px',
      width: '500px',
    });
  }
}
