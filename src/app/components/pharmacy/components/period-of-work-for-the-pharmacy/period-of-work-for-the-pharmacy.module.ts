import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PeriodOfWorkForThePharmacyListComponent } from './period-of-work-for-the-pharmacy-list/period-of-work-for-the-pharmacy-list.component';
import { PeriodOfWorkForThePharmacyEditComponent } from './period-of-work-for-the-pharmacy-edit/period-of-work-for-the-pharmacy-edit.component';
import { PeriodOfWorkForThePharmacyNewComponent } from './period-of-work-for-the-pharmacy-new/period-of-work-for-the-pharmacy-new.component';
import { PeriodOfWorkForThePharmacyViewComponent } from './period-of-work-for-the-pharmacy-view/period-of-work-for-the-pharmacy-view.component';
import { PeriodOfWorkForThePharmacyRoutingModule } from './period-of-work-for-the-pharmacy.routing.module';
import { PeriodOfWorkForThePharmacyService } from './shared/period-of-work-for-the-pharmacy.service';
import { PeriodOfWorkForThePharmacyGuard } from './shared/period-of-work-for-the-pharmacy.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PeriodOfWorkForThePharmacyListComponent,
    PeriodOfWorkForThePharmacyNewComponent,
    PeriodOfWorkForThePharmacyEditComponent,
    PeriodOfWorkForThePharmacyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PeriodOfWorkForThePharmacyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PeriodOfWorkForThePharmacyService,
    PeriodOfWorkForThePharmacyGuard
  ],
  entryComponents: [
    PeriodOfWorkForThePharmacyNewComponent,
    PeriodOfWorkForThePharmacyEditComponent,
    PeriodOfWorkForThePharmacyViewComponent
  ]
})

export class PeriodOfWorkForThePharmacyModule {
}
