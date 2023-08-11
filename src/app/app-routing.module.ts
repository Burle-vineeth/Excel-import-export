import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { EditTableComponent } from './edit-table/edit-table.component';

const routes: Routes = [
  { path: '', component: TableComponent},
  { path: 'edit', component: EditTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
