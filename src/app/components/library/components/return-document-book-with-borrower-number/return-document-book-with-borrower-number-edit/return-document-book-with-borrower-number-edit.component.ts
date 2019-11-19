
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ReturnDocumentBookWithBorrowerNumber } from 'app/shared/models/return-document-book-with-borrower-number';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { ReturnDocumentBookWithBorrowerNumberService } from '../shared/return-document-book-with-borrower-number.service';




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

  
administrationSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;

  

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


    this.returnDocumentBookWithBorrowerNumberForm = this.formBuilder.group({
      
  id : [this.selectedReturnDocumentBookWithBorrowerNumber.id],
  borrowerNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.borrowerNumber, [ Validators.required ]],
  jobBorrower : [this.selectedReturnDocumentBookWithBorrowerNumber.jobBorrower, [ ]],
  bookNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.bookNumber, [ ]],
  receiptNumber : [this.selectedReturnDocumentBookWithBorrowerNumber.receiptNumber, [ ]],
  defaultReturnDate : [this.selectedReturnDocumentBookWithBorrowerNumber.defaultReturnDate, [ ]],
  returnBookDate : [this.selectedReturnDocumentBookWithBorrowerNumber.returnBookDate, [ ]],
  loanDuration : [this.selectedReturnDocumentBookWithBorrowerNumber.loanDuration, [ ]],
  loanStartDate : [this.selectedReturnDocumentBookWithBorrowerNumber.loanStartDate, [ ]],
  administration : [this.selectedReturnDocumentBookWithBorrowerNumber.administration, [ ]]
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
  }
}
