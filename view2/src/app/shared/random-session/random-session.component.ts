import { Component, OnInit } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { ProblemDescriptionComponent } from '../problem-description/problem-description.component';
import { PlaygroundComponent } from '../playground/playground.component';
import { TestcaseComponent } from '../testcase/testcase.component';
import { CodeforgeserviceService } from '../../services/codeforgeservice.service';

@Component({
    selector: 'app-random-session',
    standalone: true,
    templateUrl: './random-session.component.html',
    styleUrl: './random-session.component.css',
    imports: [ProblemDescriptionComponent, AngularSplitModule, PlaygroundComponent, TestcaseComponent]
})
export class RandomSessionComponent implements OnInit {
  sessionid:any='JxIknOfPZX';

    constructor(private codeservice :CodeforgeserviceService) {

    }
    ngOnInit(): void {
    }

}
