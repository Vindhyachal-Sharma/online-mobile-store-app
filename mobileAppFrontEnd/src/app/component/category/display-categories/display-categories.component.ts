import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Mobile } from 'src/app/model/mobile';
import { AdminService } from 'src/app/service/adminService/admin.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';

@Component({
  selector: 'app-display-categories',
  templateUrl: './display-categories.component.html',
  styleUrls: ['./display-categories.component.css'],
})
export class DisplayCategoriesComponent {
  category: Category = new Category();
  search: String = '';
  categoryList: Category[] = [];
  productList:Mobile[]=[];
  filterCategory:any;

  constructor(
    private categoryService: AdminService,
    public customerService: CustomerService,
    private router:Router
  ) {}

  ngOnInit() {
    this.loadAllCategories();
  }

  loadAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {this.categoryList = data;

      },
      error: (error) => {},
    });
  }

  viewMobilesofCategory(categoryId?:any){
    sessionStorage.setItem('categoryIdtoView',categoryId)
    this.router.navigate(['products']).then(() => {
      window.location.reload();
  })

}
}
