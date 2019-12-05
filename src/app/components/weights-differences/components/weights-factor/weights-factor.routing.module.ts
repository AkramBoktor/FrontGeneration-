import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { WeightsFactorGuard } from './shared/weights-factor.guard';
import { WeightsFactorNewComponent } from './weights-factor-new/weights-factor-new.component';
import { WeightsFactorEditComponent } from './weights-factor-edit/weights-factor-edit.component';
import { WeightsFactorListComponent } from './weights-factor-list/weights-factor-list.component';
import { WeightsFactorViewComponent } from './weights-factor-view/weights-factor-view.component';

const routes: Routes = [
  {
    path: '',
    component: WeightsFactorListComponent,
    canActivate: [WeightsFactorGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: WeightsFactorNewComponent,
    canActivate: [WeightsFactorGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: WeightsFactorEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: WeightsFactorListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: WeightsFactorViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class WeightsFactorRoutingModule {
}
