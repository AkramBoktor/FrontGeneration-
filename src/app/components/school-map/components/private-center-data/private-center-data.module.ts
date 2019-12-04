import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PrivateCenterDataListComponent } from './private-center-data-list/private-center-data-list.component';
import { PrivateCenterDataEditComponent } from './private-center-data-edit/private-center-data-edit.component';
import { PrivateCenterDataNewComponent } from './private-center-data-new/private-center-data-new.component';
import { PrivateCenterDataViewComponent } from './private-center-data-view/private-center-data-view.component';
import { PrivateCenterDataRoutingModule } from './private-center-data.routing.module';
import { PrivateCenterDataService } from './shared/private-center-data.service';
import { PrivateCenterDataGuard } from './shared/private-center-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PrivateCenterDataListComponent,
    PrivateCenterDataNewComponent,
    PrivateCenterDataEditComponent,
    PrivateCenterDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PrivateCenterDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PrivateCenterDataService,
    PrivateCenterDataGuard
  ],
  entryComponents: [
    PrivateCenterDataNewComponent,
    PrivateCenterDataEditComponent,
    PrivateCenterDataViewComponent
  ]
})

export class PrivateCenterDataModule {
}
