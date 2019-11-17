import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ThirdPartyCodesGuard } from './shared/third-party-codes.guard';
import { ThirdPartyCodesService } from './shared/third-party-codes.service';
import { ThirdPartyCodesEditComponent } from './third-party-codes-edit/third-party-codes-edit.component';
import { ThirdPartyCodesListComponent } from './third-party-codes-list/third-party-codes-list.component';
import { ThirdPartyCodesNewComponent } from './third-party-codes-new/third-party-codes-new.component';
import { ThirdPartyCodesViewComponent } from './third-party-codes-view/third-party-codes-view.component';
import { ThirdPartyCodesRoutingModule } from './third-party-codes.routing.module';

@NgModule({
  declarations: [
    ThirdPartyCodesListComponent,
    ThirdPartyCodesNewComponent,
    ThirdPartyCodesEditComponent,
    ThirdPartyCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ThirdPartyCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ThirdPartyCodesService,
    ThirdPartyCodesGuard
  ],
  entryComponents: [
    ThirdPartyCodesNewComponent,
    ThirdPartyCodesEditComponent,
    ThirdPartyCodesViewComponent
  ]
})

export class ThirdPartyCodesModule {
}
