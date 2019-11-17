
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PooledDecimalRoutingModule } from './pooled-decimal.routing.module';
import { PooledDecimalComponent } from './pooled-decimal.component';

@NgModule({
  declarations: [PooledDecimalComponent],
  imports: [
    PooledDecimalRoutingModule,
    CommonModule,
  ]
})
export class PooledDecimalModule { }

