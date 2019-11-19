
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ResearchAndStudiesComponent } from './research-and-studies.component';


const routes: Routes = [
  {
    path: '',
    component: ResearchAndStudiesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ResearchAndStudiesRoutingModule {
}

