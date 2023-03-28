import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProductsComponent } from './component/products/mobile-item-design/products.component';
import { CartComponent } from './component/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CustomerProfileComponent } from './component/customer-profile/customer-profile.component';
import { CategoryComponent } from './component/category/create-category/category.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { OrderComponent } from './component/order/get-order/order.component';
import { AddMobileToCategoryComponent } from './component/category/add-mobile-to-category/add-mobile-to-category.component';
import { UserHomeComponent } from './component/user-home/home-page/user-home.component';
import { UpdateMobileComponent } from './component/category/update-mobile/update-mobile.component';
import { GetAllMobilesComponent } from './component/category/get-all-mobiles/get-all-mobiles.component';
import { GetAllCustomerComponent } from './component/admin/get-all-customer/get-all-customer.component';
import { ViewOrderDetailsComponent } from './component/order/view-order-details/view-order-details.component';
import { ViewCancelMobilesComponent } from './component/order/view-cancel-mobiles/view-cancel-mobiles.component';
import { PaymentComponent } from './component/payment/payment-details/payment.component';
import { EditCategoryComponent } from './component/category/edit-category/edit-category.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MobileDetailsComponent } from './component/products/mobile-details/mobile-details.component';
import { AllPaymentsComponent } from './component/payment/all-payments/all-payments.component';
import { DisplayCategoriesComponent } from './component/category/display-categories/display-categories.component';
import { CarouselComponent } from './component/user-home/carousel/carousel.component';
import { SearchPipe } from './pipes/search.pipe';
import { AdminRegistrationComponent } from './component/admin/admin-registration/admin-registration.component';
import { UpdatePaymentComponent } from './component/payment/update-payment/update-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,

    CustomerProfileComponent,
    CategoryComponent,
    AdminHomeComponent,
    OrderComponent,
    AddMobileToCategoryComponent,
    UserHomeComponent,

    UpdateMobileComponent,
    GetAllMobilesComponent,
    GetAllCustomerComponent,
    ViewOrderDetailsComponent,
    ViewCancelMobilesComponent,
    PaymentComponent,
    EditCategoryComponent,
    MobileDetailsComponent,
    AllPaymentsComponent,
    DisplayCategoriesComponent,
    CarouselComponent,
    SearchPipe,
    AdminRegistrationComponent,
    UpdatePaymentComponent,

  ],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
