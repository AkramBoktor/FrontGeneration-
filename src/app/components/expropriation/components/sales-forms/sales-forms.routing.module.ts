import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SalesFormsGuard } from './shared/sales-forms.guard';
import { SalesFormsNewComponent } from './sales-forms-new/sales-forms-new.component';
import { SalesFormsEditComponent } from './sales-forms-edit/sales-forms-edit.component';
import { SalesFormsListComponent } from './sales-forms-list/sales-forms-list.component';
import { SalesFormsViewComponent } from './sales-forms-view/sales-forms-view.component';

const routes: Routes = [
  {
    path: '',
    component: SalesFormsListComponent,
    canActivate: [SalesFormsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: SalesFormsNewComponent,
    canActivate: [SalesFormsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: SalesFormsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: SalesFormsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: SalesFormsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class SalesFormsRoutingModule {
}
