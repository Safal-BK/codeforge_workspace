import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modal-popup',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class ModalPopupComponent {
  @Input('showmodal')
  showmodal = true;

  @Output('close')
  onClose = new EventEmitter();
}
