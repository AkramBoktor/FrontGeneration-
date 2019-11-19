
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BalancingPart1Component } from './balancing-part-1.component';


const routes: Routes = [
  {
    path: '',
    component: BalancingPart1Component,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BalancingPart1RoutingModule {
}

