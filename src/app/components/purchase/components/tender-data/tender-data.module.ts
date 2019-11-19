import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { TenderDataListComponent } from './tender-data-list/tender-data-list.component';
import { TenderDataEditComponent } from './tender-data-edit/tender-data-edit.component';
import { TenderDataNewComponent } from './tender-data-new/tender-data-new.component';
import { TenderDataViewComponent } from './tender-data-view/tender-data-view.component';
import { TenderDataRoutingModule } from './tender-data.routing.module';
import { TenderDataService } from './shared/tender-data.service';
import { TenderDataGuard } from './shared/tender-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    TenderDataListComponent,
    TenderDataNewComponent,
    TenderDataEditComponent,
    TenderDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    TenderDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    TenderDataService,
    TenderDataGuard
  ],
  entryComponents: [
    TenderDataNewComponent,
    TenderDataEditComponent,
    TenderDataViewComponent
  ]
})

export class TenderDataModule {
}
