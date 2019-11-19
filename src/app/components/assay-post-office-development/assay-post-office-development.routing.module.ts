
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayPostOfficeDevelopmentComponent } from './assay-post-office-development.component';


const routes: Routes = [
  {
    path: '',
    component: AssayPostOfficeDevelopmentComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayPostOfficeDevelopmentRoutingModule {
}

