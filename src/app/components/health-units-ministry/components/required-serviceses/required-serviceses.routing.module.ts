import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RequiredServicesesGuard } from './shared/required-serviceses.guard';
import { RequiredServicesesNewComponent } from './required-serviceses-new/required-serviceses-new.component';
import { RequiredServicesesEditComponent } from './required-serviceses-edit/required-serviceses-edit.component';
import { RequiredServicesesListComponent } from './required-serviceses-list/required-serviceses-list.component';
import { RequiredServicesesViewComponent } from './required-serviceses-view/required-serviceses-view.component';

const routes: Routes = [
  {
    path: '',
    component: RequiredServicesesListComponent,
    canActivate: [RequiredServicesesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RequiredServicesesNewComponent,
    canActivate: [RequiredServicesesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RequiredServicesesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RequiredServicesesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RequiredServicesesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RequiredServicesesRoutingModule {
}
