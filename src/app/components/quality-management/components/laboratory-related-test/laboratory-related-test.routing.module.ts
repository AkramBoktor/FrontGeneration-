import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LaboratoryRelatedTestGuard } from './shared/laboratory-related-test.guard';
import { LaboratoryRelatedTestNewComponent } from './laboratory-related-test-new/laboratory-related-test-new.component';
import { LaboratoryRelatedTestEditComponent } from './laboratory-related-test-edit/laboratory-related-test-edit.component';
import { LaboratoryRelatedTestListComponent } from './laboratory-related-test-list/laboratory-related-test-list.component';
import { LaboratoryRelatedTestViewComponent } from './laboratory-related-test-view/laboratory-related-test-view.component';

const routes: Routes = [
  {
    path: '',
    component: LaboratoryRelatedTestListComponent,
    canActivate: [LaboratoryRelatedTestGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LaboratoryRelatedTestNewComponent,
    canActivate: [LaboratoryRelatedTestGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LaboratoryRelatedTestEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LaboratoryRelatedTestListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LaboratoryRelatedTestViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LaboratoryRelatedTestRoutingModule {
}
