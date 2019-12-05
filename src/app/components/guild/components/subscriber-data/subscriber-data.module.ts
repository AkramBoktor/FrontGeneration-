import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SubscriberDataListComponent } from './subscriber-data-list/subscriber-data-list.component';
import { SubscriberDataEditComponent } from './subscriber-data-edit/subscriber-data-edit.component';
import { SubscriberDataNewComponent } from './subscriber-data-new/subscriber-data-new.component';
import { SubscriberDataViewComponent } from './subscriber-data-view/subscriber-data-view.component';
import { SubscriberDataRoutingModule } from './subscriber-data.routing.module';
import { SubscriberDataService } from './shared/subscriber-data.service';
import { SubscriberDataGuard } from './shared/subscriber-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SubscriberDataListComponent,
    SubscriberDataNewComponent,
    SubscriberDataEditComponent,
    SubscriberDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SubscriberDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SubscriberDataService,
    SubscriberDataGuard
  ],
  entryComponents: [
    SubscriberDataNewComponent,
    SubscriberDataEditComponent,
    SubscriberDataViewComponent
  ]
})

export class SubscriberDataModule {
}
