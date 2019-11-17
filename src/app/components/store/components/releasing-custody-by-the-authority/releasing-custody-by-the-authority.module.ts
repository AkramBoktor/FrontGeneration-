import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ReleasingCustodyByTheAuthorityListComponent } from './releasing-custody-by-the-authority-list/releasing-custody-by-the-authority-list.component';
import { ReleasingCustodyByTheAuthorityEditComponent } from './releasing-custody-by-the-authority-edit/releasing-custody-by-the-authority-edit.component';
import { ReleasingCustodyByTheAuthorityNewComponent } from './releasing-custody-by-the-authority-new/releasing-custody-by-the-authority-new.component';
import { ReleasingCustodyByTheAuthorityViewComponent } from './releasing-custody-by-the-authority-view/releasing-custody-by-the-authority-view.component';
import { ReleasingCustodyByTheAuthorityRoutingModule } from './releasing-custody-by-the-authority.routing.module';
import { ReleasingCustodyByTheAuthorityService } from './shared/releasing-custody-by-the-authority.service';
import { ReleasingCustodyByTheAuthorityGuard } from './shared/releasing-custody-by-the-authority.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ReleasingCustodyByTheAuthorityListComponent,
    ReleasingCustodyByTheAuthorityNewComponent,
    ReleasingCustodyByTheAuthorityEditComponent,
    ReleasingCustodyByTheAuthorityViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ReleasingCustodyByTheAuthorityRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ReleasingCustodyByTheAuthorityService,
    ReleasingCustodyByTheAuthorityGuard
  ],
  entryComponents: [
    ReleasingCustodyByTheAuthorityNewComponent,
    ReleasingCustodyByTheAuthorityEditComponent,
    ReleasingCustodyByTheAuthorityViewComponent
  ]
})

export class ReleasingCustodyByTheAuthorityModule {
}
