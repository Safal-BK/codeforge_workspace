import { Component } from '@angular/core';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms';
import { CodexserviceService } from '../../services/codexservice.service';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [NavComponent,FormsModule],
  templateUrl: './create-session.component.html',
  styleUrl: './create-session.component.css'
})
export class CreateSessionComponent {
  jd_id:any;
  title:any;
  name:any;
  email:any;
  constructor(private codexservice :CodexserviceService){

  }

  createsession(){
    let body={
      "candidates":[{
          "name":this.name,
   
   "email":this.email,
   "title":this.title,
   "jd_id":this.jd_id
      }]
   
   }
    this.codexservice.reqnewsession(body).subscribe((res:any)=>{
      console.log("createed");
      console.log(res);

      
    })
  }
}
