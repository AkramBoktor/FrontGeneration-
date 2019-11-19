import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SanctionsFundEditComponent } from './sanctions-fund-edit/sanctions-fund-edit.component';
import { SanctionsFundListComponent } from './sanctions-fund-list/sanctions-fund-list.component';
import { SanctionsFundNewComponent } from './sanctions-fund-new/sanctions-fund-new.component';
import { SanctionsFundViewComponent } from './sanctions-fund-view/sanctions-fund-view.component';
import { SanctionsFundRoutingModule } from './sanctions-fund.routing.module';
import { SanctionsFundGuard } from './shared/sanctions-fund.guard';
import { SanctionsFundService } from './shared/sanctions-fund.service';

@NgModule({
  declarations: [
    SanctionsFundListComponent,
    SanctionsFundNewComponent,
    SanctionsFundEditComponent,
    SanctionsFundViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SanctionsFundRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SanctionsFundService,
    SanctionsFundGuard
  ],
  entryComponents: [
    SanctionsFundNewComponent,
    SanctionsFundEditComponent,
    SanctionsFundViewComponent
  ]
})

export class SanctionsFundModule {
}
