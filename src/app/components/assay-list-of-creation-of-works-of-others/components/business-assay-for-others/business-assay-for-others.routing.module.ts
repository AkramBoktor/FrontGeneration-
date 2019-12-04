import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { BusinessAssayForOthersGuard } from './shared/business-assay-for-others.guard';
import { BusinessAssayForOthersNewComponent } from './business-assay-for-others-new/business-assay-for-others-new.component';
import { BusinessAssayForOthersEditComponent } from './business-assay-for-others-edit/business-assay-for-others-edit.component';
import { BusinessAssayForOthersListComponent } from './business-assay-for-others-list/business-assay-for-others-list.component';
import { BusinessAssayForOthersViewComponent } from './business-assay-for-others-view/business-assay-for-others-view.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessAssayForOthersListComponent,
    canActivate: [BusinessAssayForOthersGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: BusinessAssayForOthersNewComponent,
    canActivate: [BusinessAssayForOthersGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: BusinessAssayForOthersEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: BusinessAssayForOthersListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: BusinessAssayForOthersViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class BusinessAssayForOthersRoutingModule {
}
