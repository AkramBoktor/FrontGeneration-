import { NgModule } from '@angular/core';
import { GridControlModule } from 'app/shared/components/grid-control/grid-control.module';
import { MaterialControlsModule } from 'app/shared/components/material-controls/material-controls.module';
import { NewFormLayoutModule } from 'app/shared/components/new-form-layout/new-form-layout/new-form-layout.module';
import { SearchListExpansionPanelModule } from 'app/shared/components/search-list-expansion-panel/search-list-expansion-panel.module';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { WhatHappenedInTheSessionGuard } from './shared/what-happened-in-the-session.guard';
import { WhatHappenedInTheSessionService } from './shared/what-happened-in-the-session.service';
import { WhatHappenedInTheSessionEditComponent } from './what-happened-in-the-session-edit/what-happened-in-the-session-edit.component';
import { WhatHappenedInTheSessionListComponent } from './what-happened-in-the-session-list/what-happened-in-the-session-list.component';
import { WhatHappenedInTheSessionNewComponent } from './what-happened-in-the-session-new/what-happened-in-the-session-new.component';
import { WhatHappenedInTheSessionViewComponent } from './what-happened-in-the-session-view/what-happened-in-the-session-view.component';
import { WhatHappenedInTheSessionRoutingModule } from './what-happened-in-the-session.routing.module';

@NgModule({
  declarations: [
    WhatHappenedInTheSessionListComponent,
    WhatHappenedInTheSessionNewComponent,
    WhatHappenedInTheSessionEditComponent,
    WhatHappenedInTheSessionViewComponent
  ],
  imports: [
    MaterialControlsModule,
    CommonPipesModule,
    GridControlModule,
    WhatHappenedInTheSessionRoutingModule,
    NewFormLayoutModule,
    SearchListExpansionPanelModule
  ],
  providers: [
    WhatHappenedInTheSessionService,
    WhatHappenedInTheSessionGuard
  ],
  entryComponents: [
    WhatHappenedInTheSessionNewComponent,
    WhatHappenedInTheSessionEditComponent,
    WhatHappenedInTheSessionViewComponent
  ]
})

export class WhatHappenedInTheSessionModule {
}
