
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReturnDocumentBookWithBorrowerNumber } from 'app/shared/models/return-document-book-with-borrower-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ReturnDocumentBookWithBorrowerNumberService } from '../shared/return-document-book-with-borrower-number.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-return-document-book-with-borrower-number-edit',
  templateUrl: './return-document-book-with-borrower-number-edit.component.html',
  styleUrls: ['./return-document-book-with-borrower-number-edit.component.scss'],
  providers: []
})

export class ReturnDocumentBookWithBorrowerNumberEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedReturnDocumentBookWithBorrowerNumber: ReturnDocumentBookWithBorrowerNumber;
  returnDocumentBookWithBorrowerNumberForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
administrationSelectOptions: MaterialSelectOptions;
jobBorrowerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobBorrower', { static: true }) JobBorrowerSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedReturnDocumentBookWithBorrowerNumberDialog: any,
    @Optional() public dialogRef: MatDialogRef<ReturnDocumentBookWithBorrowerNumberEditComponent>,
    public returnDocumentBookWithBorrowerNumberService: ReturnDocumentBookWithBorrowerNumberService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReturnDocumentBookWithBorrowerNumber = new ReturnDocumentBookWithBorrowerNumber();
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
      
  id : [this.selectedReturnDocumentBookWithBorrowerNumber.id],
  borrowerNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.borrowerNumber, [ Validators.required ]],
  bookNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.bookNumber, [ Validators.required ]],
  receiptNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.receiptNumber, [ Validators.required ]],
  defaultReturnDate : [this.selectedReturnDocumentBookWithBorrowerNumber.defaultReturnDate, [ ]],
  returnBookDate : [this.selectedReturnDocumentBookWithBorrowerNumber.returnBookDate, [ ]],
  loanDuration : [this.selectedReturnDocumentBookWithBorrowerNumber.loanDuration, [ ]],
  loanStartDate : [this.selectedReturnDocumentBookWithBorrowerNumber.loanStartDate, [ ]],
  administration : [this.selectedReturnDocumentBookWithBorrowerNumber.administration, [ Validators.required ]],
  jobBorrower : [this.selectedReturnDocumentBookWithBorrowerNumber.jobBorrower, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.returnDocumentBookWithBorrowerNumberService.update(this.returnDocumentBookWithBorrowerNumberForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.returnDocumentBookWithBorrowerNumberService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.returnDocumentBookWithBorrowerNumberForm.get(name);
  }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}
