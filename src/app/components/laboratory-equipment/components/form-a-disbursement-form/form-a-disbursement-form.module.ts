import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { FormADisbursementFormListComponent } from './form-a-disbursement-form-list/form-a-disbursement-form-list.component';
import { FormADisbursementFormEditComponent } from './form-a-disbursement-form-edit/form-a-disbursement-form-edit.component';
import { FormADisbursementFormNewComponent } from './form-a-disbursement-form-new/form-a-disbursement-form-new.component';
import { FormADisbursementFormViewComponent } from './form-a-disbursement-form-view/form-a-disbursement-form-view.component';
import { FormADisbursementFormRoutingModule } from './form-a-disbursement-form.routing.module';
import { FormADisbursementFormService } from './shared/form-a-disbursement-form.service';
import { FormADisbursementFormGuard } from './shared/form-a-disbursement-form.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    FormADisbursementFormListComponent,
    FormADisbursementFormNewComponent,
    FormADisbursementFormEditComponent,
    FormADisbursementFormViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    FormADisbursementFormRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    FormADisbursementFormService,
    FormADisbursementFormGuard
  ],
  entryComponents: [
    FormADisbursementFormNewComponent,
    FormADisbursementFormEditComponent,
    FormADisbursementFormViewComponent
  ]
})

export class FormADisbursementFormModule {
}
