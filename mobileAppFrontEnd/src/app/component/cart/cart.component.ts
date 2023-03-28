import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/model/cart';
import { Payment } from 'src/app/model/payment';
import { AlertService } from 'src/app/service/alertService/alert.service';

import { CustomerService } from 'src/app/service/customerService/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  cart: Cart = new Cart();
  public grandTotal!: number;
  customerId: any;
  payment: Payment = new Payment();

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.getCart();
  }

  paymentType() {
    if (this.payment.paymentMode == 'COD') {
      this.payment.paymentStatus = 'PENDING';
    } else if (this.payment.paymentMode == 'UPI') {
      this.payment.paymentStatus = 'PAID';
    }
  }

  getCart() {
    this.customerId = localStorage.getItem('userId');
    this.customerService.getCart(this.customerId).subscribe({
      next: (data) => {
        this.cart = data;
        this.products = data.mobiles;
      },
      error: (error) => {},
    });
  }

  removeItem(mobileId: number) {
    this.customerId = localStorage.getItem('userId');
    Swal.fire({
      title: 'Are you sure you want to remove this product From Cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove it!',

      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService
          .removeMobFromCart(this.customerId, mobileId)
          .subscribe({
            next: (data) => {
              this.alert.apiSuccessMsgReload('Item Removed Successfully', 1000);
            },
            error: (error) => {},
          });
      }
    });
  }

  emptycart() {
    this.customerId = localStorage.getItem('userId');
    Swal.fire({
      title: 'Are you sure you want to empty your cart?',
      icon: 'warning',
      text: 'you may loose all your items in your cart',
      showCancelButton: true,
      confirmButtonText: 'Yes, Empty it!',

      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.emptyCart(this.customerId).subscribe({
          next: (data) => {},
          error: (error) => {},
        });
        window.location.reload();
      }
    });
  }

  checkout() {
    this.customerId = localStorage.getItem('userId');
    this.customerService.checkout(this.payment, this.customerId).subscribe({
      next: (data) => {
        this.alert.apiSuccessMsgReload(data, 1000);
        this.router.navigate(['orderList']);
      },
      error: (error) => {
        this.alert.apiFailmsg(error);
      },
    });
  }
}
