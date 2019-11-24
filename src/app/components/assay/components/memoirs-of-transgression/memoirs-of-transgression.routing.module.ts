import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { MemoirsOfTransgressionGuard } from './shared/memoirs-of-transgression.guard';
import { MemoirsOfTransgressionNewComponent } from './memoirs-of-transgression-new/memoirs-of-transgression-new.component';
import { MemoirsOfTransgressionEditComponent } from './memoirs-of-transgression-edit/memoirs-of-transgression-edit.component';
import { MemoirsOfTransgressionListComponent } from './memoirs-of-transgression-list/memoirs-of-transgression-list.component';
import { MemoirsOfTransgressionViewComponent } from './memoirs-of-transgression-view/memoirs-of-transgression-view.component';

const routes: Routes = [
  {
    path: '',
    component: MemoirsOfTransgressionListComponent,
    canActivate: [MemoirsOfTransgressionGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: MemoirsOfTransgressionNewComponent,
    canActivate: [MemoirsOfTransgressionGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: MemoirsOfTransgressionEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: MemoirsOfTransgressionListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: MemoirsOfTransgressionViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class MemoirsOfTransgressionRoutingModule {
}
