import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryGuard } from './shared/linking-codes-schools-with-codes-schools-ministry.guard';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent } from './linking-codes-schools-with-codes-schools-ministry-new/linking-codes-schools-with-codes-schools-ministry-new.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent } from './linking-codes-schools-with-codes-schools-ministry-edit/linking-codes-schools-with-codes-schools-ministry-edit.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryListComponent } from './linking-codes-schools-with-codes-schools-ministry-list/linking-codes-schools-with-codes-schools-ministry-list.component';
import { LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent } from './linking-codes-schools-with-codes-schools-ministry-view/linking-codes-schools-with-codes-schools-ministry-view.component';

const routes: Routes = [
  {
    path: '',
    component: LinkingCodesSchoolsWithCodesSchoolsMinistryListComponent,
    canActivate: [LinkingCodesSchoolsWithCodesSchoolsMinistryGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LinkingCodesSchoolsWithCodesSchoolsMinistryNewComponent,
    canActivate: [LinkingCodesSchoolsWithCodesSchoolsMinistryGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LinkingCodesSchoolsWithCodesSchoolsMinistryEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LinkingCodesSchoolsWithCodesSchoolsMinistryListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LinkingCodesSchoolsWithCodesSchoolsMinistryViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LinkingCodesSchoolsWithCodesSchoolsMinistryRoutingModule {
}
