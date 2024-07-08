import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodeforgeserviceService } from '../../services/codeforgeservice.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-problem',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './new-problem.component.html',
  styleUrl: './new-problem.component.css'
})
export class NewProblemComponent {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  problem:any;
  closeModal() {
    this.close.emit();
  }
  constructor(private codeservice: CodeforgeserviceService,private toastr: ToastrService) {

  }

  createproblem() {

    let body = {
      "user": "safal",
      "problem":this.problem
    }

    this.codeservice.reqnewproblem(body).subscribe((res: any) => {
      console.log("created");
      console.log(res);
      this.toastr.success('problem Created', 'Successfully!');
      this.showModal = false;
 
    })

  }
}
