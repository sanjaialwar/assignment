import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppDashComponent } from './app-dash/app-dash.component';
import { AppNavComponent } from './app-nav/app-nav.component';
import { AppUsersComponent } from './app-users/app-users.component';
import { AppUploadComponent } from './app-upload/app-upload.component';
import { AppBrowseComponent, AppBrowsedComponent } from './app-browse/app-browse.component';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'app-nav', component: AppNavComponent },
  { path: 'app-dash', component: AppDashComponent },
  { path: 'app-users', component: AppUsersComponent },
  { path: 'app-upload', component: AppUploadComponent },
  { path: 'app-browse', component: AppBrowseComponent },
  { path: 'app-browsed', component: AppBrowsedComponent },
  { path: 'app-table', component: TableComponent },
  { path: 'app-form', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =
  [
    AppNavComponent,
    AppDashComponent,
    AppUsersComponent,
    AppUploadComponent,
    AppBrowseComponent,
    AppBrowsedComponent,
    TableComponent,
    FormComponent
  ]