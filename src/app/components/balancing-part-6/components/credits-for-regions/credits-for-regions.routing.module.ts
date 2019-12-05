import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CreditsForRegionsGuard } from './shared/credits-for-regions.guard';
import { CreditsForRegionsNewComponent } from './credits-for-regions-new/credits-for-regions-new.component';
import { CreditsForRegionsEditComponent } from './credits-for-regions-edit/credits-for-regions-edit.component';
import { CreditsForRegionsListComponent } from './credits-for-regions-list/credits-for-regions-list.component';
import { CreditsForRegionsViewComponent } from './credits-for-regions-view/credits-for-regions-view.component';

const routes: Routes = [
  {
    path: '',
    component: CreditsForRegionsListComponent,
    canActivate: [CreditsForRegionsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: CreditsForRegionsNewComponent,
    canActivate: [CreditsForRegionsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: CreditsForRegionsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: CreditsForRegionsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: CreditsForRegionsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class CreditsForRegionsRoutingModule {
}
