import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DefiningANewToiletListComponent } from './defining-a-new-toilet-list/defining-a-new-toilet-list.component';
import { DefiningANewToiletEditComponent } from './defining-a-new-toilet-edit/defining-a-new-toilet-edit.component';
import { DefiningANewToiletNewComponent } from './defining-a-new-toilet-new/defining-a-new-toilet-new.component';
import { DefiningANewToiletViewComponent } from './defining-a-new-toilet-view/defining-a-new-toilet-view.component';
import { DefiningANewToiletRoutingModule } from './defining-a-new-toilet.routing.module';
import { DefiningANewToiletService } from './shared/defining-a-new-toilet.service';
import { DefiningANewToiletGuard } from './shared/defining-a-new-toilet.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    DefiningANewToiletListComponent,
    DefiningANewToiletNewComponent,
    DefiningANewToiletEditComponent,
    DefiningANewToiletViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DefiningANewToiletRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DefiningANewToiletService,
    DefiningANewToiletGuard
  ],
  entryComponents: [
    DefiningANewToiletNewComponent,
    DefiningANewToiletEditComponent,
    DefiningANewToiletViewComponent
  ]
})

export class DefiningANewToiletModule {
}
