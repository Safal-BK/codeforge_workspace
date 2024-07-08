import { Component, Input } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
declare let $: any;

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [DataTablesModule, HttpClientModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.css',
})
export class DatatableComponent {
  @Input() columns: any[] = []; // Accept dynamic columns as input
  @Input() url: string = '';
  dtOptions: DataTables.Settings = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDataTable();
  }
  loadDataTable(): void {
    this.dtOptions = {
      ajax: {
        url: this.url,//'http://localhost:8500/api/datatable-jobs'
      },
      columns: this.getDataTableColumns(),
      order: [[1, 'asc']],
      serverSide: true,
      processing: true,
      lengthMenu: [10, 25, 50, 100],
      pageLength: 10,
    };
  }
  // column should be like
  // [
  //   { title: "Column 1", main_column: "column", custom_column: "custom", "type": "string/boolean/button", "orderable":true, "searchable":false },
  //   // Add more columns as needed
  // ];
  getDataTableColumns(): any {
    const generatedColumns: any[] = [];
    this.columns.forEach(column => {
      
      let col: any = {
        title: '',
        data: null,
        orderable: false,
        searchable: false
      };
  
      switch (column.type) {
        case "button":
          col.render = function (data: any, type: any, row: any, meta: any) {
            // Access data directly from the specified column
            console.log(column.data);
            const id = row[column.data]; // Assuming column.data holds the key for jd_id
            return (
              '<button class="btn btn-xs btn-outline-danger waves-effect waves-light bg-white text-red-500 border border-red-500 py-1 px-2 rounded-md hover:bg-red-500 hover:text-white" data-id="'+ id +'">Delete</button>'
            );
          };
          break;
        case "string":
          console.log(column.title);
          col.title = column.title;
          col.data = column.data;
          col.orderable = column.orderable;
          col.searchable = column.searchable;
          break;
        // Add more cases as needed
      }
      console.log(col);
      generatedColumns.push(col);
      
    })

    return generatedColumns; // Return the generated columns array

  }
}
