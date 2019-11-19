
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { InternationalCooperationComponent } from './international-cooperation.component';


const routes: Routes = [
  {
    path: '',
    component: InternationalCooperationComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class InternationalCooperationRoutingModule {
}

