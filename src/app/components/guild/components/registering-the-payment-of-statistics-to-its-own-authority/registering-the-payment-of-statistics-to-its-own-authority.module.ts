import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityListComponent } from './registering-the-payment-of-statistics-to-its-own-authority-list/registering-the-payment-of-statistics-to-its-own-authority-list.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent } from './registering-the-payment-of-statistics-to-its-own-authority-edit/registering-the-payment-of-statistics-to-its-own-authority-edit.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent } from './registering-the-payment-of-statistics-to-its-own-authority-new/registering-the-payment-of-statistics-to-its-own-authority-new.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent } from './registering-the-payment-of-statistics-to-its-own-authority-view/registering-the-payment-of-statistics-to-its-own-authority-view.component';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityRoutingModule } from './registering-the-payment-of-statistics-to-its-own-authority.routing.module';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityService } from './shared/registering-the-payment-of-statistics-to-its-own-authority.service';
import { RegisteringThePaymentOfStatisticsToItsOwnAuthorityGuard } from './shared/registering-the-payment-of-statistics-to-its-own-authority.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityListComponent,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityService,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityGuard
  ],
  entryComponents: [
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityNewComponent,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityEditComponent,
    RegisteringThePaymentOfStatisticsToItsOwnAuthorityViewComponent
  ]
})

export class RegisteringThePaymentOfStatisticsToItsOwnAuthorityModule {
}
