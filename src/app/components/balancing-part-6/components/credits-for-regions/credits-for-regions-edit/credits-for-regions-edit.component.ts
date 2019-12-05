
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { CreditsForRegions } from 'app/shared/models/credits-for-regions';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { CreditsForRegionsService } from '../shared/credits-for-regions.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-credits-for-regions-edit',
  templateUrl: './credits-for-regions-edit.component.html',
  styleUrls: ['./credits-for-regions-edit.component.scss'],
  providers: []
})

export class CreditsForRegionsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCreditsForRegions: CreditsForRegions;
  creditsForRegionsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
	{
	 errorName: 'min',
	 errorMessage: 'لا يوجد مسلسل يساوي صفر'
	}
      ];

  private areasService: LookupService;
private budgetItemsService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('budgetItem', { static: true }) BudgetItemSelectComponent: MaterialSelectComponent;
	@ViewChild('fundingSourceNumber', { static: true }) FundingSourceNumberSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCreditsForRegionsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CreditsForRegionsEditComponent>,
    public creditsForRegionsService: CreditsForRegionsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCreditsForRegions = new CreditsForRegions();
    this.selectedCreditsForRegions = this.selectedCreditsForRegionsDialog.data || this.selectedCreditsForRegions;

    
	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقة',
	});

	this.budgetItemSelectOptions = new MaterialSelectOptions({
	 data: this.budgetItemsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'بند الموازنة',
	});

	this.fundingSourceNumberSelectOptions = new MaterialSelectOptions({
	 data: this.budgetFundingSourceCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم مصدر التمويل',
	});


    this.creditsForRegionsForm = this.formBuilder.group({
      
  id : [this.selectedCreditsForRegions.id],
  budgetYear : [this.selectedCreditsForRegions.budgetYear, [ Validators.required ]],
  regionApprovedAmount : [this.selectedCreditsForRegions.regionApprovedAmount, [ Validators.required ]],
  areaCode : [this.selectedCreditsForRegions.areaCode, [ Validators.required ]],
  budgetItem : [this.selectedCreditsForRegions.budgetItem, [ Validators.required ]],
  fundingSourceNumber : [this.selectedCreditsForRegions.fundingSourceNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.creditsForRegionsService.update(this.creditsForRegionsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.creditsForRegionsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.creditsForRegionsForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}
