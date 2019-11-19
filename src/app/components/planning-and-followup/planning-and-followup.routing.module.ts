
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PlanningAndFollowupComponent } from './planning-and-followup.component';


const routes: Routes = [
  {
    path: '',
    component: PlanningAndFollowupComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PlanningAndFollowupRoutingModule {
}

