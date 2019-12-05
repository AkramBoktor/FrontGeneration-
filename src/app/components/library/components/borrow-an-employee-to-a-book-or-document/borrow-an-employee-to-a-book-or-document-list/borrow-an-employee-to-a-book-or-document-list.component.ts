
import { Component,OnInit, Input, ViewChild, Injector } from '@angular/core';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { ODataPagedResult } from 'angular-odata-es5';
import { GridControlComponent } from 'app/shared/components/grid-control/grid-control.component';
import { GridColumnOptions,GridHeaderOptions } from 'app/shared/models/controls/grid-control.model';
import { GridPaginatedSortedFiltered, FormControlError } from 'app/shared/models/controls/interfaces';
import { BorrowAnEmployeeToABookOrDocument } from 'app/shared/models/borrow-an-employee-to-a-book-or-document';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BorrowAnEmployeeToABookOrDocumentEditComponent } from '../borrow-an-employee-to-a-book-or-document-edit/borrow-an-employee-to-a-book-or-document-edit.component';
import { BorrowAnEmployeeToABookOrDocumentNewComponent } from '../borrow-an-employee-to-a-book-or-document-new/borrow-an-employee-to-a-book-or-document-new.component';
import { BorrowAnEmployeeToABookOrDocumentViewComponent } from '../borrow-an-employee-to-a-book-or-document-view/borrow-an-employee-to-a-book-or-document-view.component';
import { BorrowAnEmployeeToABookOrDocumentService } from '../shared/borrow-an-employee-to-a-book-or-document.service';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-borrow-an-employee-to-a-book-or-document-list',
  templateUrl: './borrow-an-employee-to-a-book-or-document-list.component.html',
  styleUrls: ['./borrow-an-employee-to-a-book-or-document-list.component.scss'],
  providers: []
})

export class BorrowAnEmployeeToABookOrDocumentListComponent extends AppBaseComponent implements OnInit {
  searchForm: FormGroup;
  errorMessages: FormControlError[] = [
        
      ];
  private bookStatusesService: LookupService;

  
bookStateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bookState', { static: true }) BookStateSelectComponent: MaterialSelectComponent;

  
  @Input() selectedBorrowAnEmployeeToABookOrDocument: BorrowAnEmployeeToABookOrDocument;
  // static: false --> very important
  @ViewChild('gridControl', { static: false }) grid: GridControlComponent;

  columnOptions = [
        
	new GridColumnOptions({ headerName: 'رقم الكتاب', field: 'bookNumber' }),
	new GridColumnOptions({ headerName: 'رقم الايصال', field: 'receiptNumber' }),
	new GridColumnOptions({ headerName: 'رقم المستعير', field: 'borrowerNumber' }),
	new GridColumnOptions({ headerName: 'تاريخ بدء الاستعاره', field: 'loanStartDate' }),
	new GridColumnOptions({ headerName: 'مده الاستعاره', field: 'loanDuration' }),
	new GridColumnOptions({ headerName: 'تاريخ الارجاع الافتراضى', field: 'defaultReturnDate' }),
	new GridColumnOptions({ headerName: 'حاله الكتاب', field: 'bookState' }),
	new GridColumnOptions({ headerName: 'الاداره الفرعيه', field: 'subAdministration' }),
	new GridColumnOptions({ headerName: 'المسمى الوظيفى', field: 'jobTitle' }),
  ];

  gridHeaderOptions = new GridHeaderOptions({
    viewDialogClassType: BorrowAnEmployeeToABookOrDocumentViewComponent,
    editDialogClassType: BorrowAnEmployeeToABookOrDocumentEditComponent,
    newDialogClassType: BorrowAnEmployeeToABookOrDocumentNewComponent,
  });
    constructor(
        injector: Injector,
        public borrowAnEmployeeToABookOrDocumentService: BorrowAnEmployeeToABookOrDocumentService) { 
        super(injector);
    }

  ngOnInit(): void {
    this.initializeLookupServices();
    this.selectedBorrowAnEmployeeToABookOrDocument = new BorrowAnEmployeeToABookOrDocument();

    
	this.bookStateSelectOptions = new MaterialSelectOptions({
	 data: this.bookStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الكتاب',
	});


    this.searchForm = this.formBuilder.group({
     	bookNumber : [],
	receiptNumber : [],
	borrowerNumber : [],
	loanStartDate : [],
	loanDuration : [],
	defaultReturnDate : [],
	bookState : []
    });

     
  }

  getBorrowAnEmployeeToABooksOrDocumentPaginatedSortedFiltered = (arg: GridPaginatedSortedFiltered): Observable<BorrowAnEmployeeToABookOrDocument[]> => {
    return this.borrowAnEmployeeToABookOrDocumentService.getAllWithFilter(arg);
  }

  onDeleteClicked(param): void {
    this.borrowAnEmployeeToABookOrDocumentService.delete(param.data.id)
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
    this.bookStatusesService = new LookupService('bookstatuses', this.http);
  }
}

