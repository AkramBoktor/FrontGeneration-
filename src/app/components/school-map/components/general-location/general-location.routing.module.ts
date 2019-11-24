import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { GeneralLocationGuard } from './shared/general-location.guard';
import { GeneralLocationNewComponent } from './general-location-new/general-location-new.component';
import { GeneralLocationEditComponent } from './general-location-edit/general-location-edit.component';
import { GeneralLocationListComponent } from './general-location-list/general-location-list.component';
import { GeneralLocationViewComponent } from './general-location-view/general-location-view.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralLocationListComponent,
    canActivate: [GeneralLocationGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: GeneralLocationNewComponent,
    canActivate: [GeneralLocationGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: GeneralLocationEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: GeneralLocationListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: GeneralLocationViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class GeneralLocationRoutingModule {
}
