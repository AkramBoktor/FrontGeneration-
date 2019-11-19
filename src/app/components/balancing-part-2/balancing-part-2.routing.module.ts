
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BalancingPart2Component } from './balancing-part-2.component';


const routes: Routes = [
  {
    path: '',
    component: BalancingPart2Component,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BalancingPart2RoutingModule {
}

