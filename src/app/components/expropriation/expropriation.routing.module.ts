
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExpropriationComponent } from './expropriation.component';


const routes: Routes = [
  {
    path: '',
    component: ExpropriationComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExpropriationRoutingModule {
}

