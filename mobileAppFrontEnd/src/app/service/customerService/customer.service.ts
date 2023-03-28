import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public query:string="";

  constructor(private http:HttpClient,private api:ApiService ) { }


  public registerCustomer(request: any) {

    return this.http.post("http://localhost:8092/customer", request, { responseType: 'json' })
  }

  public addToCart(mobileId: number, customerId: number) {
    let headers=this.api.getHeader()
    return this.http.post("http://localhost:8092/cart/mobile/" + customerId + "/" + mobileId, "", {headers, responseType: 'text' as 'json' })
  }
  getCart(customerId: number): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/cart/" + customerId, {headers, responseType: "json" })
  }

  removeMobFromCart(customerId: number, mobileId: number) {
    let headers=this.api.getHeader()
    return this.http.delete("http://localhost:8092/cart/mobile/" + customerId + "/" + mobileId,{headers})
  }
  emptyCart(customerId: number) {
    let headers=this.api.getHeader()
    return this.http.delete("http://localhost:8092/cart/delete/" + customerId,{headers})
  }


  checkout(request: any, customerId: number) {
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/cart/checkout/" + customerId, request, {headers, responseType: 'text' as 'json' })
  }
  getUserData(customerId: number): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/customer/" + customerId, {headers, responseType: "json" })
  }


  updateUserData(customerId: number, data: any): Observable<any> {
    let headers=this.api.getHeader()

    return this.http.put("http://localhost:8092/customer/" + customerId, data, {headers, responseType: "json" })
  }

    public customerDetails(customerId:number): Observable<any> {
      let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/customer/"+customerId, {headers, responseType: "json" });
  }

  public updateCustomerDetails(request:any){
    let headers=this.api.getHeader()
    return this.http.post("http://localhost:8092/customer",request,{headers,responseType:'json'})
  }

  public deactivateAccount(customerId:any){
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/customer/deactivate/"+customerId, {headers,responseType:'text'})
  }
  public activateAccount(customerId:any){
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/customer/activate/"+customerId, {headers ,responseType:'text'})
  }


  public getOrdersListOfCustomer(customerId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/customer/order/"+ customerId,{headers, responseType: 'json'})
  }
  public getOrdersbyOrderId(orderId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/customer/orders/order/"+ orderId,{headers, responseType: 'json'})
  }
  public cancelOrderById(customerId:any,orderId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/customer/order/"+customerId+"/"+orderId,{ headers, responseType: 'json'})
  }
  public cancelMobileFromOrderById(customerId:any,orderId:number,mobileId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/customer/order/"+customerId+"/"+orderId+"/"+mobileId,{ headers, responseType: 'json'})
  }


}
