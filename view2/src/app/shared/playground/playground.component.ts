import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as monaco from 'monaco-editor';
import { NoteSubmitComponent } from '../note-submit/note-submit.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CodeforgeserviceService } from '../../services/codeforgeservice.service';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet,NoteSubmitComponent],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css'
})
export class PlaygroundComponent {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  editor!: monaco.editor.IStandaloneCodeEditor;
  @Input() id: any = '';
  code:any;
  language:any;

  constructor(private codeservice :CodeforgeserviceService) {
    
  }
  ngOnInit(): void {
    // Additional initialization logic if needed
    this.getsession()
  }

  ngAfterViewInit(): void {
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value:this.code,
      language: "typescipt",
      theme: 'vs-dark'
    });
  }

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getsession() {
    let body = {
      "id": this.id
    }
    // console.log(body);
    
    this.codeservice.reqsession(body).subscribe((res: any) => {
      console.log(res);
      this.code = res.code;

    //   this.notes = res.notes;
    //   if(JSON.parse(res.code)){
    //     let obj = JSON.parse(res.code);

    //     this.code = obj.code;
    //     // this.language=obj.language
    //   }
      let obj = JSON.parse(res.code);
      console.log(obj);
      
      this.code = obj.code;
      this.language=obj.language
      console.log(this.code);

    })
  }

}
