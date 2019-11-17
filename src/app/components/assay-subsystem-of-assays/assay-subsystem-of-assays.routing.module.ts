
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssaySubsystemOfAssaysComponent } from './assay-subsystem-of-assays.component';


const routes: Routes = [
  {
    path: '',
    component: AssaySubsystemOfAssaysComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssaySubsystemOfAssaysRoutingModule {
}

