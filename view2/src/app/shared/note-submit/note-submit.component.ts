import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-note-submit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-submit.component.html',
  styleUrl: './note-submit.component.css'
})
export class NoteSubmitComponent {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
