import { Component } from '@angular/core';
import xlsx from 'json-as-xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  tabularData :any[]= [];
  tabularHeader :any = [];
  tabularCells :any = [];

  data = [
    {
      sheet: "Children",
      columns: [
        { label: "Name", value: "name", validation: "string" },
        { label: "Age", value: "age", validation: "number" },
        { label: "Email", value: "email", validation: "string" },
        { label: "Location", value: "location", validation: "string" },
        { label: "Phone Number", value: "phoneNumber", validation: "number" },
        { label: "Occupation", value: "occupation", validation: "string" },
        { label: "Hobbies", value: "hobbies", validation: "string" },
        { label: "Country", value: "country", validation: "string" },
        { label: "Education", value: "education", validation: "string" },
        { label: "Website", value: "website", validation: "string" },
        { label: "Gender", value: "gender", validation: "string" },
        { label: "Favorite Color", value: "favoriteColor", validation: "string" },
        { label: "Skills", value: "skills", validation: "string" },
        { label: "Membership", value: "membership", validation: "string" },
        { label: "Address", value: "address", validation: "string" },
      ],
      content: [
        { name: "Manuel", age: 45, email: 'askfk@asfd', location: 'asldkjf', phoneNumber: 22384927349872, occupation: 'asldfj', hobbies: 'asdkjfl', country: 'asdlaksjfd', education: 'alsdjkf', website: 'aslkjdf', gender: 'asldjf', favoriteColor: 'alsdkf', skills: 'asldfj', membership: 'asdkf', address: 'asfdj' },
        { name: "Alice", age: 242, email: 'alice@example.com', location: 'Cityville', phoneNumber: 9876543210, occupation: 'Student', hobbies: 'Painting', country: 'Countryland', education: 'High School', website: 'www.alice-website.com', gender: 'Female', favoriteColor: 'Purple', skills: 'Art', membership: 'yes', address: '123 Art Street' },
        { name: "Bob", age: 23, email: 'bob@example.com', location: 'Townsville', phoneNumber: 5551234567, occupation: 'Manager', hobbies: 'Golf', country: 'Nationland', education: 'Bachelor\'s', website: 'www.bob-website.com', gender: 'Male', favoriteColor: 'Blue', skills: 'Leadership', membership: 'no', address: '456 Golf Street' },
        { name: "Sara", age: 23, email: 'sara@example.com', location: 'Villageville', phoneNumber: 1234567890, occupation: 'Retired', hobbies: 'Gardening', country: 'Countryside', education: 'None', website: 'N/A', gender: 'Female', favoriteColor: 'Green', skills: 'Planting', membership: 'yes', address: '789 Garden Lane' },
        { name: "John", age: 75, email: 'john@example.com', location: 'Citytown', phoneNumber: 9876123450, occupation: 'Engineer', hobbies: 'Coding', country: 'Countryland', education: 'Master\'s', website: 'www.john-website.com', gender: 'Male', favoriteColor: 'Red', skills: 'Programming', membership: 'yes', address: '321 Code Avenue' },
        { name: "Emily", age: 34, email: 'emily@example.com', location: 'Suburbia', phoneNumber: 5559876543, occupation: 'Designer', hobbies: 'Drawing', country: 'Nationland', education: 'Bachelor\'s', website: 'www.emily-website.com', gender: 'Female', favoriteColor: 'Pink', skills: 'Graphic Design', membership: 'no', address: '567 Art Lane' },
        { name: "David", age: 75, email: 'david@example.com', location: 'Smalltown', phoneNumber: 1230987654, occupation: 'Writer', hobbies: 'Reading', country: 'Countryside', education: 'Bachelor\'s', website: 'www.david-website.com', gender: 'Male', favoriteColor: 'Black', skills: 'Writing', membership: 'yes', address: '876 Book Street' },
        { name: "Sophia", age: 83, email: 'sophia@example.com', location: 'Urbanville', phoneNumber: 9876541230, occupation: 'Student', hobbies: 'Singing', country: 'Countryland', education: 'High School', website: 'www.sophia-website.com', gender: 'Female', favoriteColor: 'Yellow', skills: 'Vocal', membership: 'yes', address: '456 Song Avenue' },
        { name: "Michael", age: 23, email: 'michael@example.com', location: 'Downtown', phoneNumber: 5551237890, occupation: 'Manager', hobbies: 'Cooking', country: 'Nationland', education: 'Master\'s', website: 'www.michael-website.com', gender: 'Male', favoriteColor: 'Orange', skills: 'Culinary Arts', membership: 'no', address: '123 Chef Lane' },
        { name: "Olivia", age: 65, email: 'olivia@example.com', location: 'Ruralville', phoneNumber: 1239876540, occupation: 'Retired', hobbies: 'Fishing', country: 'Countryside', education: 'None', website: 'N/A', gender: 'Female', favoriteColor: 'Brown', skills: 'Fishing', membership: 'yes', address: '789 Lake Road' }
      ],
    },
  ]

  settings = {
    fileName: "MySpreadsheet",
    extraLength: 3,
    writeMode: "writeFile",
    writeOptions: {},
    RTL: false,
  }

  download() {
    xlsx(this.data, this.settings);
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
