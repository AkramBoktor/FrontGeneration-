
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SecretarialAndArchivesComponent } from './secretarial-and-archives.component';


const routes: Routes = [
  {
    path: '',
    component: SecretarialAndArchivesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SecretarialAndArchivesRoutingModule {
}

