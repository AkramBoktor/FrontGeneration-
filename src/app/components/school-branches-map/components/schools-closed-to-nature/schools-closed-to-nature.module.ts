import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolsClosedToNatureListComponent } from './schools-closed-to-nature-list/schools-closed-to-nature-list.component';
import { SchoolsClosedToNatureEditComponent } from './schools-closed-to-nature-edit/schools-closed-to-nature-edit.component';
import { SchoolsClosedToNatureNewComponent } from './schools-closed-to-nature-new/schools-closed-to-nature-new.component';
import { SchoolsClosedToNatureViewComponent } from './schools-closed-to-nature-view/schools-closed-to-nature-view.component';
import { SchoolsClosedToNatureRoutingModule } from './schools-closed-to-nature.routing.module';
import { SchoolsClosedToNatureService } from './shared/schools-closed-to-nature.service';
import { SchoolsClosedToNatureGuard } from './shared/schools-closed-to-nature.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolsClosedToNatureListComponent,
    SchoolsClosedToNatureNewComponent,
    SchoolsClosedToNatureEditComponent,
    SchoolsClosedToNatureViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolsClosedToNatureRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolsClosedToNatureService,
    SchoolsClosedToNatureGuard
  ],
  entryComponents: [
    SchoolsClosedToNatureNewComponent,
    SchoolsClosedToNatureEditComponent,
    SchoolsClosedToNatureViewComponent
  ]
})

export class SchoolsClosedToNatureModule {
}
