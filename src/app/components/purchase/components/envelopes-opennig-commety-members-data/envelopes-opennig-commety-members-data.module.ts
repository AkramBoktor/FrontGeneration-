import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { EnvelopesOpennigCommetyMembersDataListComponent } from './envelopes-opennig-commety-members-data-list/envelopes-opennig-commety-members-data-list.component';
import { EnvelopesOpennigCommetyMembersDataEditComponent } from './envelopes-opennig-commety-members-data-edit/envelopes-opennig-commety-members-data-edit.component';
import { EnvelopesOpennigCommetyMembersDataNewComponent } from './envelopes-opennig-commety-members-data-new/envelopes-opennig-commety-members-data-new.component';
import { EnvelopesOpennigCommetyMembersDataViewComponent } from './envelopes-opennig-commety-members-data-view/envelopes-opennig-commety-members-data-view.component';
import { EnvelopesOpennigCommetyMembersDataRoutingModule } from './envelopes-opennig-commety-members-data.routing.module';
import { EnvelopesOpennigCommetyMembersDataService } from './shared/envelopes-opennig-commety-members-data.service';
import { EnvelopesOpennigCommetyMembersDataGuard } from './shared/envelopes-opennig-commety-members-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    EnvelopesOpennigCommetyMembersDataListComponent,
    EnvelopesOpennigCommetyMembersDataNewComponent,
    EnvelopesOpennigCommetyMembersDataEditComponent,
    EnvelopesOpennigCommetyMembersDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    EnvelopesOpennigCommetyMembersDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    EnvelopesOpennigCommetyMembersDataService,
    EnvelopesOpennigCommetyMembersDataGuard
  ],
  entryComponents: [
    EnvelopesOpennigCommetyMembersDataNewComponent,
    EnvelopesOpennigCommetyMembersDataEditComponent,
    EnvelopesOpennigCommetyMembersDataViewComponent
  ]
})

export class EnvelopesOpennigCommetyMembersDataModule {
}
