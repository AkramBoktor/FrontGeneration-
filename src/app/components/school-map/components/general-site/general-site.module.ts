import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { GeneralSiteListComponent } from './general-site-list/general-site-list.component';
import { GeneralSiteEditComponent } from './general-site-edit/general-site-edit.component';
import { GeneralSiteNewComponent } from './general-site-new/general-site-new.component';
import { GeneralSiteViewComponent } from './general-site-view/general-site-view.component';
import { GeneralSiteRoutingModule } from './general-site.routing.module';
import { GeneralSiteService } from './shared/general-site.service';
import { GeneralSiteGuard } from './shared/general-site.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    GeneralSiteListComponent,
    GeneralSiteNewComponent,
    GeneralSiteEditComponent,
    GeneralSiteViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    GeneralSiteRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    GeneralSiteService,
    GeneralSiteGuard
  ],
  entryComponents: [
    GeneralSiteNewComponent,
    GeneralSiteEditComponent,
    GeneralSiteViewComponent
  ]
})

export class GeneralSiteModule {
}
