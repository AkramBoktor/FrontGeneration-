import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { ThirdpartiesListComponent } from './thirdparties-list/thirdparties-list.component';
import { ThirdpartiesEditComponent } from './thirdparties-edit/thirdparties-edit.component';
import { ThirdpartiesNewComponent } from './thirdparties-new/thirdparties-new.component';
import { ThirdpartiesViewComponent } from './thirdparties-view/thirdparties-view.component';
import { ThirdpartiesRoutingModule } from './thirdparties.routing.module';
import { ThirdpartiesService } from './shared/thirdparties.service';
import { ThirdpartiesGuard } from './shared/thirdparties.guard';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';

@NgModule({
  declarations: [
    ThirdpartiesListComponent,
    ThirdpartiesNewComponent,
    ThirdpartiesEditComponent,
    ThirdpartiesViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    ThirdpartiesRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    ThirdpartiesService,
    ThirdpartiesGuard
  ],
  entryComponents: [
    ThirdpartiesNewComponent,
    ThirdpartiesEditComponent,
    ThirdpartiesViewComponent
  ]
})

export class ThirdpartiesModule {
}
