import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { LevelGuard } from './shared/level.guard';
import { LevelNewComponent } from './level-new/level-new.component';
import { LevelEditComponent } from './level-edit/level-edit.component';
import { LevelListComponent } from './level-list/level-list.component';
import { LevelViewComponent } from './level-view/level-view.component';

const routes: Routes = [
  {
    path: '',
    component: LevelListComponent,
    canActivate: [LevelGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: LevelNewComponent,
    canActivate: [LevelGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: LevelEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: LevelListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: LevelViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class LevelRoutingModule {
}
