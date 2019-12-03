
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExternalServicesCodesAndCost } from 'app/shared/models/external-services-codes-and-cost';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalServicesCodesAndCostService } from '../shared/external-services-codes-and-cost.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-external-services-codes-and-cost-view',
  templateUrl: './external-services-codes-and-cost-view.component.html',
  styleUrls: ['./external-services-codes-and-cost-view.component.scss'],
  providers: []
})

export class ExternalServicesCodesAndCostViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalServicesCodesAndCost: ExternalServicesCodesAndCost;
  externalServicesCodesAndCostForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalServicesCodesAndCostDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalServicesCodesAndCostViewComponent>,
    public externalServicesCodesAndCostService: ExternalServicesCodesAndCostService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalServicesCodesAndCost = this.selectedExternalServicesCodesAndCostDialog.data || this.selectedExternalServicesCodesAndCost;

    

    this.externalServicesCodesAndCostForm = this.formBuilder.group({
      
  serviceCode : [this.selectedExternalServicesCodesAndCost.serviceCode],
  serviceName : [this.selectedExternalServicesCodesAndCost.serviceName],
  firstClassificationCostRatio : [this.selectedExternalServicesCodesAndCost.firstClassificationCostRatio],
  secondClassificationCostRatio : [this.selectedExternalServicesCodesAndCost.secondClassificationCostRatio],
  thirdClassificationCostRatio : [this.selectedExternalServicesCodesAndCost.thirdClassificationCostRatio]
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
    return this.externalServicesCodesAndCostForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.externalServicesCodesAndCostForm.controls)) {
      this.externalServicesCodesAndCostForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

