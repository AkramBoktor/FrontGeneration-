import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { BoundariesOfThePublicSiteListComponent } from './boundaries-of-the-public-site-list/boundaries-of-the-public-site-list.component';
import { BoundariesOfThePublicSiteEditComponent } from './boundaries-of-the-public-site-edit/boundaries-of-the-public-site-edit.component';
import { BoundariesOfThePublicSiteNewComponent } from './boundaries-of-the-public-site-new/boundaries-of-the-public-site-new.component';
import { BoundariesOfThePublicSiteViewComponent } from './boundaries-of-the-public-site-view/boundaries-of-the-public-site-view.component';
import { BoundariesOfThePublicSiteRoutingModule } from './boundaries-of-the-public-site.routing.module';
import { BoundariesOfThePublicSiteService } from './shared/boundaries-of-the-public-site.service';
import { BoundariesOfThePublicSiteGuard } from './shared/boundaries-of-the-public-site.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    BoundariesOfThePublicSiteListComponent,
    BoundariesOfThePublicSiteNewComponent,
    BoundariesOfThePublicSiteEditComponent,
    BoundariesOfThePublicSiteViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    BoundariesOfThePublicSiteRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    BoundariesOfThePublicSiteService,
    BoundariesOfThePublicSiteGuard
  ],
  entryComponents: [
    BoundariesOfThePublicSiteNewComponent,
    BoundariesOfThePublicSiteEditComponent,
    BoundariesOfThePublicSiteViewComponent
  ]
})

export class BoundariesOfThePublicSiteModule {
}
