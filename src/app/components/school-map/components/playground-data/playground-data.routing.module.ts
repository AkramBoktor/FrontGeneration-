import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PlaygroundDataGuard } from './shared/playground-data.guard';
import { PlaygroundDataNewComponent } from './playground-data-new/playground-data-new.component';
import { PlaygroundDataEditComponent } from './playground-data-edit/playground-data-edit.component';
import { PlaygroundDataListComponent } from './playground-data-list/playground-data-list.component';
import { PlaygroundDataViewComponent } from './playground-data-view/playground-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: PlaygroundDataListComponent,
    canActivate: [PlaygroundDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PlaygroundDataNewComponent,
    canActivate: [PlaygroundDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PlaygroundDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PlaygroundDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PlaygroundDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PlaygroundDataRoutingModule {
}
