import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GeneralLocationListComponent } from './general-location-list/general-location-list.component';
import { GeneralLocationEditComponent } from './general-location-edit/general-location-edit.component';
import { GeneralLocationNewComponent } from './general-location-new/general-location-new.component';
import { GeneralLocationViewComponent } from './general-location-view/general-location-view.component';
import { GeneralLocationRoutingModule } from './general-location.routing.module';
import { GeneralLocationService } from './shared/general-location.service';
import { GeneralLocationGuard } from './shared/general-location.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GeneralLocationListComponent,
    GeneralLocationNewComponent,
    GeneralLocationEditComponent,
    GeneralLocationViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GeneralLocationRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GeneralLocationService,
    GeneralLocationGuard
  ],
  entryComponents: [
    GeneralLocationNewComponent,
    GeneralLocationEditComponent,
    GeneralLocationViewComponent
  ]
})

export class GeneralLocationModule {
}
