import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MembershipDataListComponent } from './membership-data-list/membership-data-list.component';
import { MembershipDataEditComponent } from './membership-data-edit/membership-data-edit.component';
import { MembershipDataNewComponent } from './membership-data-new/membership-data-new.component';
import { MembershipDataViewComponent } from './membership-data-view/membership-data-view.component';
import { MembershipDataRoutingModule } from './membership-data.routing.module';
import { MembershipDataService } from './shared/membership-data.service';
import { MembershipDataGuard } from './shared/membership-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MembershipDataListComponent,
    MembershipDataNewComponent,
    MembershipDataEditComponent,
    MembershipDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MembershipDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MembershipDataService,
    MembershipDataGuard
  ],
  entryComponents: [
    MembershipDataNewComponent,
    MembershipDataEditComponent,
    MembershipDataViewComponent
  ]
})

export class MembershipDataModule {
}
