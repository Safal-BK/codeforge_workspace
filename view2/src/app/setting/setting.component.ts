import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { DatatableComponent } from '../shared/datatable/datatable.component';
import { HttpClient } from '@angular/common/http';
import { AddUserModalComponent } from '../shared/add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [CommonModule, RouterModule, DataTablesModule, DatatableComponent,AddUserModalComponent],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css',
})
export class SettingComponent {
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataTable();
  }

  loadDataTable(): void {
    this.dtOptions = {
      ajax: {
        url: 'https://jsonplaceholder.typicode.com/users',
        dataSrc: '', // Empty string indicates the response itself is the data source
      },
      columns: [
        {
          title: 'Username',
          data: 'username',
          className: 'p-3 border-2',
        },
        {
          title: 'Email',
          data: 'email',
          orderable: false,
          searchable: false,
          className: 'p-3 border-2',
        },
      ],
      order: [[3, 'desc']],
      processing: true,
      headerCallback: function (thead, data, start, end, display) {
        $(thead).find('th').addClass('p-3 text-left bg-gray-200');
      },
    };
  }
  showModal= false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
