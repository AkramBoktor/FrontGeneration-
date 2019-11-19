
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Invoice50 } from 'app/shared/models/invoice-50';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { Invoice50Service } from '../shared/invoice-50.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-invoice-50-new',
  templateUrl: './invoice-50-new.component.html',
  styleUrls: ['./invoice-50-new.component.scss'],
  providers: [
    ]
})

export class Invoice50NewComponent extends AppBaseComponent implements OnInit {
  invoice50Form: FormGroup;
  @Input() selectedInvoice50: Invoice50;
  errorMessages: FormControlError[] = [
        
  ];

  private offeringTypesService: LookupService;
private governoratesService: LookupService;
private extractTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
extractTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('governorate', { static: true }) GovernorateSelectComponent: MaterialSelectComponent;
	@ViewChild('extractType', { static: true }) ExtractTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<Invoice50NewComponent>,
    public invoice50Service: Invoice50Service)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInvoice50 = new Invoice50();

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.governorateSelectOptions = new MaterialSelectOptions({
	 data: this.governoratesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المحافظة',
	});

	this.extractTypeSelectOptions = new MaterialSelectOptions({
	 data: this.extractTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المستخلص',
	});


    this.invoice50Form = this.formBuilder.group({
     
  id : [0],
  bidNumber : [this.selectedInvoice50.bidNumber, [ Validators.required ]],
  school : [this.selectedInvoice50.school, [ Validators.required ]],
  contractorCode : [this.selectedInvoice50.contractorCode, [ ]],
  abstractNumber : [this.selectedInvoice50.abstractNumber, [ Validators.required ]],
  contractualValue : [this.selectedInvoice50.contractualValue, [ ]],
  executionDuration : [this.selectedInvoice50.executionDuration, [ ]],
  abstractPosition : [this.selectedInvoice50.abstractPosition, [ Validators.required ]],
  advancePayment : [this.selectedInvoice50.advancePayment, [ ]],
  receiptDate : [this.selectedInvoice50.receiptDate, [ ]],
  abstractWorksStartDate : [this.selectedInvoice50.abstractWorksStartDate, [ Validators.required ]],
  primaryReceiptDate : [this.selectedInvoice50.primaryReceiptDate, [ ]],
  abstractWorksEndDate : [this.selectedInvoice50.abstractWorksEndDate, [ Validators.required ]],
  fineValue : [this.selectedInvoice50.fineValue, [ Validators.required ]],
  disbursementRate : [this.selectedInvoice50.disbursementRate, [ ]],
  totalValue : [this.selectedInvoice50.totalValue, [ Validators.required ]],
  paymentAmount : [this.selectedInvoice50.paymentAmount, [ ]],
  previousBalance : [this.selectedInvoice50.previousBalance, [ Validators.required ]],
  oldSpent : [this.selectedInvoice50.oldSpent, [ ]],
  advanceBalance : [this.selectedInvoice50.advanceBalance, [ ]],
  abstractValue : [this.selectedInvoice50.abstractValue, [ ]],
  netAbstract : [this.selectedInvoice50.netAbstract, [ ]],
  prepaymentDiscount : [this.selectedInvoice50.prepaymentDiscount, [ ]],
  registrationDate : [this.selectedInvoice50.registrationDate, [ ]],
  paymentRate : [this.selectedInvoice50.paymentRate, [ Validators.required ]],
  requestingAreaNumber : [this.selectedInvoice50.requestingAreaNumber, [ ]],
  serialForm : [this.selectedInvoice50.serialForm, [ ]],
  offeringType : [this.selectedInvoice50.offeringType, [ Validators.required ]],
  governorate : [this.selectedInvoice50.governorate, [ ]],
  extractType : [this.selectedInvoice50.extractType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.invoice50Service.create(this.invoice50Form.value)
        .pipe(switchMap(x => {
			return this.invoice50Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.invoice50Form.get(name);
    }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
  }
 }
