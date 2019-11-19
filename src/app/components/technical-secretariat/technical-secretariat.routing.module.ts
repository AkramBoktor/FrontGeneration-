
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TechnicalSecretariatComponent } from './technical-secretariat.component';


const routes: Routes = [
  {
    path: '',
    component: TechnicalSecretariatComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TechnicalSecretariatRoutingModule {
}

