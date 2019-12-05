import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ExchangeFormGuard } from './shared/exchange-form.guard';
import { ExchangeFormNewComponent } from './exchange-form-new/exchange-form-new.component';
import { ExchangeFormEditComponent } from './exchange-form-edit/exchange-form-edit.component';
import { ExchangeFormListComponent } from './exchange-form-list/exchange-form-list.component';
import { ExchangeFormViewComponent } from './exchange-form-view/exchange-form-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangeFormListComponent,
    canActivate: [ExchangeFormGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ExchangeFormNewComponent,
    canActivate: [ExchangeFormGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ExchangeFormEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ExchangeFormListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ExchangeFormViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ExchangeFormRoutingModule {
}
