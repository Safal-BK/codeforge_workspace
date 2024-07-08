import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DatatableComponent } from '../shared/datatable/datatable.component';
import DataTable from 'datatables.net-buttons-dt';
import { HttpClient } from '@angular/common/http';
import { NewProblemComponent } from '../shared/new-problem/new-problem.component';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [CommonModule,RouterModule,RouterOutlet,DataTablesModule,DatatableComponent,NewProblemComponent],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.css'
})
export class ProblemsComponent {
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadDataTable();
  }

  loadDataTable(): void {
    this.dtOptions = {
      ajax: {
        url: 'http://127.0.0.1:8070/api/allproblems',
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
     
      columns: [
        {
          title: 'Problems',
          data: 'content',
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
      order: [[0, 'desc']],
      "processing": true,
      headerCallback: function(thead, data, start, end, display) {
        $(thead).find('th').addClass('p-3 text-left bg-gray-200');
      }
    };
  }

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
