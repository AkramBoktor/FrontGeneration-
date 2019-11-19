import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';
import { MaterialControlsModule } from '../material-controls/material-controls.module';
import { SearchFormContainerDirective } from './search-form-container.directive';
import { SearchListExpansionPanelComponent } from './search-list-expansion-panel.component';
import { SearchResultContainerDirective } from './search-result-container.directive';
import { MultiFileUploadModule } from '../multi-file-upload/multi-file-upload.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialControlsModule,
    SharedDirectivesModule,
    MultiFileUploadModule
  ],
  exports: [SearchListExpansionPanelComponent, SearchResultContainerDirective, SearchFormContainerDirective, MultiFileUploadModule],
  declarations: [SearchListExpansionPanelComponent, SearchResultContainerDirective, SearchFormContainerDirective]
})
export class SearchListExpansionPanelModule { }
