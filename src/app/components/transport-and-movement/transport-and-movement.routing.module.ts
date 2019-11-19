
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TransportAndMovementComponent } from './transport-and-movement.component';


const routes: Routes = [
  {
    path: '',
    component: TransportAndMovementComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TransportAndMovementRoutingModule {
}

