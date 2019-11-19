
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library.routing.module';
import { LibraryComponent } from './library.component';

@NgModule({
  declarations: [LibraryComponent],
  imports: [
    LibraryRoutingModule,
    CommonModule,
  ]
})
export class LibraryModule { }

