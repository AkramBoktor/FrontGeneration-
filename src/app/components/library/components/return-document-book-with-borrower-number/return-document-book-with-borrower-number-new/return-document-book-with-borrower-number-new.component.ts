
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ReturnDocumentBookWithBorrowerNumber } from 'app/shared/models/return-document-book-with-borrower-number';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ReturnDocumentBookWithBorrowerNumberService } from '../shared/return-document-book-with-borrower-number.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-return-document-book-with-borrower-number-new',
  templateUrl: './return-document-book-with-borrower-number-new.component.html',
  styleUrls: ['./return-document-book-with-borrower-number-new.component.scss'],
  providers: [
    ]
})

export class ReturnDocumentBookWithBorrowerNumberNewComponent extends AppBaseComponent implements OnInit {
  returnDocumentBookWithBorrowerNumberForm: FormGroup;
  @Input() selectedReturnDocumentBookWithBorrowerNumber: ReturnDocumentBookWithBorrowerNumber;
  errorMessages: FormControlError[] = [
        
  ];

  private subDepartmentsService: LookupService;
private jobTypesService: LookupService;

  
administrationSelectOptions: MaterialSelectOptions;
jobBorrowerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administration', { static: true }) AdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('jobBorrower', { static: true }) JobBorrowerSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ReturnDocumentBookWithBorrowerNumberNewComponent>,
    public returnDocumentBookWithBorrowerNumberService: ReturnDocumentBookWithBorrowerNumberService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedReturnDocumentBookWithBorrowerNumber = new ReturnDocumentBookWithBorrowerNumber();

    
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
     
  id : [0],
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
    this.returnDocumentBookWithBorrowerNumberService.create(this.returnDocumentBookWithBorrowerNumberForm.value)
        .pipe(switchMap(x => {
			return this.returnDocumentBookWithBorrowerNumberService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.returnDocumentBookWithBorrowerNumberForm.get(name);
    }

  initializeLookupServices() {
    this.subDepartmentsService = new LookupService('subdepartments', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
