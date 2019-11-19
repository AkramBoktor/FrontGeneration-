import { Component, EventEmitter, Output, ViewChild, ContentChild, TemplateRef, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material';
import { SearchFormContainerDirective } from './search-form-container.directive';
import { SearchResultContainerDirective } from './search-result-container.directive';
import { AuthorizeClaimsService } from 'app/shared/services/authorize-claims.service';
import { AuthorizeClaims } from 'app/shared/config/authorize-config';

@Component({
  selector: 'app-search-list-expansion-panel',
  templateUrl: './search-list-expansion-panel.component.html',
  styleUrls: ['./search-list-expansion-panel.component.scss']
})
export class SearchListExpansionPanelComponent {

  searchForm: FormGroup;
  authorizeClaims: AuthorizeClaims;

  @Input() pageTitle;
  @Input() listPanelTitle = 'نتائج البحث';
  @Input() searchPanelTitle = 'بحث';
  @Input() searchPanelDescription: string; // = 'ادخل البيانات المرادالبحث عنها';

  @Output() beginSearch: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();
  @ViewChild('searchPanel', { static: true }) searchPanel: MatExpansionPanel;
  @ViewChild('gridPanel', { static: true }) gridPanel: MatExpansionPanel;
  @ContentChild(SearchResultContainerDirective, { read: TemplateRef, static: true }) searchResultContainer;
  @ContentChild(SearchFormContainerDirective, { read: TemplateRef, static: true }) searchFormContainer;

  constructor(private authorizeClaimsService: AuthorizeClaimsService) {
    this.authorizeClaims = this.authorizeClaimsService.getModuleClaims();
   }

   onBeginSearch(): void {
    this.beginSearch.emit();
    this.gridPanel.disabled = false;
    this.onCloseSearchPanel();
  }
  

  onOpenSearchPanel(): void {
    this.searchPanel.open();
    this.gridPanel.close();
  }

  onCloseSearchPanel(): void {
    this.searchPanel.close();
    this.gridPanel.open();
  }

  onCreate(): void {
    this.create.emit();
  }
}

