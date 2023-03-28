import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mobile } from 'src/app/model/mobile';

import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-add-mobile-to-category',
  templateUrl: './add-mobile-to-category.component.html',
  styleUrls: ['./add-mobile-to-category.component.css'],
  providers: [LoginComponent],
})
export class AddMobileToCategoryComponent implements OnInit {
  mobile: Mobile = new Mobile();

  categoryId: any;
  constructor(
    private router: Router,
    public user: LoginComponent,
    private adminService: AdminService,
    private alert:AlertService
  ) {}
  ngOnInit(): void {}

  mobileAdded() {
    this.categoryId = sessionStorage.getItem('categoryId');
    this.adminService.addmobileToCategoryByCategoryId(this.mobile, this.categoryId)
      .subscribe({
        next: (data) => {
          this.alert.apiSuccessMsgReload('Mobile Added Successfully',2000)
          // this.router.navigate(['/category']);
        },
        error: (error) => {
          this.alert.apiFailmsg(error)
        },
      });
  }
}
