import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourListComponent } from './tour-list/tour-list/tour-list.component';
import { TourFormComponent } from './tour-form/tour-form.component';
import { TourLogListComponent } from './tour-log-list/tour-log-list.component';
import { TourDetailComponent } from './tour-detail/tour-detail.component';

const routes: Routes = [
  { path: 'tours', component : TourListComponent},
  { path: 'addtour', component : TourFormComponent},
  { path: 'tour-logs/:tourId', component: TourLogListComponent},
  { path: 'tour-detail/:tourId', component : TourDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
