import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EnvelopesOpennigCommetyDataListComponent } from './envelopes-opennig-commety-data-list/envelopes-opennig-commety-data-list.component';
import { EnvelopesOpennigCommetyDataEditComponent } from './envelopes-opennig-commety-data-edit/envelopes-opennig-commety-data-edit.component';
import { EnvelopesOpennigCommetyDataNewComponent } from './envelopes-opennig-commety-data-new/envelopes-opennig-commety-data-new.component';
import { EnvelopesOpennigCommetyDataViewComponent } from './envelopes-opennig-commety-data-view/envelopes-opennig-commety-data-view.component';
import { EnvelopesOpennigCommetyDataRoutingModule } from './envelopes-opennig-commety-data.routing.module';
import { EnvelopesOpennigCommetyDataService } from './shared/envelopes-opennig-commety-data.service';
import { EnvelopesOpennigCommetyDataGuard } from './shared/envelopes-opennig-commety-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EnvelopesOpennigCommetyDataListComponent,
    EnvelopesOpennigCommetyDataNewComponent,
    EnvelopesOpennigCommetyDataEditComponent,
    EnvelopesOpennigCommetyDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EnvelopesOpennigCommetyDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EnvelopesOpennigCommetyDataService,
    EnvelopesOpennigCommetyDataGuard
  ],
  entryComponents: [
    EnvelopesOpennigCommetyDataNewComponent,
    EnvelopesOpennigCommetyDataEditComponent,
    EnvelopesOpennigCommetyDataViewComponent
  ]
})

export class EnvelopesOpennigCommetyDataModule {
}
