import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { CanceledTenderListComponent } from './canceled-tender-list/canceled-tender-list.component';
import { CanceledTenderEditComponent } from './canceled-tender-edit/canceled-tender-edit.component';
import { CanceledTenderNewComponent } from './canceled-tender-new/canceled-tender-new.component';
import { CanceledTenderViewComponent } from './canceled-tender-view/canceled-tender-view.component';
import { CanceledTenderRoutingModule } from './canceled-tender.routing.module';
import { CanceledTenderService } from './shared/canceled-tender.service';
import { CanceledTenderGuard } from './shared/canceled-tender.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    CanceledTenderListComponent,
    CanceledTenderNewComponent,
    CanceledTenderEditComponent,
    CanceledTenderViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    CanceledTenderRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    CanceledTenderService,
    CanceledTenderGuard
  ],
  entryComponents: [
    CanceledTenderNewComponent,
    CanceledTenderEditComponent,
    CanceledTenderViewComponent
  ]
})

export class CanceledTenderModule {
}
