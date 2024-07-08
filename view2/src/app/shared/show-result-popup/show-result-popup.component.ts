import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-result-popup',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './show-result-popup.component.html',
  styleUrl: './show-result-popup.component.css'
})
export class ShowResultPopupComponent {
  @Input('showmodal')
  showmodal = true;

  @Output('close')
  onClose = new EventEmitter();
}
