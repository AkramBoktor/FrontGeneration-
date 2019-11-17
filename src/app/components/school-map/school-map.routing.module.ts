
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolMapComponent } from './school-map.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolMapComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolMapRoutingModule {
}

