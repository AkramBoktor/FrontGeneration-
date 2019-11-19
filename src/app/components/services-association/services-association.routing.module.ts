
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ServicesAssociationComponent } from './services-association.component';


const routes: Routes = [
  {
    path: '',
    component: ServicesAssociationComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ServicesAssociationRoutingModule {
}

