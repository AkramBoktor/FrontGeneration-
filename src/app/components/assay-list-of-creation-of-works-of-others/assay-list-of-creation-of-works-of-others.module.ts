
    import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssayListOfCreationOfWorksOfOthersRoutingModule } from './assay-list-of-creation-of-works-of-others.routing.module';
import { AssayListOfCreationOfWorksOfOthersComponent } from './assay-list-of-creation-of-works-of-others.component';

@NgModule({
  declarations: [AssayListOfCreationOfWorksOfOthersComponent],
  imports: [
    AssayListOfCreationOfWorksOfOthersRoutingModule,
    CommonModule,
  ]
})
export class AssayListOfCreationOfWorksOfOthersModule { }

