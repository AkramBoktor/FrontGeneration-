import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PublishingDataListComponent } from './publishing-data-list/publishing-data-list.component';
import { PublishingDataEditComponent } from './publishing-data-edit/publishing-data-edit.component';
import { PublishingDataNewComponent } from './publishing-data-new/publishing-data-new.component';
import { PublishingDataViewComponent } from './publishing-data-view/publishing-data-view.component';
import { PublishingDataRoutingModule } from './publishing-data.routing.module';
import { PublishingDataService } from './shared/publishing-data.service';
import { PublishingDataGuard } from './shared/publishing-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PublishingDataListComponent,
    PublishingDataNewComponent,
    PublishingDataEditComponent,
    PublishingDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PublishingDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PublishingDataService,
    PublishingDataGuard
  ],
  entryComponents: [
    PublishingDataNewComponent,
    PublishingDataEditComponent,
    PublishingDataViewComponent
  ]
})

export class PublishingDataModule {
}
