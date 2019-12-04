import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolPeriodListComponent } from './school-period-list/school-period-list.component';
import { SchoolPeriodEditComponent } from './school-period-edit/school-period-edit.component';
import { SchoolPeriodNewComponent } from './school-period-new/school-period-new.component';
import { SchoolPeriodViewComponent } from './school-period-view/school-period-view.component';
import { SchoolPeriodRoutingModule } from './school-period.routing.module';
import { SchoolPeriodService } from './shared/school-period.service';
import { SchoolPeriodGuard } from './shared/school-period.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolPeriodListComponent,
    SchoolPeriodNewComponent,
    SchoolPeriodEditComponent,
    SchoolPeriodViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolPeriodRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolPeriodService,
    SchoolPeriodGuard
  ],
  entryComponents: [
    SchoolPeriodNewComponent,
    SchoolPeriodEditComponent,
    SchoolPeriodViewComponent
  ]
})

export class SchoolPeriodModule {
}
