
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { ReturnDocumentBookWithBorrowerNumber } from 'app/shared/models/return-document-book-with-borrower-number';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReturnDocumentBookWithBorrowerNumberEditComponent } from '../return-document-book-with-borrower-number-edit/return-document-book-with-borrower-number-edit.component';
import { ReturnDocumentBookWithBorrowerNumberNewComponent } from '../return-document-book-with-borrower-number-new/return-document-book-with-borrower-number-new.component';
import { ReturnDocumentBookWithBorrowerNumberViewComponent } from '../return-document-book-with-borrower-number-view/return-document-book-with-borrower-number-view.component';
import { ReturnDocumentBookWithBorrowerNumberService } from '../shared/return-document-book-with-borrower-number.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-return-document-book-with-borrower-number-list',
  templateUrl: './return-document-book-with-borrower-number-list.component.html',
  styleUrls: ['./return-document-book-with-borrower-number-list.component.scss'],
  providers: []
})

export class ReturnDocumentBookWithBorrowerNumberListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  

  

  

  
  @Input() selectedReturnDocumentBookWithBorrowerNumber: ReturnDocumentBookWithBorrowerNumber;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم المستعير', field: 'borrowerNumber' }),
	new GridColumnOptions({ headerName: 'رقم الكتاب', field: 'bookNumber' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ الارجاع الافتراضى', field: 'defaultReturnDate' }),
	new GridColumnOptions({ headerName: 'تاريخ ارجاع الكتاب', field: 'returnBookDate' }),
	new GridColumnOptions({ headerName: 'مده الاستعاره', field: 'loanDuration' }),
	new GridColumnOptions({ headerName: 'تاريخ بدء الاستعاره', field: 'loanStartDate' }),
	new GridColumnOptions({ headerName: 'الاداره', field: 'administration' }),
	new GridColumnOptions({ headerName: 'وظيفه المستعير', field: 'jobBorrower' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: ReturnDocumentBookWithBorrowerNumberViewComponent,
    editDialogClassType: ReturnDocumentBookWithBorrowerNumberEditComponent,
    newDialogClassType: ReturnDocumentBookWithBorrowerNumberNewComponent,
  });
    constructor(
        injector: Injector,
        public returnDocumentBookWithBorrowerNumberService: ReturnDocumentBookWithBorrowerNumberService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedReturnDocumentBookWithBorrowerNumber = new ReturnDocumentBookWithBorrowerNumber();

    

    this.searchForm = this.formBuilder.group({
     	borrowerNumber : []
    });

     
  }

  getReturnDocumentBookWithBorrowerNumberPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<ReturnDocumentBookWithBorrowerNumber[]> => {
    return this.returnDocumentBookWithBorrowerNumberService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.returnDocumentBookWithBorrowerNumberService.delete(param.data.id)
      .pipe(take(1))
      .subscribe(() => this.grid.refreshData());
  }

  onBeginSearch(): void {
    this.grid.beginSearch(this.searchForm.value);
  }

  onCreate(): void {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});
  }

  getControls(name: string) {
    return this.searchForm.get(name);
  }

  initializeLookupServices() {
    
  }
}

