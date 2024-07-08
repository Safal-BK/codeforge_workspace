import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CodexserviceService } from '../../services/codexservice.service';
import { CommonModule } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule ,DataTablesModule,RouterLink,NavComponent],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.css'
})
export class ProblemsComponent implements OnInit {
  dtOptions: any = {};

  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  data: any = [
    {
      "name": "safal",
      "email": "safal.bk"
    },
    {
      "name": "aman",
      "email": "aman.gmail"
    }
  ]
  constructor(private codexservice: CodexserviceService, private route: Router) {

  }
  ngOnInit(): void {
    this.getallproblem()
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
  getallproblem() {
    let body = {
      "user": "safal",
    }
    this.codexservice.reqallproblems(body).subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      this.dtTrigger.next(null);

    })
  }
  openproblem(id:any) {
    this.route.navigateByUrl("problems/"+id);

  }
  deleteproblem(id:any) {
    let body ={
      "user": "safal",
      "id":id
        }
      this.codexservice.reqdeleteproblem(body).subscribe((res:any)=>{
        console.log(res);
        let body ={
          "user": "safal",
            }
          this.codexservice.reqallproblems(body).subscribe((res:any)=>{
            console.log(res);
            this.data=res.data
            this.rerender()
    
          })

      })
  }
  newproblem(){
    this.route.navigateByUrl("problem/new");

    
  }
}
