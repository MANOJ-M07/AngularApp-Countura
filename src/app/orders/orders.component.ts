import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { CustomerModel } from './customer-model';
// import { HttpClient } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  formValue !: FormGroup;
  customerData !: any ;
  customerModelObj : CustomerModel = new CustomerModel();


  constructor( private formbuilber:FormBuilder, private api : ApiService,private route:Router){}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      firstName : [''],
      lastName : [''],
      address : [''],
      city : [''],
      state : ['']
    })
    this.getAllCustomer()
  }

  postCustomerDetails(){
    this.customerModelObj.firstName = this.formValue.value.firstName;
    this.customerModelObj.lastName = this.formValue.value.lastName;
    this.customerModelObj.address = this.formValue.value.address;
    this.customerModelObj.city = this.formValue.value.city;
    this.customerModelObj.state = this.formValue.value.state;

    this.api.postCustomer(this.customerModelObj)
    .subscribe(res =>{
      console.log(res);
      alert("Customer Data added sucess...!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllCustomer();
    },
      err=>{
      alert("Something went wrong")
    })
  }
  getAllCustomer(){
    this.api.getCustomer()
    .subscribe(res=>{
      this.customerData = res;
    })
  }
  deleteCustomer(row : any){
    this.api.deleteCustomer(row)
    .subscribe(res=>{
      console.log(res);
      alert("Customer delete");
      this.getAllCustomer();
    })
  }
  onEdit(row : any){
    this.customerModelObj.firstName =row;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['city'].setValue(row.city);
    this.formValue.controls['state'].setValue(row.state);
  }
  updateCustomerDetails(){
    this.customerModelObj.firstName = this.formValue.value.firstName;
    this.customerModelObj.lastName = this.formValue.value.lastName;
    this.customerModelObj.address = this.formValue.value.address;
    this.customerModelObj.city = this.formValue.value.city;
    this.customerModelObj.state = this.formValue.value.state;
    this.api.updateCustomer(this.customerModelObj)
  }
}
