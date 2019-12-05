import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataEntryForm129AtTheManagementLevelGuard } from './shared/data-entry-form-129-at-the-management-level.guard';
import { DataEntryForm129AtTheManagementLevelNewComponent } from './data-entry-form-129-at-the-management-level-new/data-entry-form-129-at-the-management-level-new.component';
import { DataEntryForm129AtTheManagementLevelEditComponent } from './data-entry-form-129-at-the-management-level-edit/data-entry-form-129-at-the-management-level-edit.component';
import { DataEntryForm129AtTheManagementLevelListComponent } from './data-entry-form-129-at-the-management-level-list/data-entry-form-129-at-the-management-level-list.component';
import { DataEntryForm129AtTheManagementLevelViewComponent } from './data-entry-form-129-at-the-management-level-view/data-entry-form-129-at-the-management-level-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataEntryForm129AtTheManagementLevelListComponent,
    canActivate: [DataEntryForm129AtTheManagementLevelGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataEntryForm129AtTheManagementLevelNewComponent,
    canActivate: [DataEntryForm129AtTheManagementLevelGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataEntryForm129AtTheManagementLevelEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataEntryForm129AtTheManagementLevelListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataEntryForm129AtTheManagementLevelViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataEntryForm129AtTheManagementLevelRoutingModule {
}
