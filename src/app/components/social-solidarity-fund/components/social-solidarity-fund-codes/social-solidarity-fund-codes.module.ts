import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SocialSolidarityFundCodesListComponent } from './social-solidarity-fund-codes-list/social-solidarity-fund-codes-list.component';
import { SocialSolidarityFundCodesEditComponent } from './social-solidarity-fund-codes-edit/social-solidarity-fund-codes-edit.component';
import { SocialSolidarityFundCodesNewComponent } from './social-solidarity-fund-codes-new/social-solidarity-fund-codes-new.component';
import { SocialSolidarityFundCodesViewComponent } from './social-solidarity-fund-codes-view/social-solidarity-fund-codes-view.component';
import { SocialSolidarityFundCodesRoutingModule } from './social-solidarity-fund-codes.routing.module';
import { SocialSolidarityFundCodesService } from './shared/social-solidarity-fund-codes.service';
import { SocialSolidarityFundCodesGuard } from './shared/social-solidarity-fund-codes.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SocialSolidarityFundCodesListComponent,
    SocialSolidarityFundCodesNewComponent,
    SocialSolidarityFundCodesEditComponent,
    SocialSolidarityFundCodesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SocialSolidarityFundCodesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SocialSolidarityFundCodesService,
    SocialSolidarityFundCodesGuard
  ],
  entryComponents: [
    SocialSolidarityFundCodesNewComponent,
    SocialSolidarityFundCodesEditComponent,
    SocialSolidarityFundCodesViewComponent
  ]
})

export class SocialSolidarityFundCodesModule {
}
