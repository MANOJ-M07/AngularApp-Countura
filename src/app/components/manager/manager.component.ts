import { publishFacade } from '@angular/compiler';
import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{

  public Categories: string[]=[];
  public Customers: any[]=[];
  
  



public LoadCategories(){
  fetch("http://localhost:3000/posts")
  .then(Response=> Response.json())
  .then (categories=>{
    categories.unshift("all");
    this.Categories = categories
  })
}

public LoadCustomers(url:string){
  fetch(url)
  .then(Response=>Response.json())
  .then(customers=>{
    this.Customers = customers;
  })
}

constructor(){}

ngOnInit(): void {
  this.LoadCategories();
  this.LoadCustomers("http://localhost:3000/posts");
}
public CategoryChanged(category:string):void{
  if(category=="all"){
    this.LoadCustomers("http://localhost:3000/posts");
  } else {
   this.LoadCustomers(`http://localhost:3000/posts`);
  }
}

}
