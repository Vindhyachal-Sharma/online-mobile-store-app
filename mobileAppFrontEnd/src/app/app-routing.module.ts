import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './component/products/mobile-item-design/products.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CustomerProfileComponent } from './component/customer-profile/customer-profile.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { CategoryComponent } from './component/category/create-category/category.component';

import { OrderComponent } from './component/order/get-order/order.component';
import { AddMobileToCategoryComponent } from './component/category/add-mobile-to-category/add-mobile-to-category.component';
import { ErrorComponent } from './component/error/error.component';
import { UserHomeComponent } from './component/user-home/home-page/user-home.component';
import { UpdateMobileComponent } from './component/category/update-mobile/update-mobile.component';
import { GetAllMobilesComponent } from './component/category/get-all-mobiles/get-all-mobiles.component';
import { GetAllCustomerComponent } from './component/admin/get-all-customer/get-all-customer.component';
import { ViewCancelMobilesComponent } from './component/order/view-cancel-mobiles/view-cancel-mobiles.component';
import { ViewOrderDetailsComponent } from './component/order/view-order-details/view-order-details.component';
import { MobileDetailsComponent } from './component/products/mobile-details/mobile-details.component';
import { AllPaymentsComponent } from './component/payment/all-payments/all-payments.component';
import { DisplayCategoriesComponent } from './component/category/display-categories/display-categories.component';
import { AdminRegistrationComponent } from './component/admin/admin-registration/admin-registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UserHomeComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register',component:RegisterComponent},
  { path: 'profile',component:CustomerProfileComponent,canActivate:[AuthGuard] },
  { path: 'adminHome',component:AdminHomeComponent,canActivate:[AdminGuard] },
  { path: 'category',component:CategoryComponent,canActivate:[AdminGuard]},

  { path: 'orderList',component:OrderComponent,canActivate:[AuthGuard]},
  { path: 'addMob',component:AddMobileToCategoryComponent,canActivate:[AdminGuard]},
  { path: 'updateMob',component:UpdateMobileComponent,canActivate:[AdminGuard]},
  { path: 'getAllMob',component:GetAllMobilesComponent,canActivate:[AdminGuard]},
  { path: 'getAllCust',component:GetAllCustomerComponent,canActivate:[AuthGuard]},
  { path: 'getOrder',component:ViewCancelMobilesComponent,canActivate:[AuthGuard]},
  { path: 'orderDetails',component:ViewOrderDetailsComponent,canActivate:[AuthGuard]},
  { path: 'mobileDetails',component:MobileDetailsComponent},
  { path: 'allPayments',component:AllPaymentsComponent,canActivate:[AuthGuard]},
  { path: 'displayCategories',component:DisplayCategoriesComponent},
  { path: 'registerAdmin',component:AdminRegistrationComponent,canActivate:[AdminGuard]},
  { path: '**',component:ErrorComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
