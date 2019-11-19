import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ChairmanVisaGuard } from './shared/chairman-visa.guard';
import { ChairmanVisaNewComponent } from './chairman-visa-new/chairman-visa-new.component';
import { ChairmanVisaEditComponent } from './chairman-visa-edit/chairman-visa-edit.component';
import { ChairmanVisaListComponent } from './chairman-visa-list/chairman-visa-list.component';
import { ChairmanVisaViewComponent } from './chairman-visa-view/chairman-visa-view.component';

const routes: Routes = [
  {
    path: '',
    component: ChairmanVisaListComponent,
    canActivate: [ChairmanVisaGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: ChairmanVisaNewComponent,
    canActivate: [ChairmanVisaGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: ChairmanVisaEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: ChairmanVisaListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: ChairmanVisaViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ChairmanVisaRoutingModule {
}
