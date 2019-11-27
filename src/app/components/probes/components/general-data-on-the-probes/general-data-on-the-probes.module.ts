import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GeneralDataOnTheProbesListComponent } from './general-data-on-the-probes-list/general-data-on-the-probes-list.component';
import { GeneralDataOnTheProbesEditComponent } from './general-data-on-the-probes-edit/general-data-on-the-probes-edit.component';
import { GeneralDataOnTheProbesNewComponent } from './general-data-on-the-probes-new/general-data-on-the-probes-new.component';
import { GeneralDataOnTheProbesViewComponent } from './general-data-on-the-probes-view/general-data-on-the-probes-view.component';
import { GeneralDataOnTheProbesRoutingModule } from './general-data-on-the-probes.routing.module';
import { GeneralDataOnTheProbesService } from './shared/general-data-on-the-probes.service';
import { GeneralDataOnTheProbesGuard } from './shared/general-data-on-the-probes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GeneralDataOnTheProbesListComponent,
    GeneralDataOnTheProbesNewComponent,
    GeneralDataOnTheProbesEditComponent,
    GeneralDataOnTheProbesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GeneralDataOnTheProbesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GeneralDataOnTheProbesService,
    GeneralDataOnTheProbesGuard
  ],
  entryComponents: [
    GeneralDataOnTheProbesNewComponent,
    GeneralDataOnTheProbesEditComponent,
    GeneralDataOnTheProbesViewComponent
  ]
})

export class GeneralDataOnTheProbesModule {
}
