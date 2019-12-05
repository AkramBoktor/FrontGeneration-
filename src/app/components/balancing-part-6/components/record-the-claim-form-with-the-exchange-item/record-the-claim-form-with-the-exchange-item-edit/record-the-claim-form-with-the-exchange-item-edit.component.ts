
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RecordTheClaimFormWithTheExchangeItem } from 'app/shared/models/record-the-claim-form-with-the-exchange-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RecordTheClaimFormWithTheExchangeItemService } from '../shared/record-the-claim-form-with-the-exchange-item.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-claim-form-with-the-exchange-item-edit',
  templateUrl: './record-the-claim-form-with-the-exchange-item-edit.component.html',
  styleUrls: ['./record-the-claim-form-with-the-exchange-item-edit.component.scss'],
  providers: []
})

export class RecordTheClaimFormWithTheExchangeItemEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRecordTheClaimFormWithTheExchangeItem: RecordTheClaimFormWithTheExchangeItem;
  recordTheClaimFormWithTheExchangeItemForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
requestingAreaNumberSelectOptions: MaterialSelectOptions;
fundingSourceSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requestingAreaNumber', { static: true }) RequestingAreaNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('fundingSource', { static: true }) FundingSourceSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRecordTheClaimFormWithTheExchangeItemDialog: any,
    @Optional() public dialogRef: MatDialogRef<RecordTheClaimFormWithTheExchangeItemEditComponent>,
    public recordTheClaimFormWithTheExchangeItemService: RecordTheClaimFormWithTheExchangeItemService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheClaimFormWithTheExchangeItem = new RecordTheClaimFormWithTheExchangeItem();
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


    this.recordTheClaimFormWithTheExchangeItemForm = this.formBuilder.group({
      
  id : [this.selectedRecordTheClaimFormWithTheExchangeItem.id],
  registerationFormData : [this.selectedRecordTheClaimFormWithTheExchangeItem.registerationFormData, [ Validators.required ]],
  formSerial : [this.selectedRecordTheClaimFormWithTheExchangeItem.formSerial, [ Validators.required ]],
  budgetItem : [this.selectedRecordTheClaimFormWithTheExchangeItem.budgetItem, [ Validators.required ]],
  requestingAreaNumber : [this.selectedRecordTheClaimFormWithTheExchangeItem.requestingAreaNumber, [ Validators.required ]],
  fundingSource : [this.selectedRecordTheClaimFormWithTheExchangeItem.fundingSource, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.recordTheClaimFormWithTheExchangeItemService.update(this.recordTheClaimFormWithTheExchangeItemForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.recordTheClaimFormWithTheExchangeItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.recordTheClaimFormWithTheExchangeItemForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}
