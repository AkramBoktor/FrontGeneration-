import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AdequacyEditComponent } from './adequacy-edit/adequacy-edit.component';
import { AdequacyListComponent } from './adequacy-list/adequacy-list.component';
import { AdequacyNewComponent } from './adequacy-new/adequacy-new.component';
import { AdequacyViewComponent } from './adequacy-view/adequacy-view.component';
import { AdequacyRoutingModule } from './adequacy.routing.module';
import { AdequacyGuard } from './shared/adequacy.guard';
import { AdequacyService } from './shared/adequacy.service';

@NgModule({
  declarations: [
    AdequacyListComponent,
    AdequacyNewComponent,
    AdequacyEditComponent,
    AdequacyViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AdequacyRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AdequacyService,
    AdequacyGuard
  ],
  entryComponents: [
    AdequacyNewComponent,
    AdequacyEditComponent,
    AdequacyViewComponent
  ]
})

export class AdequacyModule {
}
