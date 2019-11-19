import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { Invoice50Guard } from './shared/invoice-50.guard';
import { Invoice50NewComponent } from './invoice-50-new/invoice-50-new.component';
import { Invoice50EditComponent } from './invoice-50-edit/invoice-50-edit.component';
import { Invoice50ListComponent } from './invoice-50-list/invoice-50-list.component';
import { Invoice50ViewComponent } from './invoice-50-view/invoice-50-view.component';

const routes: Routes = [
  {
    path: '',
    component: Invoice50ListComponent,
    canActivate: [Invoice50Guard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: Invoice50NewComponent,
    canActivate: [Invoice50Guard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: Invoice50EditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: Invoice50ListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: Invoice50ViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class Invoice50RoutingModule {
}
