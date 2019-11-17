import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { OccasionGuard } from './shared/occasion.guard';
import { OccasionNewComponent } from './occasion-new/occasion-new.component';
import { OccasionEditComponent } from './occasion-edit/occasion-edit.component';
import { OccasionListComponent } from './occasion-list/occasion-list.component';
import { OccasionViewComponent } from './occasion-view/occasion-view.component';

const routes: Routes = [
  {
    path: '',
    component: OccasionListComponent,
    canActivate: [OccasionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: OccasionNewComponent,
    canActivate: [OccasionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: OccasionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: OccasionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: OccasionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class OccasionRoutingModule {
}
