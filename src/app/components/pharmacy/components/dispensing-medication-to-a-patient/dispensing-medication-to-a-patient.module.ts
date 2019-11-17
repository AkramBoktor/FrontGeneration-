import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DispensingMedicationToAPatientListComponent } from './dispensing-medication-to-a-patient-list/dispensing-medication-to-a-patient-list.component';
import { DispensingMedicationToAPatientEditComponent } from './dispensing-medication-to-a-patient-edit/dispensing-medication-to-a-patient-edit.component';
import { DispensingMedicationToAPatientNewComponent } from './dispensing-medication-to-a-patient-new/dispensing-medication-to-a-patient-new.component';
import { DispensingMedicationToAPatientViewComponent } from './dispensing-medication-to-a-patient-view/dispensing-medication-to-a-patient-view.component';
import { DispensingMedicationToAPatientRoutingModule } from './dispensing-medication-to-a-patient.routing.module';
import { DispensingMedicationToAPatientService } from './shared/dispensing-medication-to-a-patient.service';
import { DispensingMedicationToAPatientGuard } from './shared/dispensing-medication-to-a-patient.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DispensingMedicationToAPatientListComponent,
    DispensingMedicationToAPatientNewComponent,
    DispensingMedicationToAPatientEditComponent,
    DispensingMedicationToAPatientViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DispensingMedicationToAPatientRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DispensingMedicationToAPatientService,
    DispensingMedicationToAPatientGuard
  ],
  entryComponents: [
    DispensingMedicationToAPatientNewComponent,
    DispensingMedicationToAPatientEditComponent,
    DispensingMedicationToAPatientViewComponent
  ]
})

export class DispensingMedicationToAPatientModule {
}
