
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { PooledDecimalComponent } from './pooled-decimal.component';


const routes: Routes = [
  {
    path: '',
    component: PooledDecimalComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})

export class PooledDecimalRoutingModule {
}

