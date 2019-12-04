import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { IntroducingHajjAndUmrahGrantsGuard } from './shared/introducing-hajj-and-umrah-grants.guard';
import { IntroducingHajjAndUmrahGrantsNewComponent } from './introducing-hajj-and-umrah-grants-new/introducing-hajj-and-umrah-grants-new.component';
import { IntroducingHajjAndUmrahGrantsEditComponent } from './introducing-hajj-and-umrah-grants-edit/introducing-hajj-and-umrah-grants-edit.component';
import { IntroducingHajjAndUmrahGrantsListComponent } from './introducing-hajj-and-umrah-grants-list/introducing-hajj-and-umrah-grants-list.component';
import { IntroducingHajjAndUmrahGrantsViewComponent } from './introducing-hajj-and-umrah-grants-view/introducing-hajj-and-umrah-grants-view.component';

const routes: Routes = [
  {
    path: '',
    component: IntroducingHajjAndUmrahGrantsListComponent,
    canActivate: [IntroducingHajjAndUmrahGrantsGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: IntroducingHajjAndUmrahGrantsNewComponent,
    canActivate: [IntroducingHajjAndUmrahGrantsGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: IntroducingHajjAndUmrahGrantsEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: IntroducingHajjAndUmrahGrantsListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: IntroducingHajjAndUmrahGrantsViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class IntroducingHajjAndUmrahGrantsRoutingModule {
}
