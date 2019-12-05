import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { PublicSiteBoundaryDataListComponent } from './public-site-boundary-data-list/public-site-boundary-data-list.component';
import { PublicSiteBoundaryDataEditComponent } from './public-site-boundary-data-edit/public-site-boundary-data-edit.component';
import { PublicSiteBoundaryDataNewComponent } from './public-site-boundary-data-new/public-site-boundary-data-new.component';
import { PublicSiteBoundaryDataViewComponent } from './public-site-boundary-data-view/public-site-boundary-data-view.component';
import { PublicSiteBoundaryDataRoutingModule } from './public-site-boundary-data.routing.module';
import { PublicSiteBoundaryDataService } from './shared/public-site-boundary-data.service';
import { PublicSiteBoundaryDataGuard } from './shared/public-site-boundary-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    PublicSiteBoundaryDataListComponent,
    PublicSiteBoundaryDataNewComponent,
    PublicSiteBoundaryDataEditComponent,
    PublicSiteBoundaryDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    PublicSiteBoundaryDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    PublicSiteBoundaryDataService,
    PublicSiteBoundaryDataGuard
  ],
  entryComponents: [
    PublicSiteBoundaryDataNewComponent,
    PublicSiteBoundaryDataEditComponent,
    PublicSiteBoundaryDataViewComponent
  ]
})

export class PublicSiteBoundaryDataModule {
}
