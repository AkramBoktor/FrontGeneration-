
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CreditsForRegions } from 'app/shared/models/credits-for-regions';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CreditsForRegionsService } from '../shared/credits-for-regions.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-credits-for-regions-view',
  templateUrl: './credits-for-regions-view.component.html',
  styleUrls: ['./credits-for-regions-view.component.scss'],
  providers: []
})

export class CreditsForRegionsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCreditsForRegions: CreditsForRegions;
  creditsForRegionsForm: FormGroup;

  private areasService: LookupService;
private budgetItemsService: LookupService;
private budgetFundingSourceCodesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
budgetItemSelectOptions: MaterialSelectOptions;
fundingSourceNumberSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCreditsForRegionsDialog: any,
    @Optional() public dialogRef: MatDialogRef<CreditsForRegionsViewComponent>,
    public creditsForRegionsService: CreditsForRegionsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  budgetYear : [this.selectedCreditsForRegions.budgetYear],
  regionApprovedAmount : [this.selectedCreditsForRegions.regionApprovedAmount],
  areaCode : [this.selectedCreditsForRegions.areaCode],
  budgetItem : [this.selectedCreditsForRegions.budgetItem],
  fundingSourceNumber : [this.selectedCreditsForRegions.fundingSourceNumber]
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
    return this.creditsForRegionsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.creditsForRegionsForm.controls)) {
      this.creditsForRegionsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.budgetItemsService = new LookupService('budgetitems', this.http);
this.budgetFundingSourceCodesService = new LookupService('budgetfundingsourcecodes', this.http);
  }
}

