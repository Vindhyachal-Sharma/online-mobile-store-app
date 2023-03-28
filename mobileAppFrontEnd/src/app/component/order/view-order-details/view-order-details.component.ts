import { Component } from '@angular/core';
import { Order } from 'src/app/model/order';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

@Component({
  selector: 'app-view-order-details',
  templateUrl: './view-order-details.component.html',
  styleUrls: ['./view-order-details.component.css'],
})
export class ViewOrderDetailsComponent {
  order: Order = new Order();
  orderId: any;

  constructor(private customerService: AdminService) {}

  ngOnInit(): void {
    this.getOrderDetails();
  }
  getOrderDetails() {
    this.orderId = sessionStorage.getItem('orderIdDetails');
    this.customerService.getOrderById(this.orderId).subscribe({
      next: (data) => {
        console.log(data);
        this.order = data;
      },
      error: (error) => {},
    });
  }
}
