import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AreaGuard } from './shared/area.guard';
import { AreaNewComponent } from './area-new/area-new.component';
import { AreaEditComponent } from './area-edit/area-edit.component';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaViewComponent } from './area-view/area-view.component';

const routes: Routes = [
  {
    path: '',
    component: AreaListComponent,
    canActivate: [AreaGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AreaNewComponent,
    canActivate: [AreaGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AreaEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AreaListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AreaViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AreaRoutingModule {
}
