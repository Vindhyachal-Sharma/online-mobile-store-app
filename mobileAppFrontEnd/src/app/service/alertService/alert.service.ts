import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  error(message: string) {
    Swal.fire("Warning", message, 'warning');
  }

  success(message: string) {
    return Swal.fire("Success", message, 'success');
  }

  apiFail(res: any) {
    Swal.fire(res.error, res || 'Something went wrong', 'error');
  }
  apiSuccess(res: any) {
    Swal.fire(res?.statusCode, res?.status, 'success');
  }

  apiSuccessMsg(title:any,timer?:any):any{
    Swal.fire({

      title:title,
      showCancelButton:false,
      showConfirmButton:false,
      icon:'success',
      timer:timer,
    })
  }

  apiSuccessMsgReload(title:any,timer?:any):any{
    Swal.fire({
      title:title,
      showCancelButton:false,
      showConfirmButton:false,
      icon:'success',
      timer:timer,
    }).then(() => {
      location.reload();})
  }

    apiFailmsg(data:any,timer?:any){
      Swal.fire({
        title:data.error,
        showCloseButton:false,
        showConfirmButton:false,
        timer:timer,
        icon:'error'
      })
    }
  }


