
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AssayListOfCreationOfWorksOfOthersComponent } from './assay-list-of-creation-of-works-of-others.component';


const routes: Routes = [
  {
    path: '',
    component: AssayListOfCreationOfWorksOfOthersComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AssayListOfCreationOfWorksOfOthersRoutingModule {
}

