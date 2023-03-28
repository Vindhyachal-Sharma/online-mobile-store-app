import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { ApiService } from 'src/app/service/ApiService/api.service';
import { LoginService } from 'src/app/service/authService/login.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

import Swal from 'sweetalert2';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  customerId: any;
  categoryId:any
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  constructor(
    public customerService: CustomerService,
    private alert: AlertService,
    private loginService: LoginService,
    private adminService: AdminService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = sessionStorage.getItem('categoryIdtoView');

    this.getAllMobilesApi();

    this.getAllMobilesByCategory();

  }

  addtocart(mobileId: number) {
    if (this.loginService.checkForLogin()) {
      this.customerId = localStorage.getItem('userId');
      this.customerService.addToCart(mobileId, this.customerId).subscribe({
        next: (data) => {
          this.alert.apiSuccessMsgReload('Item Added to cart Successfully',1000);
        },
        error: (error) => {this.alert.apiFailmsg(error);},
      });
    }
  }

  getAllMobilesApi() {
    console.log('categoryid:',this.categoryId);
      this.adminService.getAllMobiles().subscribe({
        next: (data) => {this.productList = data;},
        error: (error) => {},
      });
    }


    getAllMobilesByCategory(){
      this.adminService.getMobilesByCategoryId(this.categoryId).subscribe({
        next: (data) => {this.productList = data;},
        error: (error) => {console.log(error)},
      });
    }





  gotoDetails(mobileId: any) {
    sessionStorage.setItem('mobileDetailId', mobileId);
    this.router.navigate(['mobileDetails']).then((result)=>{window.location.reload()});
  }
}
