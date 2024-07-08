import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { DatatableComponent } from '../shared/datatable/datatable.component';
import { NewSessionComponent } from '../shared/new-session/new-session.component';
import { RandomSessionComponent } from '../shared/random-session/random-session.component';
import { CodeforgeserviceService } from '../services/codeforgeservice.service';
import { log } from 'console';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NewSessionComponent, RandomSessionComponent,
    RouterOutlet, DataTablesModule, DatatableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  constructor(private http: HttpClient, private codeservice: CodeforgeserviceService) {

  }
  rerender(): void {
    this.dtElement.dtInstance.then(dtInstance => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }
  ngOnInit(): void {
    this.loadDataTable();
    this.dtTrigger.next(null);


  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  loadDataTable(): void {
    const self = this;

    this.dtOptions = {
      ajax: {
        url: 'http://127.0.0.1:8070/api/allsession',
        type: 'POST', // Specify the HTTP method
        contentType: 'application/json', // Set the content type to JSON
        data: function (d) {
          // Add your request body here
          return JSON.stringify({
            user: "safal",
          });
        },
        dataSrc: 'data' // Specifies that the data is inside the 'data' key
      },
      // ajax: {
      //   url: 'http://127.0.0.1:8070/api/allsession',
      //   dataSrc: 'data', // Empty string indicates the response itself is the data source
      // },
      columns: [
        {
          title: 'JD_ID',
          data: 'jd_id',
          className: 'p-3 border-2'
        },
        {
          title: 'JobTitle',
          data: 'title',
          orderable: false,
          searchable: false,
          className: 'p-3 border-2'
        },
        {
          title: 'Name',
          data: 'name',
          orderable: false,
          searchable: false,
          className: 'p-3 border-2'
        },
        {
          title: 'Email',
          data: 'email',
          orderable: false,
          searchable: false,
          className: 'p-3 border-2'
        },
        {
          title: 'ProcessdDate',
          data: 'marktimestamp',
          orderable: false,
          searchable: false,
          className: 'p-3 border-2'
        },
        {
          title: 'Action',
          data: null,
          orderable: false,
          searchable: false,
          className: 'p-3 border-2',
          render: (data, type, row) => {
            return `
              <div class="flex items-center gap-2">
                <button class="open-button text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 rounded-full px-4 py-1 flex items-center gap-2 transition-transform transform hover:scale-105">
                  <i class="fas fa-code"></i>
                  Open
                </button>
                <button class="delete-button text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 rounded-full px-4 py-1 flex items-center gap-2 transition-transform transform hover:scale-105">
                  <i class="fas fa-trash-alt"></i>
                  Delete
                </button>
              </div>
            `;
          }
        }
      ],
      order: [[4, 'desc']],
      "processing": true,
      headerCallback: function (thead, data, start, end, display) {
        $(thead).find('th').addClass('p-3 text-left bg-gray-200');
      },
      createdRow: function (row, data: any, dataIndex) {

        $(row).find('.delete-button').on('click', function () {
          const id = $(this).data('id');
          self.deleteRow(id);

        });
      },

    };
  }

  deleteRow(id: number): void {
    console.log('Deleting row with ID:', id);
    //     this.http.delete(`https://your-api-endpoint.com/delete/${id}`).subscribe({
    // next: (response) => {
    //         console.log('Delete successful', response);
    // // You might want to reload the table or remove the row from the DataTable here
    //       },
    // error: (error) => {
    //         console.error('Delete failed', error);
    //       },
    //     });
    this.deletesession(id);
  }
  showModals: boolean = false;

  openModals() {
    this.showModals = true;
  }


  closeModals() {
    this.showModals = false;
  }

  deleterecord() {
    console.log("goood");


  }
  deletesession(id:any){
    let body ={
      "user": "safal",
      "id":id
        }
      this.codeservice.reqdeletesession(body).subscribe((res:any)=>{
        console.log(res);
        let body ={
          "user": "safal",
            }
          this.codeservice.reqallsessions(body).subscribe((res:any)=>{
            console.log(res);
            this.rerender()
    
          })

      })
  }


  // Event handler for session submitted
  SessionSubmitted() {
    alert("reerender")
    this.rerender()
  }

}
