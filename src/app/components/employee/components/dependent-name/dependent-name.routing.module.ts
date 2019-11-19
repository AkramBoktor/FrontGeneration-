import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependentNameEditComponent } from './dependent-name-edit/dependent-name-edit.component';
import { DependentNameListComponent } from './dependent-name-list/dependent-name-list.component';
import { DependentNameNewComponent } from './dependent-name-new/dependent-name-new.component';
import { DependentNameViewComponent } from './dependent-name-view/dependent-name-view.component';
import { DependentNameGuard } from './shared/dependent-name.guard';

const routes: Routes = [
  {
    path: '',
    component: DependentNameListComponent,
    canActivate: [DependentNameGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DependentNameNewComponent,
    canActivate: [DependentNameGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DependentNameEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DependentNameListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DependentNameViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DependentNameRoutingModule {
}
