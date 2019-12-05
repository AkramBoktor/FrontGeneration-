
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { RecordTheClaimFormWithTheExchangeItem } from 'app/shared/models/record-the-claim-form-with-the-exchange-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { RecordTheClaimFormWithTheExchangeItemService } from '../shared/record-the-claim-form-with-the-exchange-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-record-the-claim-form-with-the-exchange-item-view',
  templateUrl: './record-the-claim-form-with-the-exchange-item-view.component.html',
  styleUrls: ['./record-the-claim-form-with-the-exchange-item-view.component.scss'],
  providers: []
})

export class RecordTheClaimFormWithTheExchangeItemViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheClaimFormWithTheExchangeItem: RecordTheClaimFormWithTheExchangeItem;
  recordTheClaimFormWithTheExchangeItemForm: FormGroup;

  private areasService: LookupService;
private budgetFundingSourceCodesService: LookupService;
private budgetItemsService: LookupService;

  
requestingAreaNumberSelectOptions: MaterialSelectOptions;
fundingSourceSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheClaimFormWithTheExchangeItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheClaimFormWithTheExchangeItemViewComponent>,
    public recordTheClaimFormWithTheExchangeItemService: RecordTheClaimFormWithTheExchangeItemService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheClaimFormWithTheExchangeItem = this.selectedRecordTheClaimFormWithTheExchangeItemDialog.data || this.selectedRecordTheClaimFormWithTheExchangeItem;

    
	this.requestingAreaNumberSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم المنطقه الطالبه',
	});

	this.fundingSourceSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التمويل',
	});

	this.budgetItemSelectOptions = new MaterialSelectOptions({
	 data: this.budgetItemsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بند الموازنة المطلوب الصرف عليه',
	});


    this.recordTheClaimFormWithTheExchangeItemForm = this.formBuilder.group({
      
  registerationFormData : [this.selectedRecordTheClaimFormWithTheExchangeItem.registerationFormData],
  formSerial : [this.selectedRecordTheClaimFormWithTheExchangeItem.formSerial],
  requestingAreaNumber : [this.selectedRecordTheClaimFormWithTheExchangeItem.requestingAreaNumber],
  fundingSource : [this.selectedRecordTheClaimFormWithTheExchangeItem.fundingSource],
  budgetItem : [this.selectedRecordTheClaimFormWithTheExchangeItem.budgetItem]
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
    return this.recordTheClaimFormWithTheExchangeItemForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.recordTheClaimFormWithTheExchangeItemForm.controls)) {
      this.recordTheClaimFormWithTheExchangeItemForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
  }
}

