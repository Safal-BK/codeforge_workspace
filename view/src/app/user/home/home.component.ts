import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CodexserviceService } from '../../services/codexservice.service';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ,DataTablesModule,RouterLink,NavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements AfterViewInit, OnDestroy, OnInit {  
  data:any;
  
  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  constructor( private codexservice: CodexserviceService, private route:Router) {
   }






  ngOnInit(): void {
    this.getallsessions()
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then(dtInstance => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
  getallsessions(){
    let body ={
      "user": "safal",
        }
      this.codexservice.reqallsessions(body).subscribe((res:any)=>{
        console.log(res);
        this.data=res.data
        this.dtTrigger.next(null);

      })
  }

  createrandomsession(){
    console.log("random session");
    
    let body ={
      "user": "safal",
        }
      this.codexservice.reqinstantsession(body).subscribe((res:any)=>{
        console.log(res);
        this.route.navigateByUrl("codeeditor/"+res.id);

      })
  }
  deletesession(id:any){
    let body ={
      "user": "safal",
      "id":id
        }
      this.codexservice.reqdeletesession(body).subscribe((res:any)=>{
        console.log(res);
        let body ={
          "user": "safal",
            }
          this.codexservice.reqallsessions(body).subscribe((res:any)=>{
            console.log(res);
            this.data=res.data
            this.rerender()
    
          })

      })
  }


  newsession(){
    this.route.navigateByUrl("cs");

  }



}
