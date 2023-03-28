import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Customer } from 'src/app/model/customer';
import { Mobile } from 'src/app/model/mobile';
import { Order } from 'src/app/model/order';
import { Payment } from 'src/app/model/payment';

import { AdminService } from 'src/app/service/adminService/admin.service';
import { LoginService } from 'src/app/service/authService/login.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  customers: Customer[] = [];
  categories: Category[] = [];
  mobilesList: Mobile[] = [];
  ordersList: Order[] = [];
  payments:Payment[]=[];

  constructor(
    public user: LoginService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user.checkForToken();
    this.loadAllCustomers();
    this.loadAllOrders();
    this.loadAllCategories();
  }

  loadAllMobiles() {
    this.adminService.getAllMobiles().subscribe({
      next: (data) => {this.mobilesList = data;},
      error: (error) => {},
    });
  }

  loadAllOrders() {
    this.adminService.getAllOrders().subscribe({
      next: (data) => {this.ordersList = data;},
      error: (error) => {},
    });
  }

  loadAllCustomers() {
    this.adminService.getAllCustomers().subscribe({
      next: (data) => { this.customers = data;},
      error: (error) => {},
    });
  }

  loadAllCategories() {
    this.adminService.getAllCategories().subscribe({
      next: (data) => {this.categories = data;},
      error: (error) => {},
    });
  }

  loadAllPayments() {
    this.adminService.getAllPayments().subscribe({
      next: (data) => {this.payments = data;
      console.log("payements:",data)},
      error: (error) => {
        console.log(error)
      },
    });
  }

  gotoCategory() {
    this.router.navigate(['category']);
  }
  gotoPayment() {
    this.router.navigate(['allPayments']);
  }
  gotoGetAllCustomer() {
    this.router.navigate(['getAllCust']);
  }
  gotoOrder() {
    this.router.navigate(['orderList']);
  }
}
