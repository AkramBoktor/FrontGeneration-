import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityGuard } from './shared/registering-the-payment-of-statistics-to-its-own-authority.guard';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent } from './registering-the-payment-of-statistics-to-its-own-authority-new/registering-the-payment-of-statistics-to-its-own-authority-new.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent } from './registering-the-payment-of-statistics-to-its-own-authority-edit/registering-the-payment-of-statistics-to-its-own-authority-edit.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityListComponent } from './registering-the-payment-of-statistics-to-its-own-authority-list/registering-the-payment-of-statistics-to-its-own-authority-list.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent } from './registering-the-payment-of-statistics-to-its-own-authority-view/registering-the-payment-of-statistics-to-its-own-authority-view.component';

const routes: Routes = [
  {
    path: '',
    component: RegisteringThePaymentOfStatisticsToItsOwnAuthorityListComponent,
    canActivate: [RegisteringThePaymentOfStatisticsToItsOwnAuthorityGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent,
    canActivate: [RegisteringThePaymentOfStatisticsToItsOwnAuthorityGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: RegisteringThePaymentOfStatisticsToItsOwnAuthorityListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityRoutingModule {
}
