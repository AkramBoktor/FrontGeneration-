
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ContractorsClaim } from 'app/shared/models/contractors-claim';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ContractorsClaimService } from '../shared/contractors-claim.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-contractors-claim-edit',
  templateUrl: './contractors-claim-edit.component.html',
  styleUrls: ['./contractors-claim-edit.component.scss'],
  providers: []
})

export class ContractorsClaimEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedContractorsClaim: ContractorsClaim;
  contractorsClaimForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private areasService: LookupService;
private offeringTypesService: LookupService;

  
areaCodeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedContractorsClaimDialog: any,
    @Optional() public dialogRef: MatDialogRef<ContractorsClaimEditComponent>,
    public contractorsClaimService: ContractorsClaimService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedContractorsClaim = new ContractorsClaim();
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
      
  id : [this.selectedContractorsClaim.id],
  claimCode : [this.selectedContractorsClaim.claimCode, [ Validators.required ]],
  schoolNumber : [this.selectedContractorsClaim.schoolNumber, [ Validators.required ]],
  bidNumber : [this.selectedContractorsClaim.bidNumber, [ Validators.required ]],
  workType : [this.selectedContractorsClaim.workType, [ Validators.required ]],
  contractorName : [this.selectedContractorsClaim.contractorName, [ Validators.required ]],
  siteDeliveryDate : [this.selectedContractorsClaim.siteDeliveryDate, [ Validators.required ]],
  claimType : [this.selectedContractorsClaim.claimType, [ Validators.required ]],
  executionDuration : [this.selectedContractorsClaim.executionDuration, [ Validators.required ]],
  claimDate : [this.selectedContractorsClaim.claimDate, [ Validators.required ]],
  supervisingEngineer : [this.selectedContractorsClaim.supervisingEngineer, [ Validators.required ]],
  areaCode : [this.selectedContractorsClaim.areaCode, [ Validators.required ]],
  offeringType : [this.selectedContractorsClaim.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.contractorsClaimService.update(this.contractorsClaimForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.contractorsClaimService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.contractorsClaimForm.get(name);
  }

  initializeLookupServices() {
    this.areasService = new LookupService('areas', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}
