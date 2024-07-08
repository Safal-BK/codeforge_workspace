
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { CodeforgeserviceService } from '../services/codeforgeservice.service';


@Component({
  selector: 'app-vieweditor',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MonacoEditorModule],  templateUrl: './vieweditor.component.html',
  styleUrl: './vieweditor.component.css'
})




export class VieweditorComponent implements OnInit, OnDestroy {
  notes: any = '';
  output: any = '';
  language:any='python';
  filename:any='temp.py'

  updatetimer:any;
  // @Input() id: any = '';
  id:any="JWfQqkX6LX";
  isoutputopen: any = false;
  consolebuttonclass: any = 'fa-solid fa-angle-down';
  constructor(private codeservice: CodeforgeserviceService, private clipboard: Clipboard, private route:Router) {
  }

  editorOptions = { theme: 'vs-dark', language: 'html',readOnly:true };
  code: string = '';

  ngOnInit(): void {

    this.getsession()

    this.updatetimer = setInterval(()=>this.getsession(),1500)

  }
  ngOnDestroy(): void {
    clearInterval(this.updatetimer);
  }
  checkisexpired(){
    
    let body = {
      "id": this.id
    }
    console.log(body);
    
    this.codeservice.reqistokenexpired(body).subscribe((res: any) => {
      console.log(res.isexpired);
      if (res.isexpired){
        this.route.navigateByUrl('vieweditor/'+this.id)

      }
      else{
        this.getsession()
        // this.deletetoken()
       
      }



    })
  }
deletetoken(){
  let body = {
    "id": this.id
  }

  console.log(body);
  
  this.codeservice.reqdeletetoken(body).subscribe((res: any) => {
    console.log(res);
  })
}
  getsession() {
    let body = {
      "id": this.id
    }
    // console.log(body);
    
    this.codeservice.reqsession(body).subscribe((res: any) => {
      console.log(res);
      this.notes = res.notes;
      this.code = res.code;
        this.language=res.language
      // if(JSON.parse(res.code)){
      //   let obj = JSON.parse(res.code);

      //   this.code = obj.code;
      //   this.language=obj.language
      // }
      // let obj = JSON.parse(res.code);
      
      // this.code = obj.code;
      // this.language=obj.language

    })
  }

  savesession() {
    if(this.code==undefined ){
      this.code='';
    }
    if( this.notes==undefined ){
      this.notes=''

    }
    let body = {
      "id": this.id,
      "notes": this.notes,
      "code": this.code,
      "language":this.language
    }
    // console.log(body);

    this.codeservice.reqsavesession(body).subscribe((res) => {
      // console.log(res);

    })
  }

  changecode() {
console.log('changed......');

  }

  sendmessagecontentchanged(event: any) {
    console.log(event.target.value);
    this.language=event.target.value;

    switch (this.language) {
      case "python":
        this.filename='temp.py'
        break;
        case "php":
        this.filename='temp.php'
        break;
        case "java":
        this.filename='temp.java'
        break;
        case "cpp":
        this.filename='temp.cpp'
        break;
        case "c":
        this.filename='temp.c'
        break;
    
      default:
        break;
    }


  }
  savestate() {
    // update to database
  }
  compilecode() {
    console.log("comiled....");
    
    let body ={
      "language": this.language,
      "code": this.code,
      "session": this.id
  }
    console.log(body);

    this.codeservice.reqcompilecode(body).subscribe((res:any) => {
      console.log(res);
      this.output =res.output;

    })

  }
  toggleoutputcontainer(output: any, editor: any) {
    if (this.isoutputopen) {
      this.clipboard.copy('Alphonso');


      // editor.style.height = "250px";
      output.style.height = "100px";
      this.consolebuttonclass = 'fa-solid fa-angle-down';

      this.isoutputopen = !this.isoutputopen;
    }
    else {
      // editor.style.height = "300px";
      output.style.height = "350px";
      this.consolebuttonclass = 'fa-solid fa-angle-up'

      this.isoutputopen = !this.isoutputopen;
    }
  }


}
