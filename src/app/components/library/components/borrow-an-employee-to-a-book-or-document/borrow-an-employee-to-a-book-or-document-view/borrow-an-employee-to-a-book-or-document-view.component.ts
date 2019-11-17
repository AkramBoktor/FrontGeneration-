
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BorrowAnEmployeeToABookOrDocument } from 'app/shared/models/borrow-an-employee-to-a-book-or-document';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BorrowAnEmployeeToABookOrDocumentService } from '../shared/borrow-an-employee-to-a-book-or-document.service';

@Component({
  selector: 'app-borrow-an-employee-to-a-book-or-document-view',
  templateUrl: './borrow-an-employee-to-a-book-or-document-view.component.html',
  styleUrls: ['./borrow-an-employee-to-a-book-or-document-view.component.scss'],
  providers: []
})

export class BorrowAnEmployeeToABookOrDocumentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBorrowAnEmployeeToABookOrDocument: BorrowAnEmployeeToABookOrDocument;
  borrowAnEmployeeToABookOrDocumentForm: FormGroup;

  private bookStatusesService: LookupService;
private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
bookStateSelectOptions: MaterialSelectOptions;
subAdministrationSelectOptions: MaterialSelectOptions;
jobTitleSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBorrowAnEmployeeToABookOrDocumentDialog: any,
    @Optional() public dialogRef: MatDialogRef<BorrowAnEmployeeToABookOrDocumentViewComponent>,
    public borrowAnEmployeeToABookOrDocumentService: BorrowAnEmployeeToABookOrDocumentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  bookNumber : [this.selectedBorrowAnEmployeeToABookOrDocument.bookNumber],
  receiptNumber : [this.selectedBorrowAnEmployeeToABookOrDocument.receiptNumber],
  borrowerNumber : [this.selectedBorrowAnEmployeeToABookOrDocument.borrowerNumber],
  loanStartDate : [this.selectedBorrowAnEmployeeToABookOrDocument.loanStartDate],
  loanDuration : [this.selectedBorrowAnEmployeeToABookOrDocument.loanDuration],
  defaultReturnDate : [this.selectedBorrowAnEmployeeToABookOrDocument.defaultReturnDate],
  bookState : [this.selectedBorrowAnEmployeeToABookOrDocument.bookState],
  subAdministration : [this.selectedBorrowAnEmployeeToABookOrDocument.subAdministration],
  jobTitle : [this.selectedBorrowAnEmployeeToABookOrDocument.jobTitle]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.borrowAnEmployeeToABookOrDocumentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.borrowAnEmployeeToABookOrDocumentForm.controls)) {
      this.borrowAnEmployeeToABookOrDocumentForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.bookStatusesService = new LookupService('bookstatuses', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

