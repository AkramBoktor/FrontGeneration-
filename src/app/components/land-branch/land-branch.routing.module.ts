
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LandBranchComponent } from './land-branch.component';


const routes: Routes = [
  {
    path: '',
    component: LandBranchComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LandBranchRoutingModule {
}

