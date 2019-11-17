
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayUnctionsOfItemsAndElementsOfTheProjectComponent } from './assay-unctions-of-items-and-elements-of-the-project.component';


const routes: Routes = [
  {
    path: '',
    component: AssayUnctionsOfItemsAndElementsOfTheProjectComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayUnctionsOfItemsAndElementsOfTheProjectRoutingModule {
}

