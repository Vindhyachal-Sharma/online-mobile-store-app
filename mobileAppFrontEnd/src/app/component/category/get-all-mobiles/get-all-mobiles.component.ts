import { HtmlParser } from '@angular/compiler';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Mobile } from 'src/app/model/mobile';

import { AdminService } from 'src/app/service/adminService/admin.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';
import Swal from 'sweetalert2';
import { UpdateMobileComponent } from '../update-mobile/update-mobile.component';

@Component({
  selector: 'app-get-all-mobiles',
  templateUrl: './get-all-mobiles.component.html',
  styleUrls: ['./get-all-mobiles.component.css'],
})
export class GetAllMobilesComponent {
  mobileList: Mobile[] = [];
  categoryId: any;
  searchKey: string = '';

  loadMsg: String = '';
  delMsg: String = '';
  errorMsg: String = '';

  constructor(
    private adminService: AdminService,
    private router: Router,
    private dialog: MatDialog,
    public customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.categoryId = sessionStorage.getItem('categoryId');

    this.getAllMobilesApi();
  }

  getToUpdateMob(mobileId: any) {
    sessionStorage.setItem('mobileId', mobileId);
    this.dialog.open(UpdateMobileComponent, {
      height: '500px',
      width: '500px',
    });
  }
  getAllMobilesApi() {
    console.log(this.categoryId);
    if (!(this.categoryId === null || this.categoryId === undefined)){
      this.adminService.getMobilesByCategoryId(this.categoryId).subscribe({
        next: (data) => {this.mobileList = data;},
        error: (error) => {},
      });
    } else {
      this.adminService.getAllMobiles().subscribe({
        next: (data) => {this.mobileList = data;},
        error: (error) => {},
      });
    }
  }

  removeMobile(mobileId: any) {
    Swal.fire({
      title: 'Are You Sure Do you want to remove mobile from this Category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryId = sessionStorage.getItem('categoryId');
        this.adminService
          .removeMobilefromCategoryById(this.categoryId, mobileId)
          .subscribe({
            next: (data) => {},
            error: (error) => {},
          });
         window.location.reload()
      }
    });
  }
}
