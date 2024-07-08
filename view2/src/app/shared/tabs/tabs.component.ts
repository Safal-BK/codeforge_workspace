import { CommonModule } from '@angular/common';
import { Component, Input ,Output , EventEmitter} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {
  @Input() tabsArray: string[] = [];
  @Output() onTabChange = new EventEmitter<number>();
  activatedTab: number = 0;

  setTab(index:number){
    this.activatedTab = index;
    // debugger;
    this.onTabChange.emit(this.activatedTab);
  }
}
