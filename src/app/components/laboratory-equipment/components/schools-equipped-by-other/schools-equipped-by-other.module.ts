import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolsEquippedByOtherListComponent } from './schools-equipped-by-other-list/schools-equipped-by-other-list.component';
import { SchoolsEquippedByOtherEditComponent } from './schools-equipped-by-other-edit/schools-equipped-by-other-edit.component';
import { SchoolsEquippedByOtherNewComponent } from './schools-equipped-by-other-new/schools-equipped-by-other-new.component';
import { SchoolsEquippedByOtherViewComponent } from './schools-equipped-by-other-view/schools-equipped-by-other-view.component';
import { SchoolsEquippedByOtherRoutingModule } from './schools-equipped-by-other.routing.module';
import { SchoolsEquippedByOtherService } from './shared/schools-equipped-by-other.service';
import { SchoolsEquippedByOtherGuard } from './shared/schools-equipped-by-other.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolsEquippedByOtherListComponent,
    SchoolsEquippedByOtherNewComponent,
    SchoolsEquippedByOtherEditComponent,
    SchoolsEquippedByOtherViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolsEquippedByOtherRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolsEquippedByOtherService,
    SchoolsEquippedByOtherGuard
  ],
  entryComponents: [
    SchoolsEquippedByOtherNewComponent,
    SchoolsEquippedByOtherEditComponent,
    SchoolsEquippedByOtherViewComponent
  ]
})

export class SchoolsEquippedByOtherModule {
}
