import { Component,OnInit  } from '@angular/core';


import { HttpClient } from '@angular/common/http';

 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Employee Information';
  returnFMsg:any="";
  returnSMsg:any="";
 
  emplyeeInfo:any=[];
  employeeObj:any={};
  
  roleObj:any={"HE":"Hours Employee","SE":"Salaried Employee","ME":"Manager"};
  
constructor(private http: HttpClient) {
    }
 ngOnInit(){
 
 

      
      this.http.get('http://localhost:9080/employee')
      .subscribe((response)=>{
        this.emplyeeInfo=response;
      });
      
      


 }
 
 getEmployeDetails(employeeId:any){
 this.returnSMsg="";
   this.returnFMsg="";

 this.employeeObj={};
  this.employeeObj=this.emplyeeInfo.find(x => x.employeeId === employeeId);

 }
  updateEmployeeDetails(empObject:any){
  this.returnSMsg="";
   this.returnFMsg="";
  this.http.post('http://localhost:9080/employee',empObject)
      .subscribe((response)=>{
      this.emplyeeInfo=response['data'];
      if(response['returnCode']==0){
      
       this.returnSMsg=response['returnMsg'];
      }else {
        this.returnFMsg=response['returnMsg'];
         
      }
       
      });
 }
 }