
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayComponent } from './assay.component';


const routes: Routes = [
  {
    path: '',
    component: AssayComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayRoutingModule {
}

