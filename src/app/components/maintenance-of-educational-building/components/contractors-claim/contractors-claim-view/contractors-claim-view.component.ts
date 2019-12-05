
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ContractorsClaim } from 'app/shared/models/contractors-claim';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ContractorsClaimService } from '../shared/contractors-claim.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-contractors-claim-view',
  templateUrl: './contractors-claim-view.component.html',
  styleUrls: ['./contractors-claim-view.component.scss'],
  providers: []
})

export class ContractorsClaimViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorsClaim: ContractorsClaim;
  contractorsClaimForm: FormGroup;

  private areasService: LookupService;
private offeringTypesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorsClaimDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorsClaimViewComponent>,
    public contractorsClaimService: ContractorsClaimService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorsClaim = this.selectedContractorsClaimDialog.data || this.selectedContractorsClaim;

    
	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقه',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.contractorsClaimForm = this.formBuilder.group({
      
  claimCode : [this.selectedContractorsClaim.claimCode],
  schoolNumber : [this.selectedContractorsClaim.schoolNumber],
  bidNumber : [this.selectedContractorsClaim.bidNumber],
  workType : [this.selectedContractorsClaim.workType],
  contractorName : [this.selectedContractorsClaim.contractorName],
  siteDeliveryDate : [this.selectedContractorsClaim.siteDeliveryDate],
  claimType : [this.selectedContractorsClaim.claimType],
  executionDuration : [this.selectedContractorsClaim.executionDuration],
  claimDate : [this.selectedContractorsClaim.claimDate],
  supervisingEngineer : [this.selectedContractorsClaim.supervisingEngineer],
  areaCode : [this.selectedContractorsClaim.areaCode],
  offeringType : [this.selectedContractorsClaim.offeringType]
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
    return this.contractorsClaimForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.contractorsClaimForm.controls)) {
      this.contractorsClaimForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

