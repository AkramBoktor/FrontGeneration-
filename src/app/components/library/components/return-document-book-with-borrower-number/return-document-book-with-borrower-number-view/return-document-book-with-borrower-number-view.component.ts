
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ReturnDocumentBookWithBorrowerNumber } from 'app/shared/models/return-document-book-with-borrower-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ReturnDocumentBookWithBorrowerNumberService } from '../shared/return-document-book-with-borrower-number.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-return-document-book-with-borrower-number-view',
  templateUrl: './return-document-book-with-borrower-number-view.component.html',
  styleUrls: ['./return-document-book-with-borrower-number-view.component.scss'],
  providers: []
})

export class ReturnDocumentBookWithBorrowerNumberViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReturnDocumentBookWithBorrowerNumber: ReturnDocumentBookWithBorrowerNumber;
  returnDocumentBookWithBorrowerNumberForm: FormGroup;

  private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
administrationSelectOptions: MaterialSelectOptions;
jobBorrowerSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReturnDocumentBookWithBorrowerNumberDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReturnDocumentBookWithBorrowerNumberViewComponent>,
    public returnDocumentBookWithBorrowerNumberService: ReturnDocumentBookWithBorrowerNumberService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReturnDocumentBookWithBorrowerNumber = this.selectedReturnDocumentBookWithBorrowerNumberDialog.data || this.selectedReturnDocumentBookWithBorrowerNumber;

    
	this.administrationSelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الاداره',
	});

	this.jobBorrowerSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'وظيفه المستعير',
	});


    this.returnDocumentBookWithBorrowerNumberForm = this.formBuilder.group({
      
  borrowerNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.borrowerNumber],
  bookNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.bookNumber],
  receiptNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.receiptNumber],
  defaultReturnDate : [this.selectedReturnDocumentBookWithBorrowerNumber.defaultReturnDate],
  returnBookDate : [this.selectedReturnDocumentBookWithBorrowerNumber.returnBookDate],
  loanDuration : [this.selectedReturnDocumentBookWithBorrowerNumber.loanDuration],
  loanStartDate : [this.selectedReturnDocumentBookWithBorrowerNumber.loanStartDate],
  administration : [this.selectedReturnDocumentBookWithBorrowerNumber.administration],
  jobBorrower : [this.selectedReturnDocumentBookWithBorrowerNumber.jobBorrower]
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
    return this.returnDocumentBookWithBorrowerNumberForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.returnDocumentBookWithBorrowerNumberForm.controls)) {
      this.returnDocumentBookWithBorrowerNumberForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

