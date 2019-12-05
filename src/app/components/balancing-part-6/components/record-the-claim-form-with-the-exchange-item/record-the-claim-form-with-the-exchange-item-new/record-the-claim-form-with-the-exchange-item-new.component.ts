
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RecordTheClaimFormWithTheExchangeItem } from 'app/shared/models/record-the-claim-form-with-the-exchange-item';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RecordTheClaimFormWithTheExchangeItemService } from '../shared/record-the-claim-form-with-the-exchange-item.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-record-the-claim-form-with-the-exchange-item-new',
  templateUrl: './record-the-claim-form-with-the-exchange-item-new.component.html',
  styleUrls: ['./record-the-claim-form-with-the-exchange-item-new.component.scss'],
  providers: [
    ]
})

export class RecordTheClaimFormWithTheExchangeItemNewComponent extends AppBaseComponent implements OnInit {
  recordTheClaimFormWithTheExchangeItemForm: FormGroup;
  @Input() selectedRecordTheClaimFormWithTheExchangeItem: RecordTheClaimFormWithTheExchangeItem;
  errorMessages: FormControlError[] = [
        
  ];

  private areasService: LookupService;
private budgetFundingSourceCodesService: LookupService;
private budgetItemsService: LookupService;

  
requestingAreaNumberSelectOptions: MaterialSelectOptions;
fundingSourceSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('requestingAreaNumber', { static: true }) RequestingAreaNumberSelectComponent: MaterialSelectComponent;
	@ViewChild('fundingSource', { static: true }) FundingSourceSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetItem', { static: true }) BudgetItemSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RecordTheClaimFormWithTheExchangeItemNewComponent>,
    public recordTheClaimFormWithTheExchangeItemService: RecordTheClaimFormWithTheExchangeItemService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRecordTheClaimFormWithTheExchangeItem = new RecordTheClaimFormWithTheExchangeItem();

    
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
     
  id : [0],
  registerationFormData : [this.selectedRecordTheClaimFormWithTheExchangeItem.registerationFormData, [ Validators.required ]],
  formSerial : [this.selectedRecordTheClaimFormWithTheExchangeItem.formSerial, [ Validators.required ]],
  requestingAreaNumber : [this.selectedRecordTheClaimFormWithTheExchangeItem.requestingAreaNumber, [ Validators.required ]],
  fundingSource : [this.selectedRecordTheClaimFormWithTheExchangeItem.fundingSource, [ Validators.required ]],
  budgetItem : [this.selectedRecordTheClaimFormWithTheExchangeItem.budgetItem, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.recordTheClaimFormWithTheExchangeItemService.create(this.recordTheClaimFormWithTheExchangeItemForm.value)
        .pipe(switchMap(x => {
			return this.recordTheClaimFormWithTheExchangeItemService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.recordTheClaimFormWithTheExchangeItemForm.get(name);
    }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
  }
 }
