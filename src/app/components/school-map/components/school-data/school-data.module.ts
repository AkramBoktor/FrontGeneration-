import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { SchoolDataListComponent } from './school-data-list/school-data-list.component';
import { SchoolDataEditComponent } from './school-data-edit/school-data-edit.component';
import { SchoolDataNewComponent } from './school-data-new/school-data-new.component';
import { SchoolDataViewComponent } from './school-data-view/school-data-view.component';
import { SchoolDataRoutingModule } from './school-data.routing.module';
import { SchoolDataService } from './shared/school-data.service';
import { SchoolDataGuard } from './shared/school-data.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    SchoolDataListComponent,
    SchoolDataNewComponent,
    SchoolDataEditComponent,
    SchoolDataViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    SchoolDataRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    SchoolDataService,
    SchoolDataGuard
  ],
  entryComponents: [
    SchoolDataNewComponent,
    SchoolDataEditComponent,
    SchoolDataViewComponent
  ]
})

export class SchoolDataModule {
}
