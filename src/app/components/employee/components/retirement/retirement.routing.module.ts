import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RetirementEditComponent } from './retirement-edit/retirement-edit.component';
import { RetirementListComponent } from './retirement-list/retirement-list.component';
import { RetirementNewComponent } from './retirement-new/retirement-new.component';
import { RetirementViewComponent } from './retirement-view/retirement-view.component';
import { RetirementGuard } from './shared/retirement.guard';

const routes: Routes = [
  {
    path: '',
    component: RetirementListComponent,
    canActivate: [RetirementGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RetirementNewComponent,
    canActivate: [RetirementGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RetirementEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RetirementListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RetirementViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RetirementRoutingModule {
}
