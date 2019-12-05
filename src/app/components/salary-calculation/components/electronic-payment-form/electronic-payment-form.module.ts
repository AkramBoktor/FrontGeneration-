import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ElectronicPaymentFormListComponent } from './electronic-payment-form-list/electronic-payment-form-list.component';
import { ElectronicPaymentFormEditComponent } from './electronic-payment-form-edit/electronic-payment-form-edit.component';
import { ElectronicPaymentFormNewComponent } from './electronic-payment-form-new/electronic-payment-form-new.component';
import { ElectronicPaymentFormViewComponent } from './electronic-payment-form-view/electronic-payment-form-view.component';
import { ElectronicPaymentFormRoutingModule } from './electronic-payment-form.routing.module';
import { ElectronicPaymentFormService } from './shared/electronic-payment-form.service';
import { ElectronicPaymentFormGuard } from './shared/electronic-payment-form.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ElectronicPaymentFormListComponent,
    ElectronicPaymentFormNewComponent,
    ElectronicPaymentFormEditComponent,
    ElectronicPaymentFormViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ElectronicPaymentFormRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ElectronicPaymentFormService,
    ElectronicPaymentFormGuard
  ],
  entryComponents: [
    ElectronicPaymentFormNewComponent,
    ElectronicPaymentFormEditComponent,
    ElectronicPaymentFormViewComponent
  ]
})

export class ElectronicPaymentFormModule {
}
