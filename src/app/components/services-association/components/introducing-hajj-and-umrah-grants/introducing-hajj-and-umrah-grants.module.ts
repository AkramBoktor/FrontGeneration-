import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { IntroducingHajjAndUmrahGrantsListComponent } from './introducing-hajj-and-umrah-grants-list/introducing-hajj-and-umrah-grants-list.component';
import { IntroducingHajjAndUmrahGrantsEditComponent } from './introducing-hajj-and-umrah-grants-edit/introducing-hajj-and-umrah-grants-edit.component';
import { IntroducingHajjAndUmrahGrantsNewComponent } from './introducing-hajj-and-umrah-grants-new/introducing-hajj-and-umrah-grants-new.component';
import { IntroducingHajjAndUmrahGrantsViewComponent } from './introducing-hajj-and-umrah-grants-view/introducing-hajj-and-umrah-grants-view.component';
import { IntroducingHajjAndUmrahGrantsRoutingModule } from './introducing-hajj-and-umrah-grants.routing.module';
import { IntroducingHajjAndUmrahGrantsService } from './shared/introducing-hajj-and-umrah-grants.service';
import { IntroducingHajjAndUmrahGrantsGuard } from './shared/introducing-hajj-and-umrah-grants.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    IntroducingHajjAndUmrahGrantsListComponent,
    IntroducingHajjAndUmrahGrantsNewComponent,
    IntroducingHajjAndUmrahGrantsEditComponent,
    IntroducingHajjAndUmrahGrantsViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    IntroducingHajjAndUmrahGrantsRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    IntroducingHajjAndUmrahGrantsService,
    IntroducingHajjAndUmrahGrantsGuard
  ],
  entryComponents: [
    IntroducingHajjAndUmrahGrantsNewComponent,
    IntroducingHajjAndUmrahGrantsEditComponent,
    IntroducingHajjAndUmrahGrantsViewComponent
  ]
})

export class IntroducingHajjAndUmrahGrantsModule {
}
