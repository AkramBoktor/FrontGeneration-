import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { AssayOfWithdrawnWorksListComponent } from './assay-of-withdrawn-works-list/assay-of-withdrawn-works-list.component';
import { AssayOfWithdrawnWorksEditComponent } from './assay-of-withdrawn-works-edit/assay-of-withdrawn-works-edit.component';
import { AssayOfWithdrawnWorksNewComponent } from './assay-of-withdrawn-works-new/assay-of-withdrawn-works-new.component';
import { AssayOfWithdrawnWorksViewComponent } from './assay-of-withdrawn-works-view/assay-of-withdrawn-works-view.component';
import { AssayOfWithdrawnWorksRoutingModule } from './assay-of-withdrawn-works.routing.module';
import { AssayOfWithdrawnWorksService } from './shared/assay-of-withdrawn-works.service';
import { AssayOfWithdrawnWorksGuard } from './shared/assay-of-withdrawn-works.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    AssayOfWithdrawnWorksListComponent,
    AssayOfWithdrawnWorksNewComponent,
    AssayOfWithdrawnWorksEditComponent,
    AssayOfWithdrawnWorksViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    AssayOfWithdrawnWorksRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    AssayOfWithdrawnWorksService,
    AssayOfWithdrawnWorksGuard
  ],
  entryComponents: [
    AssayOfWithdrawnWorksNewComponent,
    AssayOfWithdrawnWorksEditComponent,
    AssayOfWithdrawnWorksViewComponent
  ]
})

export class AssayOfWithdrawnWorksModule {
}
