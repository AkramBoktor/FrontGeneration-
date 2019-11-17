import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ThirdpartiesGuard } from './shared/thirdparties.guard';
import { ThirdpartiesNewComponent } from './thirdparties-new/thirdparties-new.component';
import { ThirdpartiesEditComponent } from './thirdparties-edit/thirdparties-edit.component';
import { ThirdpartiesListComponent } from './thirdparties-list/thirdparties-list.component';
import { ThirdpartiesViewComponent } from './thirdparties-view/thirdparties-view.component';

const routes: Routes = [
  {
    path: '',
    component: ThirdpartiesListComponent,
    canActivate: [ThirdpartiesGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ThirdpartiesNewComponent,
    canActivate: [ThirdpartiesGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ThirdpartiesEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ThirdpartiesListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ThirdpartiesViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ThirdpartiesRoutingModule {
}
