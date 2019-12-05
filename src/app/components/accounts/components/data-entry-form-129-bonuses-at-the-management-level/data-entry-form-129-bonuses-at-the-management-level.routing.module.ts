import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DataEntryForm129BonusesAtTheManagementLevelGuard } from './shared/data-entry-form-129-bonuses-at-the-management-level.guard';
import { DataEntryForm129BonusesAtTheManagementLevelNewComponent } from './data-entry-form-129-bonuses-at-the-management-level-new/data-entry-form-129-bonuses-at-the-management-level-new.component';
import { DataEntryForm129BonusesAtTheManagementLevelEditComponent } from './data-entry-form-129-bonuses-at-the-management-level-edit/data-entry-form-129-bonuses-at-the-management-level-edit.component';
import { DataEntryForm129BonusesAtTheManagementLevelListComponent } from './data-entry-form-129-bonuses-at-the-management-level-list/data-entry-form-129-bonuses-at-the-management-level-list.component';
import { DataEntryForm129BonusesAtTheManagementLevelViewComponent } from './data-entry-form-129-bonuses-at-the-management-level-view/data-entry-form-129-bonuses-at-the-management-level-view.component';

const routes: Routes = [
  {
    path: '',
    component: DataEntryForm129BonusesAtTheManagementLevelListComponent,
    canActivate: [DataEntryForm129BonusesAtTheManagementLevelGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DataEntryForm129BonusesAtTheManagementLevelNewComponent,
    canActivate: [DataEntryForm129BonusesAtTheManagementLevelGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DataEntryForm129BonusesAtTheManagementLevelEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DataEntryForm129BonusesAtTheManagementLevelListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DataEntryForm129BonusesAtTheManagementLevelViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DataEntryForm129BonusesAtTheManagementLevelRoutingModule {
}
