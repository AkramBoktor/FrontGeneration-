
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BorrowAnEmployeeToABookOrDocument } from 'app/shared/models/borrow-an-employee-to-a-book-or-document';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { BorrowAnEmployeeToABookOrDocumentService } from '../shared/borrow-an-employee-to-a-book-or-document.service';




@Component({
  selector: 'app-borrow-an-employee-to-a-book-or-document-edit',
  templateUrl: './borrow-an-employee-to-a-book-or-document-edit.component.html',
  styleUrls: ['./borrow-an-employee-to-a-book-or-document-edit.component.scss'],
  providers: []
})

export class BorrowAnEmployeeToABookOrDocumentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBorrowAnEmployeeToABookOrDocument: BorrowAnEmployeeToABookOrDocument;
  borrowAnEmployeeToABookOrDocumentForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private bookStatusesService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
bookStateSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  
	@ViewChild('bookState', { static: true }) BookStateSelectComponent: MaterialSelectComponent;
	@ViewChild('subAdministration', { static: true }) SubAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobTitle', { static: true }) JobTitleSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBorrowAnEmployeeToABookOrDocumentDialog: any,
    @Optional() public dialogRef: MatDialogRef<BorrowAnEmployeeToABookOrDocumentEditComponent>,
    public borrowAnEmployeeToABookOrDocumentService: BorrowAnEmployeeToABookOrDocumentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBorrowAnEmployeeToABookOrDocument = new BorrowAnEmployeeToABookOrDocument();
    this.selectedBorrowAnEmployeeToABookOrDocument = this.selectedBorrowAnEmployeeToABookOrDocumentDialog.data || this.selectedBorrowAnEmployeeToABookOrDocument;

    
	this.bookStateSelectOptions = new MaterialSelectOptions({
	 data: this.bookStatusesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'حاله الكتاب',
	});

	this.subAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره الفرعيه',
	});

	this.jobTitleSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المسمى الوظيفى',
	});


    this.borrowAnEmployeeToABookOrDocumentForm = this.formBuilder.group({
      
  id : [this.selectedBorrowAnEmployeeToABookOrDocument.id],
  bookNumber : [this.selectedBorrowAnEmployeeToABookOrDocument.bookNumber, [ Validators.required ]],
  receiptNumber : [this.selectedBorrowAnEmployeeToABookOrDocument.receiptNumber, [ Validators.required ]],
  borrowerNumber : [this.selectedBorrowAnEmployeeToABookOrDocument.borrowerNumber, [ Validators.required ]],
  loanStartDate : [this.selectedBorrowAnEmployeeToABookOrDocument.loanStartDate, [ Validators.required ]],
  loanDuration : [this.selectedBorrowAnEmployeeToABookOrDocument.loanDuration, [ Validators.required ]],
  defaultReturnDate : [this.selectedBorrowAnEmployeeToABookOrDocument.defaultReturnDate, [ Validators.required ]],
  bookState : [this.selectedBorrowAnEmployeeToABookOrDocument.bookState, [ Validators.required ]],
  subAdministration : [this.selectedBorrowAnEmployeeToABookOrDocument.subAdministration, [ ]],
  jobTitle : [this.selectedBorrowAnEmployeeToABookOrDocument.jobTitle, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.borrowAnEmployeeToABookOrDocumentService.update(this.borrowAnEmployeeToABookOrDocumentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.borrowAnEmployeeToABookOrDocumentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
	    }))
    .subscribe(
      (result) => {
          if (this.dialogRef)
          {
              this.dialogRef.close(true);
          }
    });
  }

  getControls(name: string) {
    return this.borrowAnEmployeeToABookOrDocumentForm.get(name);
  }

  initializeLookupServices() {
    this.bookStatusesService = new LookupService('bookstatuses', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
