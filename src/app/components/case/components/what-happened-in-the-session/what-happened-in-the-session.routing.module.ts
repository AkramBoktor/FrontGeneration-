import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatHappenedInTheSessionGuard } from './shared/what-happened-in-the-session.guard';
import { WhatHappenedInTheSessionEditComponent } from './what-happened-in-the-session-edit/what-happened-in-the-session-edit.component';
import { WhatHappenedInTheSessionListComponent } from './what-happened-in-the-session-list/what-happened-in-the-session-list.component';
import { WhatHappenedInTheSessionNewComponent } from './what-happened-in-the-session-new/what-happened-in-the-session-new.component';
import { WhatHappenedInTheSessionViewComponent } from './what-happened-in-the-session-view/what-happened-in-the-session-view.component';

const routes: Routes = [
  {
    path: '',
    component: WhatHappenedInTheSessionListComponent,
    canActivate: [WhatHappenedInTheSessionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: WhatHappenedInTheSessionNewComponent,
    canActivate: [WhatHappenedInTheSessionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: WhatHappenedInTheSessionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: WhatHappenedInTheSessionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: WhatHappenedInTheSessionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class WhatHappenedInTheSessionRoutingModule {
}
