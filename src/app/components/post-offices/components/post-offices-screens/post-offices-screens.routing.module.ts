import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PostOfficesScreensGuard } from './shared/post-offices-screens.guard';
import { PostOfficesScreensNewComponent } from './post-offices-screens-new/post-offices-screens-new.component';
import { PostOfficesScreensEditComponent } from './post-offices-screens-edit/post-offices-screens-edit.component';
import { PostOfficesScreensListComponent } from './post-offices-screens-list/post-offices-screens-list.component';
import { PostOfficesScreensViewComponent } from './post-offices-screens-view/post-offices-screens-view.component';

const routes: Routes = [
  {
    path: '',
    component: PostOfficesScreensListComponent,
    canActivate: [PostOfficesScreensGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: PostOfficesScreensNewComponent,
    canActivate: [PostOfficesScreensGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: PostOfficesScreensEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: PostOfficesScreensListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: PostOfficesScreensViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PostOfficesScreensRoutingModule {
}
