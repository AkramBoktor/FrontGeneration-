
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Invoice50 } from 'app/shared/models/invoice-50';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { Invoice50Service } from '../shared/invoice-50.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-invoice-50-edit',
  templateUrl: './invoice-50-edit.component.html',
  styleUrls: ['./invoice-50-edit.component.scss'],
  providers: []
})

export class Invoice50EditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInvoice50: Invoice50;
  invoice50Form: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private offeringTypesService: LookupService;
private extractTypesService: LookupService;
private governoratesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
extractTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('extractType', { static: true }) ExtractTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInvoice50Dialog: any,
    @Optional() public dialogRef: MatDialogRef<Invoice50EditComponent>,
    public invoice50Service: Invoice50Service) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInvoice50 = new Invoice50();
    this.selectedInvoice50 = this.selectedInvoice50Dialog.data || this.selectedInvoice50;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.extractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});


    this.invoice50Form = this.formBuilder.group({
      
  id : [this.selectedInvoice50.id],
  paymentRate : [this.selectedInvoice50.paymentRate, [ Validators.required ]],
  registrationDate : [this.selectedInvoice50.registrationDate, [ ]],
  prepaymentDiscount : [this.selectedInvoice50.prepaymentDiscount, [ ]],
  netAbstract : [this.selectedInvoice50.netAbstract, [ ]],
  abstractValue : [this.selectedInvoice50.abstractValue, [ ]],
  advanceBalance : [this.selectedInvoice50.advanceBalance, [ ]],
  oldSpent : [this.selectedInvoice50.oldSpent, [ ]],
  previousBalance : [this.selectedInvoice50.previousBalance, [ Validators.required ]],
  paymentAmount : [this.selectedInvoice50.paymentAmount, [ ]],
  totalValue : [this.selectedInvoice50.totalValue, [ Validators.required ]],
  disbursementRate : [this.selectedInvoice50.disbursementRate, [ ]],
  fineValue : [this.selectedInvoice50.fineValue, [ Validators.required ]],
  requestingAreaNumber : [this.selectedInvoice50.requestingAreaNumber, [ ]],
  abstractWorksEndDate : [this.selectedInvoice50.abstractWorksEndDate, [ Validators.required ]],
  abstractWorksStartDate : [this.selectedInvoice50.abstractWorksStartDate, [ Validators.required ]],
  receiptDate : [this.selectedInvoice50.receiptDate, [ ]],
  advancePayment : [this.selectedInvoice50.advancePayment, [ ]],
  abstractPosition : [this.selectedInvoice50.abstractPosition, [ Validators.required ]],
  executionDuration : [this.selectedInvoice50.executionDuration, [ ]],
  contractualValue : [this.selectedInvoice50.contractualValue, [ ]],
  abstractNumber : [this.selectedInvoice50.abstractNumber, [ Validators.required ]],
  contractorCode : [this.selectedInvoice50.contractorCode, [ Validators.required ]],
  school : [this.selectedInvoice50.school, [ Validators.required ]],
  bidNumber : [this.selectedInvoice50.bidNumber, [ Validators.required ]],
  primaryReceiptDate : [this.selectedInvoice50.primaryReceiptDate, [ ]],
  serialForm : [this.selectedInvoice50.serialForm, [ ]],
  offeringType : [this.selectedInvoice50.offeringType, [ Validators.required ]],
  extractType : [this.selectedInvoice50.extractType, [ Validators.required ]],
  governorate : [this.selectedInvoice50.governorate, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.invoice50Service.update(this.invoice50Form.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.invoice50Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.invoice50Form.get(name);
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
  }
}
