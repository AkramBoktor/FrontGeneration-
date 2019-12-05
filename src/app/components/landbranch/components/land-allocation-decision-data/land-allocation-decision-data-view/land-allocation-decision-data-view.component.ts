
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LandAllocationDecisionData } from 'app/shared/models/land-allocation-decision-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LandAllocationDecisionDataService } from '../shared/land-allocation-decision-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-land-allocation-decision-data-view',
  templateUrl: './land-allocation-decision-data-view.component.html',
  styleUrls: ['./land-allocation-decision-data-view.component.scss'],
  providers: []
})

export class LandAllocationDecisionDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLandAllocationDecisionData: LandAllocationDecisionData;
  landAllocationDecisionDataForm: FormGroup;

  private allocationTypeCodesService: LookupService;

  
allocationTypeCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLandAllocationDecisionDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<LandAllocationDecisionDataViewComponent>,
    public landAllocationDecisionDataService: LandAllocationDecisionDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAllocationDecisionData = this.selectedLandAllocationDecisionDataDialog.data || this.selectedLandAllocationDecisionData;

    
	this.allocationTypeCodeSelectOptions = new MaterialSelectOptions({
	 data: this.allocationTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التخصيص',
	});


    this.landAllocationDecisionDataForm = this.formBuilder.group({
      
  landID : [this.selectedLandAllocationDecisionData.landID],
  allocationNumber : [this.selectedLandAllocationDecisionData.allocationNumber],
  allocationDate : [this.selectedLandAllocationDecisionData.allocationDate],
  allocationTypeCode : [this.selectedLandAllocationDecisionData.allocationTypeCode]
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
    return this.landAllocationDecisionDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.landAllocationDecisionDataForm.controls)) {
      this.landAllocationDecisionDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.allocationTypeCodesService = new LookupService('allocationtypecodes', this.http);
  }
}

