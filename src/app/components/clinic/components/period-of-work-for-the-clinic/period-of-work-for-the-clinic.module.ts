import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PeriodOfWorkForTheClinicListComponent } from './period-of-work-for-the-clinic-list/period-of-work-for-the-clinic-list.component';
import { PeriodOfWorkForTheClinicEditComponent } from './period-of-work-for-the-clinic-edit/period-of-work-for-the-clinic-edit.component';
import { PeriodOfWorkForTheClinicNewComponent } from './period-of-work-for-the-clinic-new/period-of-work-for-the-clinic-new.component';
import { PeriodOfWorkForTheClinicViewComponent } from './period-of-work-for-the-clinic-view/period-of-work-for-the-clinic-view.component';
import { PeriodOfWorkForTheClinicRoutingModule } from './period-of-work-for-the-clinic.routing.module';
import { PeriodOfWorkForTheClinicService } from './shared/period-of-work-for-the-clinic.service';
import { PeriodOfWorkForTheClinicGuard } from './shared/period-of-work-for-the-clinic.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PeriodOfWorkForTheClinicListComponent,
    PeriodOfWorkForTheClinicNewComponent,
    PeriodOfWorkForTheClinicEditComponent,
    PeriodOfWorkForTheClinicViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PeriodOfWorkForTheClinicRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PeriodOfWorkForTheClinicService,
    PeriodOfWorkForTheClinicGuard
  ],
  entryComponents: [
    PeriodOfWorkForTheClinicNewComponent,
    PeriodOfWorkForTheClinicEditComponent,
    PeriodOfWorkForTheClinicViewComponent
  ]
})

export class PeriodOfWorkForTheClinicModule {
}
