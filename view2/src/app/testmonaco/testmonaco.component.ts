import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

@Component({
  selector: 'app-testmonaco',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MonacoEditorModule],  templateUrl: './testmonaco.component.html',
  styleUrl: './testmonaco.component.css'
})
export class TestmonacoComponent {

  editorOptions = { theme: 'vs-dark', language: "typescript" };
  code: string = 'hiiii';

}
