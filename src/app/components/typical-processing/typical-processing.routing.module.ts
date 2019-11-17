
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { TypicalProcessingComponent } from './typical-processing.component';


const routes: Routes = [
  {
    path: '',
    component: TypicalProcessingComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class TypicalProcessingRoutingModule {
}

