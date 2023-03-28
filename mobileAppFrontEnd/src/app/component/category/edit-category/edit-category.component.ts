import { Component, OnInit } from '@angular/core';
import { ɵNgNoValidate } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  category: Category = new Category();
  categoryId: any;
  constructor(
    private categoryService: AdminService,
    private router: Router,
    private dialog: MatDialog,
    private alert:AlertService
  ) {}
  ngOnInit() {
    this.getCategoryDetails();
  }

  getCategoryDetails() {
    this.categoryId = sessionStorage.getItem('updatecategoryId');
    this.categoryService.getCategoryByCategoryId(this.categoryId).subscribe({
      next: (data) => {this.category = data;},
      error: (error) => {},
    });
  }

  editCategory() {
    this.categoryId = sessionStorage.getItem('updatecategoryId');
    this.categoryService
      .updateCategory(this.categoryId, this.category)
      .subscribe({
        next: (data) => {this.dialog.closeAll();
        this.alert.apiSuccessMsgReload('Category Name updated successfully',1000)},
        error: (error) => {
          this.alert.apiFailmsg(error);
        },
      });
  }
}
