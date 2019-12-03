
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormADisbursementForm } from 'app/shared/models/form-a-disbursement-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormADisbursementFormService } from '../shared/form-a-disbursement-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-form-a-disbursement-form-new',
  templateUrl: './form-a-disbursement-form-new.component.html',
  styleUrls: ['./form-a-disbursement-form-new.component.scss'],
  providers: [
    ]
})

export class FormADisbursementFormNewComponent extends AppBaseComponent implements OnInit {
  formADisbursementFormForm: FormGroup;
  @Input() selectedFormADisbursementForm: FormADisbursementForm;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FormADisbursementFormNewComponent>,
    public formADisbursementFormService: FormADisbursementFormService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFormADisbursementForm = new FormADisbursementForm();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.formADisbursementFormForm = this.formBuilder.group({
     
  id : [0],
  billNumber : [this.selectedFormADisbursementForm.billNumber, [ ]],
  invoicePagesNumber : [this.selectedFormADisbursementForm.invoicePagesNumber, [ ]],
  invoiceDate : [this.selectedFormADisbursementForm.invoiceDate, [ ]],
  bidNumber : [this.selectedFormADisbursementForm.bidNumber, [ ]],
  companyName : [this.selectedFormADisbursementForm.companyName, [ ]],
  offeringType : [this.selectedFormADisbursementForm.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.formADisbursementFormService.create(this.formADisbursementFormForm.value)
        .pipe(switchMap(x => {
			return this.formADisbursementFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.formADisbursementFormForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
