import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GrantCodesListComponent } from './grant-codes-list/grant-codes-list.component';
import { GrantCodesEditComponent } from './grant-codes-edit/grant-codes-edit.component';
import { GrantCodesNewComponent } from './grant-codes-new/grant-codes-new.component';
import { GrantCodesViewComponent } from './grant-codes-view/grant-codes-view.component';
import { GrantCodesRoutingModule } from './grant-codes.routing.module';
import { GrantCodesService } from './shared/grant-codes.service';
import { GrantCodesGuard } from './shared/grant-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GrantCodesListComponent,
    GrantCodesNewComponent,
    GrantCodesEditComponent,
    GrantCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GrantCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GrantCodesService,
    GrantCodesGuard
  ],
  entryComponents: [
    GrantCodesNewComponent,
    GrantCodesEditComponent,
    GrantCodesViewComponent
  ]
})

export class GrantCodesModule {
}
