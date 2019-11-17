
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CompetitionsPersonnelAffairsComponent } from './competitions-personnel-affairs.component';


const routes: Routes = [
  {
    path: '',
    component: CompetitionsPersonnelAffairsComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CompetitionsPersonnelAffairsRoutingModule {
}

