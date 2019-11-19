import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanctionsFundEditComponent } from './sanctions-fund-edit/sanctions-fund-edit.component';
import { SanctionsFundListComponent } from './sanctions-fund-list/sanctions-fund-list.component';
import { SanctionsFundNewComponent } from './sanctions-fund-new/sanctions-fund-new.component';
import { SanctionsFundViewComponent } from './sanctions-fund-view/sanctions-fund-view.component';
import { SanctionsFundGuard } from './shared/sanctions-fund.guard';

const routes: Routes = [
  {
    path: '',
    component: SanctionsFundListComponent,
    canActivate: [SanctionsFundGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SanctionsFundNewComponent,
    canActivate: [SanctionsFundGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SanctionsFundEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SanctionsFundListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SanctionsFundViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SanctionsFundRoutingModule {
}
