
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayWorkOfCloudsAssaysComponent } from './assay-work-of-clouds-assays.component';


const routes: Routes = [
  {
    path: '',
    component: AssayWorkOfCloudsAssaysComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayWorkOfCloudsAssaysRoutingModule {
}

