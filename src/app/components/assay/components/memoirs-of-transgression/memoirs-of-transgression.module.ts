import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MemoirsOfTransgressionListComponent } from './memoirs-of-transgression-list/memoirs-of-transgression-list.component';
import { MemoirsOfTransgressionEditComponent } from './memoirs-of-transgression-edit/memoirs-of-transgression-edit.component';
import { MemoirsOfTransgressionNewComponent } from './memoirs-of-transgression-new/memoirs-of-transgression-new.component';
import { MemoirsOfTransgressionViewComponent } from './memoirs-of-transgression-view/memoirs-of-transgression-view.component';
import { MemoirsOfTransgressionRoutingModule } from './memoirs-of-transgression.routing.module';
import { MemoirsOfTransgressionService } from './shared/memoirs-of-transgression.service';
import { MemoirsOfTransgressionGuard } from './shared/memoirs-of-transgression.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    MemoirsOfTransgressionListComponent,
    MemoirsOfTransgressionNewComponent,
    MemoirsOfTransgressionEditComponent,
    MemoirsOfTransgressionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    MemoirsOfTransgressionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    MemoirsOfTransgressionService,
    MemoirsOfTransgressionGuard
  ],
  entryComponents: [
    MemoirsOfTransgressionNewComponent,
    MemoirsOfTransgressionEditComponent,
    MemoirsOfTransgressionViewComponent
  ]
})

export class MemoirsOfTransgressionModule {
}
