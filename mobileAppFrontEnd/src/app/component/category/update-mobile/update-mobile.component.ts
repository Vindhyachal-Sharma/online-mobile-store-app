import { Component, OnInit } from '@angular/core';
import { Mobile } from 'src/app/model/mobile';

import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';

@Component({
  selector: 'app-update-mobile',
  templateUrl: './update-mobile.component.html',
  styleUrls: ['./update-mobile.component.css'],
})
export class UpdateMobileComponent implements OnInit {
  mobileId: any;
  mobile: Mobile = new Mobile();
  constructor(private adminService: AdminService,private alert: AlertService) {}
  ngOnInit() {
    this.getMobileData();
  }

  getMobileData() {
    this.mobileId = sessionStorage.getItem('mobileId');
    console.log(this.mobileId);
    this.adminService.getMobileDetails(this.mobileId).subscribe({
      next: (data) => {this.mobile = data;},
      error: (error) => {},
    });
  }

  updateMobileData() {
    this.mobileId = sessionStorage.getItem('mobileId');
    this.adminService
      .updateMobileDetails(this.mobileId, this.mobile)
      .subscribe({
        next: (data) => {
          this.alert.apiSuccessMsgReload("Mobile Data updated Successfully",1000)
          this.getMobileData();
        },
        error: (error) => {},
      });
  }
}
