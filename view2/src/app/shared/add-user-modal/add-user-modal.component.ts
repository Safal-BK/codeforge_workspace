import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-user-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './add-user-modal.component.html',
  styleUrl: './add-user-modal.component.css',
})
export class AddUserModalComponent {
 @Input() showModal: boolean = false;
 @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
}
}