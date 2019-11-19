import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdequacyEditComponent } from './adequacy-edit/adequacy-edit.component';
import { AdequacyListComponent } from './adequacy-list/adequacy-list.component';
import { AdequacyNewComponent } from './adequacy-new/adequacy-new.component';
import { AdequacyViewComponent } from './adequacy-view/adequacy-view.component';
import { AdequacyGuard } from './shared/adequacy.guard';

const routes: Routes = [
  {
    path: '',
    component: AdequacyListComponent,
    canActivate: [AdequacyGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: AdequacyNewComponent,
    canActivate: [AdequacyGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: AdequacyEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: AdequacyListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: AdequacyViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class AdequacyRoutingModule {
}
