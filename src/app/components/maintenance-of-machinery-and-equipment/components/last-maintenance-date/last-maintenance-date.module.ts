import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { LastMaintenanceDateListComponent } from './last-maintenance-date-list/last-maintenance-date-list.component';
import { LastMaintenanceDateEditComponent } from './last-maintenance-date-edit/last-maintenance-date-edit.component';
import { LastMaintenanceDateNewComponent } from './last-maintenance-date-new/last-maintenance-date-new.component';
import { LastMaintenanceDateViewComponent } from './last-maintenance-date-view/last-maintenance-date-view.component';
import { LastMaintenanceDateRoutingModule } from './last-maintenance-date.routing.module';
import { LastMaintenanceDateService } from './shared/last-maintenance-date.service';
import { LastMaintenanceDateGuard } from './shared/last-maintenance-date.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    LastMaintenanceDateListComponent,
    LastMaintenanceDateNewComponent,
    LastMaintenanceDateEditComponent,
    LastMaintenanceDateViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    LastMaintenanceDateRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    LastMaintenanceDateService,
    LastMaintenanceDateGuard
  ],
  entryComponents: [
    LastMaintenanceDateNewComponent,
    LastMaintenanceDateEditComponent,
    LastMaintenanceDateViewComponent
  ]
})

export class LastMaintenanceDateModule {
}
