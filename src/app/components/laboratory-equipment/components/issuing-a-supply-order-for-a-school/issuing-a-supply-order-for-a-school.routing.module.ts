import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IssuingASupplyOrderForASchoolGuard } from './shared/issuing-a-supply-order-for-a-school.guard';
import { IssuingASupplyOrderForASchoolNewComponent } from './issuing-a-supply-order-for-a-school-new/issuing-a-supply-order-for-a-school-new.component';
import { IssuingASupplyOrderForASchoolEditComponent } from './issuing-a-supply-order-for-a-school-edit/issuing-a-supply-order-for-a-school-edit.component';
import { IssuingASupplyOrderForASchoolListComponent } from './issuing-a-supply-order-for-a-school-list/issuing-a-supply-order-for-a-school-list.component';
import { IssuingASupplyOrderForASchoolViewComponent } from './issuing-a-supply-order-for-a-school-view/issuing-a-supply-order-for-a-school-view.component';

const routes: Routes = [
  {
    path: '',
    component: IssuingASupplyOrderForASchoolListComponent,
    canActivate: [IssuingASupplyOrderForASchoolGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IssuingASupplyOrderForASchoolNewComponent,
    canActivate: [IssuingASupplyOrderForASchoolGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IssuingASupplyOrderForASchoolEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IssuingASupplyOrderForASchoolListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IssuingASupplyOrderForASchoolViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IssuingASupplyOrderForASchoolRoutingModule {
}
