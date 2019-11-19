
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SchoolBranchesMapComponent } from './school-branches-map.component';


const routes: Routes = [
  {
    path: '',
    component: SchoolBranchesMapComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SchoolBranchesMapRoutingModule {
}

