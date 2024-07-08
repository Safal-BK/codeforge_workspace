import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-projects',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './show-projects.component.html',
  styleUrl: './show-projects.component.css'
})
export class ShowProjectsComponent {

  @Input('showmodal')
  showmodal = true;
 
  @Output('close')
  onClose = new EventEmitter();

  @Input() projects: any[] = [];


  disableshowProjectsModalBodyScrolling(){
    document.body.style.setProperty('overflow','hidden')
  }

  enableshowProjectsModalBodyScrolling(){
    document.body.style.setProperty('overflow','scroll')
  }

  ngOnInit(): void{
    this.showProjectsModalInit()
  }

  ngOnChanges(): void{
    this.showProjectsModalInit()
  }

  showProjectsModalInit(){
    if(this.showmodal){
      this.disableshowProjectsModalBodyScrolling()
    }
    else {
      this.enableshowProjectsModalBodyScrolling()
    }
  }

  closeshowProjectsModal(){
    this.enableshowProjectsModalBodyScrolling()
    this.onClose.emit()
  }

}
