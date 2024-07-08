import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CodexserviceService } from '../../services/codexservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewproblem',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './viewproblem.component.html',
  styleUrl: './viewproblem.component.css'
})
export class ViewproblemComponent implements OnInit {
  problem:any;
  @Input() id: any = '';

  constructor(private codexservice: CodexserviceService, private route: Router) {

  }

ngOnInit(): void {
  this.getproblem()
}
  getproblem(){
    let body = {
      "user": "safal",
      "id":this.id
    }
    this.codexservice.reqviewproblem(body).subscribe((res: any) => {
      console.log(res);
      this.problem=res.content;
      // this.data = res.data;

    })
  }
  updateproblem(){
    let body = {
      "user":"safal",
      "problem":this.problem,
      "id":this.id
  
  }
    this.codexservice.requpdateproblem(body).subscribe((res: any) => {
      console.log(res);
      // this.data = res.data;

    })
  }

  newproblem(){
    this.route.navigateByUrl("problem/new");

    
  }
}
