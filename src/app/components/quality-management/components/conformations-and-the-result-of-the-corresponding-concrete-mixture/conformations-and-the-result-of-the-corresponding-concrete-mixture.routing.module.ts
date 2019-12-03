import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureGuard } from './shared/conformations-and-the-result-of-the-corresponding-concrete-mixture.guard';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-new/conformations-and-the-result-of-the-corresponding-concrete-mixture-new.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-edit/conformations-and-the-result-of-the-corresponding-concrete-mixture-edit.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureListComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-list/conformations-and-the-result-of-the-corresponding-concrete-mixture-list.component';
import { ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent } from './conformations-and-the-result-of-the-corresponding-concrete-mixture-view/conformations-and-the-result-of-the-corresponding-concrete-mixture-view.component';

const routes: Routes = [
  {
    path: '',
    component: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureListComponent,
    canActivate: [ConformationsAndTheResultOfTheCorrespondingConcreteMixtureGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureNewComponent,
    canActivate: [ConformationsAndTheResultOfTheCorrespondingConcreteMixtureGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ConformationsAndTheResultOfTheCorrespondingConcreteMixtureViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ConformationsAndTheResultOfTheCorrespondingConcreteMixtureRoutingModule {
}
