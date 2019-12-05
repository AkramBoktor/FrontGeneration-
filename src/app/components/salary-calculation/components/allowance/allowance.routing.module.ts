import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AllowanceGuard } from './shared/allowance.guard';
import { AllowanceNewComponent } from './allowance-new/allowance-new.component';
import { AllowanceEditComponent } from './allowance-edit/allowance-edit.component';
import { AllowanceListComponent } from './allowance-list/allowance-list.component';
import { AllowanceViewComponent } from './allowance-view/allowance-view.component';

const routes: Routes = [
  {
    path: '',
    component: AllowanceListComponent,
    canActivate: [AllowanceGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AllowanceNewComponent,
    canActivate: [AllowanceGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AllowanceEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AllowanceListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AllowanceViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AllowanceRoutingModule {
}
