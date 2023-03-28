import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Mobile } from 'src/app/model/mobile';
import { AlertService } from 'src/app/service/alertService/alert.service';
import { CustomerService } from 'src/app/service/customerService/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-cancel-mobiles',
  templateUrl: './view-cancel-mobiles.component.html',
  styleUrls: ['./view-cancel-mobiles.component.css'],
})
export class ViewCancelMobilesComponent {
  mobileList: Mobile[] = [];
  orderId: any;
  customerId: any;


  constructor(
    private customerService: CustomerService,
    private router: Router,
    private alert:AlertService
  ) {}
  ngOnInit(): void {
    this.orderId = sessionStorage.getItem('orderId');

    this.getAllMobilesApi();
  }

  getAllMobilesApi() {
    console.log(this.orderId);

    this.customerService.getOrdersbyOrderId(this.orderId).subscribe({
      next: (data) => {
        console.log(data);
        this.mobileList = data.mobiles;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancelMobileOrder(mobileId: any) {
    Swal.fire({
      title: 'Are You Sure Do you want to Cancel this Order?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderId = sessionStorage.getItem('orderId');
        this.customerId = localStorage.getItem('userId');
        this.customerService
          .cancelMobileFromOrderById(this.customerId, this.orderId, mobileId)
          .subscribe({
            next: (data) => {
                this.alert.apiSuccessMsg('Order Cancelled Successfully',1000)
            },
            error: (error) => { },
          });

      }
      window.location.reload()
    });
  }
}
