import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DrugsInformationGuard } from './shared/drugs-information.guard';
import { DrugsInformationNewComponent } from './drugs-information-new/drugs-information-new.component';
import { DrugsInformationEditComponent } from './drugs-information-edit/drugs-information-edit.component';
import { DrugsInformationListComponent } from './drugs-information-list/drugs-information-list.component';
import { DrugsInformationViewComponent } from './drugs-information-view/drugs-information-view.component';

const routes: Routes = [
  {
    path: '',
    component: DrugsInformationListComponent,
    canActivate: [DrugsInformationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DrugsInformationNewComponent,
    canActivate: [DrugsInformationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DrugsInformationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DrugsInformationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DrugsInformationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DrugsInformationRoutingModule {
}
