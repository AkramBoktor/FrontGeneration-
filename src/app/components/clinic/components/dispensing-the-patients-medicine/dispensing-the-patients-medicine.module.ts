import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DispensingThePatientsMedicineListComponent } from './dispensing-the-patients-medicine-list/dispensing-the-patients-medicine-list.component';
import { DispensingThePatientsMedicineEditComponent } from './dispensing-the-patients-medicine-edit/dispensing-the-patients-medicine-edit.component';
import { DispensingThePatientsMedicineNewComponent } from './dispensing-the-patients-medicine-new/dispensing-the-patients-medicine-new.component';
import { DispensingThePatientsMedicineViewComponent } from './dispensing-the-patients-medicine-view/dispensing-the-patients-medicine-view.component';
import { DispensingThePatientsMedicineRoutingModule } from './dispensing-the-patients-medicine.routing.module';
import { DispensingThePatientsMedicineService } from './shared/dispensing-the-patients-medicine.service';
import { DispensingThePatientsMedicineGuard } from './shared/dispensing-the-patients-medicine.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DispensingThePatientsMedicineListComponent,
    DispensingThePatientsMedicineNewComponent,
    DispensingThePatientsMedicineEditComponent,
    DispensingThePatientsMedicineViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DispensingThePatientsMedicineRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DispensingThePatientsMedicineService,
    DispensingThePatientsMedicineGuard
  ],
  entryComponents: [
    DispensingThePatientsMedicineNewComponent,
    DispensingThePatientsMedicineEditComponent,
    DispensingThePatientsMedicineViewComponent
  ]
})

export class DispensingThePatientsMedicineModule {
}
