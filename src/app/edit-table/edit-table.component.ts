import { Component } from '@angular/core';
import xlsx from 'json-as-xlsx';
import * as XLSX from 'xlsx';
import { TableService } from '../table.service';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent {
  tabularData :any[]= [];
  tabularHeader :any = [];
  tabularCells :any = [];

  constructor(private tableService: TableService) { }

  data = this.tableService.data;
  settings = this.tableService.settings;

  download() {
    this.tableService.download();
  }
  file :any;
  fileUploaded(event: any) {
    this.file = event.target.files[0];
  }

  fileConvert() {
    if(this.file) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(this.file);
      fileReader.onload = (event) => {
        let data = event.target?.result;
        let workbook = XLSX.read(data, {
          type: "binary"
        });
        this.tabularData = [];
        workbook.SheetNames.forEach( sheet => {
          let rowObject: object = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          if(this.checkValidity(rowObject)) {
            this.tabularData.push(rowObject)
          } else {
            window.alert('Sheet is Not Valid');
          }
        })
        this.addTableData();
      }
    }
  }

  addTableData() {
    this.tabularHeader = Object.keys(this.tabularData[0][0]);
    this.tabularData[0].forEach( (data :any) => {
      this.tabularCells.push(Object.values(data));
    });
  }

  checkValidity(data: any) {
    let newData = this.data;
    let validataionFailed = false;
    let label = { label: "Error", value: "error", validation: "null" };
    newData[0].columns.push(label);
    data.forEach( (val :any, index :any) => {
      let obj = val;
      let minIndex = 0;
      for(let item in obj) {
        if(typeof obj[item] != newData[0].columns[minIndex].validation) {
          let fieldError = item + " Type Error"
          Object.assign(newData[0].content[index], {error: fieldError});
          validataionFailed = true;
          break;
        }
        minIndex++;
      }
    })
    if(validataionFailed) {
      xlsx(newData, this.settings);
    }
    return !validataionFailed;
  }
}
