
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TypicalFormADisbursementForm } from 'app/shared/models/typical-form-a-disbursement-form';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TypicalFormADisbursementFormService } from '../shared/typical-form-a-disbursement-form.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-typical-form-a-disbursement-form-new',
  templateUrl: './typical-form-a-disbursement-form-new.component.html',
  styleUrls: ['./typical-form-a-disbursement-form-new.component.scss'],
  providers: [
    ]
})

export class TypicalFormADisbursementFormNewComponent extends AppBaseComponent implements OnInit {
  typicalFormADisbursementFormForm: FormGroup;
  @Input() selectedTypicalFormADisbursementForm: TypicalFormADisbursementForm;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TypicalFormADisbursementFormNewComponent>,
    public typicalFormADisbursementFormService: TypicalFormADisbursementFormService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalFormADisbursementForm = new TypicalFormADisbursementForm();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.typicalFormADisbursementFormForm = this.formBuilder.group({
     
  id : [0],
  companyName : [this.selectedTypicalFormADisbursementForm.companyName, [ ]],
  bidNumber : [this.selectedTypicalFormADisbursementForm.bidNumber, [ ]],
  invoiceDate : [this.selectedTypicalFormADisbursementForm.invoiceDate, [ ]],
  invoicePagesNumber : [this.selectedTypicalFormADisbursementForm.invoicePagesNumber, [ ]],
  billNumber : [this.selectedTypicalFormADisbursementForm.billNumber, [ ]],
  offeringType : [this.selectedTypicalFormADisbursementForm.offeringType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.typicalFormADisbursementFormService.create(this.typicalFormADisbursementFormForm.value)
        .pipe(switchMap(x => {
			return this.typicalFormADisbursementFormService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.typicalFormADisbursementFormForm.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
