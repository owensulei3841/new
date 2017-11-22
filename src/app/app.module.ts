import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { SearchComponent } from './students/search/search.component';

import {StudentService} from './services/student.service';
import { FilterPipe } from './pipes/filter.pipe';


const appRoutes : Routes = [
  {path:'', component:StudentsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    SearchComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
