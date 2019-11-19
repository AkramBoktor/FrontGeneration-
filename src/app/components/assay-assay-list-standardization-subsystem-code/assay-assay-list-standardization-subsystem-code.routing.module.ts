
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayAssayListStandardizationSubsystemCodeComponent } from './assay-assay-list-standardization-subsystem-code.component';


const routes: Routes = [
  {
    path: '',
    component: AssayAssayListStandardizationSubsystemCodeComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayAssayListStandardizationSubsystemCodeRoutingModule {
}

