import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SpecializationDataListComponent } from './specialization-data-list/specialization-data-list.component';
import { SpecializationDataEditComponent } from './specialization-data-edit/specialization-data-edit.component';
import { SpecializationDataNewComponent } from './specialization-data-new/specialization-data-new.component';
import { SpecializationDataViewComponent } from './specialization-data-view/specialization-data-view.component';
import { SpecializationDataRoutingModule } from './specialization-data.routing.module';
import { SpecializationDataService } from './shared/specialization-data.service';
import { SpecializationDataGuard } from './shared/specialization-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SpecializationDataListComponent,
    SpecializationDataNewComponent,
    SpecializationDataEditComponent,
    SpecializationDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SpecializationDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SpecializationDataService,
    SpecializationDataGuard
  ],
  entryComponents: [
    SpecializationDataNewComponent,
    SpecializationDataEditComponent,
    SpecializationDataViewComponent
  ]
})

export class SpecializationDataModule {
}
