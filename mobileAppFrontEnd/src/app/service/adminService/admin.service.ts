import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public search=new BehaviorSubject<string>("");

  headers:any;

  constructor(private http: HttpClient,private api:ApiService) { }



  public registerNewAdmin(request: any) {
    let headers=this.api.getHeader()
    return this.http.post("http://localhost:8092/admin/register", request,{headers,responseType:'json'})
  }

  public updateAdminDetails(adminId: number, request: any) {
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/admin/" + adminId, request,{headers, responseType: 'json' })
  }

  public createCategory(request: any) {
    let headers=this.api.getHeader()
    return this.http.post("http://localhost:8092/admin/category", request, {headers, responseType: 'text' as 'json' })
  }

  public updateCategory(categoryId:number,request: any) {
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/admin/category/"+categoryId, request, {headers, responseType: 'text' as 'json' })
  }

  public addmobileToCategoryByCategoryId(request: any, categoryId: number) {
    let headers=this.api.getHeader()
    return this.http.post("http://localhost:8092/admin/mobile/" + categoryId, request, {headers, responseType: 'text' as 'json' })
  }

  public updateMobileDetails(mobileId: number, request: any) {
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/admin/mobile/" + mobileId, request, {headers, responseType: 'text' })
  }

  public removeMobilefromCategoryById(categoryId:number,mobileId: number) {
    let headers=this.api.getHeader()
    return this.http.delete("http://localhost:8092/admin/mobiles/" +categoryId+"/"+ mobileId,{headers})
  }
  public removeMobile(mobileId: number) {
    let headers=this.api.getHeader()
    return this.http.delete("http://localhost:8092/admin/mobile/"+ mobileId,{headers})
  }

  public getAllCategories(): Observable<any> {

    return this.http.get("http://localhost:8092/admin/categories", {responseType: "json" })
  }

  public getAllCustomers(): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/customers", {headers, responseType: "json" });
  }

  public getAllMobiles(): Observable<any> {
    return this.http.get("http://localhost:8092/admin/mobiles")
  }

  public getAllPayments(): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/mobiles",{headers})
  }

  public getMobileDetails(mobileId:any): Observable<any> {

    return this.http.get("http://localhost:8092/admin/mobiles/"+mobileId)
  }

  public loadAllOrders(): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/customers", {headers, responseType: "json" });
  }

  // public getCustomerByUsername(username: String): Observable<any> {
  //   return this.http.get("http://localhost:8092/admin/username/" + username, { responseType: "json" });
  // }

  // public getCustomerByMobileNumber(mobNo: String): Observable<any> {
  //   return this.http.get("http://localhost:8092/admin/mobNo/" + mobNo, { responseType: "json" });
  // }

  // public getCustomerByEmail(emailId: String): Observable<any> {
  //   return this.http.get("http://localhost:8092/admin/customer/" + emailId, { responseType: "json" });
  // }

  public getMobilesByCategoryId(categoryId:number):Observable<any>{
    return this.http.get("http://localhost:8092/admin/mobile/"+categoryId)
  }
  public getCategoryByCategoryId(categoryId:number):Observable<any>{
    return this.http.get("http://localhost:8092/admin/category/"+categoryId)
  }

  public getAllOrders(): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/orders",{headers})
  }
  public cancelOrderById(orderId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/admin/order/"+orderId,{headers, responseType: 'text'})
  }
  public getOrderById(orderId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/order/"+orderId,{headers})
  }

  public getPaymentById(paymentId:number):Observable<any>{
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/payment/"+paymentId,{headers})
  }

  public getMobileById(mobileId:number):Observable<any>{
    return this.http.get("http://localhost:8092/admin/mobiles/"+mobileId)
  }
  public updatePaymentDetails(paymentId: number, request: any) {
    let headers=this.api.getHeader()
    return this.http.put("http://localhost:8092/admin/payment/" + paymentId, request, {headers, responseType: 'text' })
  }
  getAdminData(adminId: number): Observable<any> {
    let headers=this.api.getHeader()
    return this.http.get("http://localhost:8092/admin/admin/" + adminId, {headers, responseType: "json" })
  }













}
