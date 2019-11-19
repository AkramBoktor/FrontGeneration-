import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { DependentNameEditComponent } from './dependent-name-edit/dependent-name-edit.component';
import { DependentNameListComponent } from './dependent-name-list/dependent-name-list.component';
import { DependentNameNewComponent } from './dependent-name-new/dependent-name-new.component';
import { DependentNameViewComponent } from './dependent-name-view/dependent-name-view.component';
import { DependentNameRoutingModule } from './dependent-name.routing.module';
import { DependentNameGuard } from './shared/dependent-name.guard';
import { DependentNameService } from './shared/dependent-name.service';

@NgModule({
  declarations: [
    DependentNameListComponent,
    DependentNameNewComponent,
    DependentNameEditComponent,
    DependentNameViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    DependentNameRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    DependentNameService,
    DependentNameGuard
  ],
  entryComponents: [
    DependentNameNewComponent,
    DependentNameEditComponent,
    DependentNameViewComponent
  ]
})

export class DependentNameModule {
}
