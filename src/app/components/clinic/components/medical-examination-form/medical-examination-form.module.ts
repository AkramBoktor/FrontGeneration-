import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MedicalExaminationFormListComponent } from './medical-examination-form-list/medical-examination-form-list.component';
import { MedicalExaminationFormEditComponent } from './medical-examination-form-edit/medical-examination-form-edit.component';
import { MedicalExaminationFormNewComponent } from './medical-examination-form-new/medical-examination-form-new.component';
import { MedicalExaminationFormViewComponent } from './medical-examination-form-view/medical-examination-form-view.component';
import { MedicalExaminationFormRoutingModule } from './medical-examination-form.routing.module';
import { MedicalExaminationFormService } from './shared/medical-examination-form.service';
import { MedicalExaminationFormGuard } from './shared/medical-examination-form.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MedicalExaminationFormListComponent,
    MedicalExaminationFormNewComponent,
    MedicalExaminationFormEditComponent,
    MedicalExaminationFormViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MedicalExaminationFormRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MedicalExaminationFormService,
    MedicalExaminationFormGuard
  ],
  entryComponents: [
    MedicalExaminationFormNewComponent,
    MedicalExaminationFormEditComponent,
    MedicalExaminationFormViewComponent
  ]
})

export class MedicalExaminationFormModule {
}
