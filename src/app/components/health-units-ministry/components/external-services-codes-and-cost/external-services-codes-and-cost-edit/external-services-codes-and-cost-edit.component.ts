
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExternalServicesCodesAndCost } from 'app/shared/models/external-services-codes-and-cost';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExternalServicesCodesAndCostService } from '../shared/external-services-codes-and-cost.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-external-services-codes-and-cost-edit',
  templateUrl: './external-services-codes-and-cost-edit.component.html',
  styleUrls: ['./external-services-codes-and-cost-edit.component.scss'],
  providers: []
})

export class ExternalServicesCodesAndCostEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalServicesCodesAndCost: ExternalServicesCodesAndCost;
  externalServicesCodesAndCostForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalServicesCodesAndCostDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalServicesCodesAndCostEditComponent>,
    public externalServicesCodesAndCostService: ExternalServicesCodesAndCostService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalServicesCodesAndCost = new ExternalServicesCodesAndCost();
    this.selectedExternalServicesCodesAndCost = this.selectedExternalServicesCodesAndCostDialog.data || this.selectedExternalServicesCodesAndCost;

    

    this.externalServicesCodesAndCostForm = this.formBuilder.group({
      
  id : [this.selectedExternalServicesCodesAndCost.id],
  serviceCode : [this.selectedExternalServicesCodesAndCost.serviceCode, [ Validators.required ]],
  serviceName : [this.selectedExternalServicesCodesAndCost.serviceName, [ Validators.required ]],
  firstClassificationCostRatio : [this.selectedExternalServicesCodesAndCost.firstClassificationCostRatio, [ Validators.required ]],
  secondClassificationCostRatio : [this.selectedExternalServicesCodesAndCost.secondClassificationCostRatio, [ Validators.required ]],
  thirdClassificationCostRatio : [this.selectedExternalServicesCodesAndCost.thirdClassificationCostRatio, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.externalServicesCodesAndCostService.update(this.externalServicesCodesAndCostForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.externalServicesCodesAndCostService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.externalServicesCodesAndCostForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
