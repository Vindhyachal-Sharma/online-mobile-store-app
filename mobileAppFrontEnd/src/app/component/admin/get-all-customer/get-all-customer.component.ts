import { Component } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

@Component({
  selector: 'app-get-all-customer',
  templateUrl: './get-all-customer.component.html',
  styleUrls: ['./get-all-customer.component.css'],
})
export class GetAllCustomerComponent {
  customersList: Customer[] = [];

  constructor(
    private adminService: AdminService,
    public customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.loadCustomersData();
  }

  loadCustomersData() {
    this.adminService.getAllCustomers().subscribe({
      next: (data) => { this.customersList = data;},
      error: (error) => {},
    });
  }
}
