import { Component } from '@angular/core';
import { CodexserviceService } from '../../services/codexservice.service';
import { NavComponent } from '../nav/nav.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-problem',
  standalone: true,
  imports: [NavComponent,FormsModule],
  templateUrl: './create-problem.component.html',
  styleUrl: './create-problem.component.css'
})
export class CreateProblemComponent {
  problem:any;
  constructor(private codexservice: CodexserviceService) {

  }

  createproblem() {

    let body = {
      "user": "safal",
      "problem":this.problem
    }

    this.codexservice.reqnewproblem(body).subscribe((res: any) => {
      console.log("created");
      console.log(res);
    })

  }
}
