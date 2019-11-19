
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Invoice50 } from 'app/shared/models/invoice-50';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { Invoice50Service } from '../shared/invoice-50.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-invoice-50-view',
  templateUrl: './invoice-50-view.component.html',
  styleUrls: ['./invoice-50-view.component.scss'],
  providers: []
})

export class Invoice50ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInvoice50: Invoice50;
  invoice50Form: FormGroup;

  private offeringTypesService: LookupService;
private governoratesService: LookupService;
private extractTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;
governorateSelectOptions: MaterialSelectOptions;
extractTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInvoice50Dialog: any,
    @Optional() public dialogRef: MatDialogRef<Invoice50ViewComponent>,
    public invoice50Service: Invoice50Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInvoice50 = this.selectedInvoice50Dialog.data || this.selectedInvoice50;

    
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
      
  bidNumber : [this.selectedInvoice50.bidNumber],
  school : [this.selectedInvoice50.school],
  contractorCode : [this.selectedInvoice50.contractorCode],
  abstractNumber : [this.selectedInvoice50.abstractNumber],
  contractualValue : [this.selectedInvoice50.contractualValue],
  executionDuration : [this.selectedInvoice50.executionDuration],
  abstractPosition : [this.selectedInvoice50.abstractPosition],
  advancePayment : [this.selectedInvoice50.advancePayment],
  receiptDate : [this.selectedInvoice50.receiptDate],
  abstractWorksStartDate : [this.selectedInvoice50.abstractWorksStartDate],
  primaryReceiptDate : [this.selectedInvoice50.primaryReceiptDate],
  abstractWorksEndDate : [this.selectedInvoice50.abstractWorksEndDate],
  fineValue : [this.selectedInvoice50.fineValue],
  disbursementRate : [this.selectedInvoice50.disbursementRate],
  totalValue : [this.selectedInvoice50.totalValue],
  paymentAmount : [this.selectedInvoice50.paymentAmount],
  previousBalance : [this.selectedInvoice50.previousBalance],
  oldSpent : [this.selectedInvoice50.oldSpent],
  advanceBalance : [this.selectedInvoice50.advanceBalance],
  abstractValue : [this.selectedInvoice50.abstractValue],
  netAbstract : [this.selectedInvoice50.netAbstract],
  prepaymentDiscount : [this.selectedInvoice50.prepaymentDiscount],
  registrationDate : [this.selectedInvoice50.registrationDate],
  paymentRate : [this.selectedInvoice50.paymentRate],
  requestingAreaNumber : [this.selectedInvoice50.requestingAreaNumber],
  serialForm : [this.selectedInvoice50.serialForm],
  offeringType : [this.selectedInvoice50.offeringType],
  governorate : [this.selectedInvoice50.governorate],
  extractType : [this.selectedInvoice50.extractType]
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
    return this.invoice50Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.invoice50Form.controls)) {
      this.invoice50Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.governoratesService = new LookupService('governorates', this.http);
this.extractTypesService = new LookupService('extracttypes', this.http);
  }
}

