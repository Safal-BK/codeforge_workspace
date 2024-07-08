import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
    //Agenda

    showAgendaDetails: boolean = false;

    showAgenda(button: string) {
      if (button === 'Agenda') {
        this.showAgendaDetails = true;
      }
    }
  
    hideAgenda(button: string) {
      if (button === 'Agenda') {
        this.showAgendaDetails = false;
      }
    }
  
    //Reports
  
    showReportsDetails: boolean = false;
  
    showReports(button: string) {
      if (button === 'Reports') {
        this.showReportsDetails = true;
      }
    }
  
    hideReports(button: string) {
      if (button === 'Reports') {
        this.showReportsDetails = false;
      }
    }
  
    //Activity
  
    showActivityDetails: boolean = false;
  
    showActivity(button: string) {
      if (button === 'Activity') {
        this.showActivityDetails = true;
      }
    }
  
    hideActivity(button: string) {
      if (button === 'Activity') {
        this.showActivityDetails = false;
      }
    }
}
