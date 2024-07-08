import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodeforgeserviceService } from '../../services/codeforgeservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-session',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './new-session.component.html',
  styleUrl: './new-session.component.css'
})
export class NewSessionComponent {
  @Input() showModals: boolean = false;
  @Output() close = new EventEmitter<void>();

  jdid:any;
  title:any;
  name:any;
  email:any;
constructor(private codeservice :CodeforgeserviceService, private toastr: ToastrService){

}
  closeModals() {
    this.close.emit();
  }
  submitform(){
    this.createsession()    

  }

  @Output() SessionSubmitted = new EventEmitter<void>();
  createsession(){
    let body={
      "candidates":[{
          "name":this.name,
   
   "email":this.email,
   "title":this.title,
   "jd_id":this.jdid
      }]
   
   }
    this.codeservice.reqnewsession(body).subscribe((res:any)=>{
      console.log("createed");
      console.log(res);

        this.toastr.success('Session Submitted', 'Successfully!');
     this.showModals = false;
     this.SessionSubmitted.emit();

      
    })
  }
}
