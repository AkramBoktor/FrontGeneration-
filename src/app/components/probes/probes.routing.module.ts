
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { ProbesComponent } from './probes.component';


const routes: Routes = [
  {
    path: '',
    component: ProbesComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class ProbesRoutingModule {
}

