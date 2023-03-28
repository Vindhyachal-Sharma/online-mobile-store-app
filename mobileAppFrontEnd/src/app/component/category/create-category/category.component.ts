import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';

import { AdminService } from 'src/app/service/adminService/admin.service';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { LoginComponent } from '../../login/login.component';
import { AddMobileToCategoryComponent } from '../add-mobile-to-category/add-mobile-to-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [LoginComponent],
})
export class CategoryComponent {
  category: Category = new Category();
  categoryList: Category[] = [];
  filtercategory: any;
  loadMsg: String = '';
  delMsg: String = '';
  errorMsg: String = '';

  constructor(
    private categoryService: AdminService,
    public user: LoginComponent,
    private router: Router,
    private dialog: MatDialog,
    private alert:AlertService
  ) {}
  ngOnInit() {
    this.loadAllCategories();
  }

  createCategory() {
    this.categoryService.createCategory(this.category).subscribe({
      next: (data) => {this.loadAllCategories();
        this.alert.apiSuccessMsgReload('Category Added Succesfully',1000)
      },
      error: (error) => {
        this.alert.apiFail(error)
      },
    });
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {this.categoryList = data.reverse();},
        error: (error) => {},
    });
  }

  addMobile(categoryId: any) {
    sessionStorage.setItem('categoryId', categoryId);
    this.dialog.open(AddMobileToCategoryComponent, {
      height: '500px',
      width: '500px',
    });
  }

  editCategory(categoryId: any) {
    sessionStorage.setItem('updatecategoryId', categoryId);
    this.dialog.open(EditCategoryComponent, {
      height: '300px',
      width: '300px',
    });
  }

  getAllMobileFromCategory(categoryId: any) {
    sessionStorage.setItem('categoryId', categoryId);
    this.router.navigate(['getAllMob']);
  }

  }

