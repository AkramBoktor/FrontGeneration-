
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExternalServicesCodesAndCost } from 'app/shared/models/external-services-codes-and-cost';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExternalServicesCodesAndCostService } from '../shared/external-services-codes-and-cost.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-external-services-codes-and-cost-new',
  templateUrl: './external-services-codes-and-cost-new.component.html',
  styleUrls: ['./external-services-codes-and-cost-new.component.scss'],
  providers: [
    ]
})

export class ExternalServicesCodesAndCostNewComponent extends AppBaseComponent implements OnInit {
  externalServicesCodesAndCostForm: FormGroup;
  @Input() selectedExternalServicesCodesAndCost: ExternalServicesCodesAndCost;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExternalServicesCodesAndCostNewComponent>,
    public externalServicesCodesAndCostService: ExternalServicesCodesAndCostService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalServicesCodesAndCost = new ExternalServicesCodesAndCost();

    

    this.externalServicesCodesAndCostForm = this.formBuilder.group({
     
  id : [0],
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
    this.externalServicesCodesAndCostService.create(this.externalServicesCodesAndCostForm.value)
        .pipe(switchMap(x => {
			return this.externalServicesCodesAndCostService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.externalServicesCodesAndCostForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
