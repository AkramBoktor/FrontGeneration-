import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TypicalFormADisbursementFormListComponent } from './typical-form-a-disbursement-form-list/typical-form-a-disbursement-form-list.component';
import { TypicalFormADisbursementFormEditComponent } from './typical-form-a-disbursement-form-edit/typical-form-a-disbursement-form-edit.component';
import { TypicalFormADisbursementFormNewComponent } from './typical-form-a-disbursement-form-new/typical-form-a-disbursement-form-new.component';
import { TypicalFormADisbursementFormViewComponent } from './typical-form-a-disbursement-form-view/typical-form-a-disbursement-form-view.component';
import { TypicalFormADisbursementFormRoutingModule } from './typical-form-a-disbursement-form.routing.module';
import { TypicalFormADisbursementFormService } from './shared/typical-form-a-disbursement-form.service';
import { TypicalFormADisbursementFormGuard } from './shared/typical-form-a-disbursement-form.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TypicalFormADisbursementFormListComponent,
    TypicalFormADisbursementFormNewComponent,
    TypicalFormADisbursementFormEditComponent,
    TypicalFormADisbursementFormViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TypicalFormADisbursementFormRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TypicalFormADisbursementFormService,
    TypicalFormADisbursementFormGuard
  ],
  entryComponents: [
    TypicalFormADisbursementFormNewComponent,
    TypicalFormADisbursementFormEditComponent,
    TypicalFormADisbursementFormViewComponent
  ]
})

export class TypicalFormADisbursementFormModule {
}
