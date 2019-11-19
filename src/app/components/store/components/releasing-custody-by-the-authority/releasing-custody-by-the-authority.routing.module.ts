import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ReleasingCustodyByTheAuthorityGuard } from './shared/releasing-custody-by-the-authority.guard';
import { ReleasingCustodyByTheAuthorityNewComponent } from './releasing-custody-by-the-authority-new/releasing-custody-by-the-authority-new.component';
import { ReleasingCustodyByTheAuthorityEditComponent } from './releasing-custody-by-the-authority-edit/releasing-custody-by-the-authority-edit.component';
import { ReleasingCustodyByTheAuthorityListComponent } from './releasing-custody-by-the-authority-list/releasing-custody-by-the-authority-list.component';
import { ReleasingCustodyByTheAuthorityViewComponent } from './releasing-custody-by-the-authority-view/releasing-custody-by-the-authority-view.component';

const routes: Routes = [
  {
    path: '',
    component: ReleasingCustodyByTheAuthorityListComponent,
    canActivate: [ReleasingCustodyByTheAuthorityGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ReleasingCustodyByTheAuthorityNewComponent,
    canActivate: [ReleasingCustodyByTheAuthorityGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ReleasingCustodyByTheAuthorityEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ReleasingCustodyByTheAuthorityListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ReleasingCustodyByTheAuthorityViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ReleasingCustodyByTheAuthorityRoutingModule {
}
