import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DefiningANewToiletGuard } from './shared/defining-a-new-toilet.guard';
import { DefiningANewToiletNewComponent } from './defining-a-new-toilet-new/defining-a-new-toilet-new.component';
import { DefiningANewToiletEditComponent } from './defining-a-new-toilet-edit/defining-a-new-toilet-edit.component';
import { DefiningANewToiletListComponent } from './defining-a-new-toilet-list/defining-a-new-toilet-list.component';
import { DefiningANewToiletViewComponent } from './defining-a-new-toilet-view/defining-a-new-toilet-view.component';

const routes: Routes = [
  {
    path: '',
    component: DefiningANewToiletListComponent,
    canActivate: [DefiningANewToiletGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DefiningANewToiletNewComponent,
    canActivate: [DefiningANewToiletGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DefiningANewToiletEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DefiningANewToiletListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DefiningANewToiletViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DefiningANewToiletRoutingModule {
}
