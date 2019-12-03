import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IntroducingTaxCodeForTheGovernorateGuard } from './shared/introducing-tax-code-for-the-governorate.guard';
import { IntroducingTaxCodeForTheGovernorateNewComponent } from './introducing-tax-code-for-the-governorate-new/introducing-tax-code-for-the-governorate-new.component';
import { IntroducingTaxCodeForTheGovernorateEditComponent } from './introducing-tax-code-for-the-governorate-edit/introducing-tax-code-for-the-governorate-edit.component';
import { IntroducingTaxCodeForTheGovernorateListComponent } from './introducing-tax-code-for-the-governorate-list/introducing-tax-code-for-the-governorate-list.component';
import { IntroducingTaxCodeForTheGovernorateViewComponent } from './introducing-tax-code-for-the-governorate-view/introducing-tax-code-for-the-governorate-view.component';

const routes: Routes = [
  {
    path: '',
    component: IntroducingTaxCodeForTheGovernorateListComponent,
    canActivate: [IntroducingTaxCodeForTheGovernorateGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IntroducingTaxCodeForTheGovernorateNewComponent,
    canActivate: [IntroducingTaxCodeForTheGovernorateGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IntroducingTaxCodeForTheGovernorateEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IntroducingTaxCodeForTheGovernorateListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IntroducingTaxCodeForTheGovernorateViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IntroducingTaxCodeForTheGovernorateRoutingModule {
}
