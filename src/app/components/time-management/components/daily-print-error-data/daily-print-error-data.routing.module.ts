import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { DailyPrintErrorDataGuard } from './shared/daily-print-error-data.guard';
import { DailyPrintErrorDataNewComponent } from './daily-print-error-data-new/daily-print-error-data-new.component';
import { DailyPrintErrorDataEditComponent } from './daily-print-error-data-edit/daily-print-error-data-edit.component';
import { DailyPrintErrorDataListComponent } from './daily-print-error-data-list/daily-print-error-data-list.component';
import { DailyPrintErrorDataViewComponent } from './daily-print-error-data-view/daily-print-error-data-view.component';

const routes: Routes = [
  {
    path: '',
    component: DailyPrintErrorDataListComponent,
    canActivate: [DailyPrintErrorDataGuard],
  }, {
    path: 'new',
    pathMatch: 'full',
    component: DailyPrintErrorDataNewComponent,
    canActivate: [DailyPrintErrorDataGuard],
  }, {
    path: 'edit',
    pathMatch: 'full',
    component: DailyPrintErrorDataEditComponent
  }, {
    path: 'list',
    pathMatch: 'full',
    component: DailyPrintErrorDataListComponent
  }, {
    path: 'view',
    pathMatch: 'full',
    component: DailyPrintErrorDataViewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class DailyPrintErrorDataRoutingModule {
}
