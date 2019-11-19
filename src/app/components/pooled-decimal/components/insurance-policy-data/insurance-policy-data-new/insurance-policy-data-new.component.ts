
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { InsurancePolicyData } from 'app/shared/models/insurance-policy-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { InsurancePolicyDataService } from '../shared/insurance-policy-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-insurance-policy-data-new',
  templateUrl: './insurance-policy-data-new.component.html',
  styleUrls: ['./insurance-policy-data-new.component.scss'],
  providers: [
    ]
})

export class InsurancePolicyDataNewComponent extends AppBaseComponent implements OnInit {
  insurancePolicyDataForm: FormGroup;
  @Input() selectedInsurancePolicyData: InsurancePolicyData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<InsurancePolicyDataNewComponent>,
    public insurancePolicyDataService: InsurancePolicyDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInsurancePolicyData = new InsurancePolicyData();

    

    this.insurancePolicyDataForm = this.formBuilder.group({
     
  id : [0],
  companyCode : [this.selectedInsurancePolicyData.companyCode, [ Validators.required ]],
  insurancePolicyDate : [this.selectedInsurancePolicyData.insurancePolicyDate, [ Validators.required ]],
  insurancePolicyCode : [this.selectedInsurancePolicyData.insurancePolicyCode, [ Validators.required ]],
  buildingCode : [this.selectedInsurancePolicyData.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedInsurancePolicyData.extensionCode, [ Validators.required ]],
  modelCode : [this.selectedInsurancePolicyData.modelCode, [ Validators.required ]],
  floorsNumber : [this.selectedInsurancePolicyData.floorsNumber, [ Validators.required ]],
  classroomNumber : [this.selectedInsurancePolicyData.classroomNumber, [ Validators.required ]],
  insuranceAmount : [this.selectedInsurancePolicyData.insuranceAmount, [ Validators.required ]],
  insuranceFee : [this.selectedInsurancePolicyData.insuranceFee, [ Validators.required ]],
  deliveryDate : [this.selectedInsurancePolicyData.deliveryDate, [ Validators.required ]],
  paymentReceiptNumber : [this.selectedInsurancePolicyData.paymentReceiptNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.insurancePolicyDataService.create(this.insurancePolicyDataForm.value)
        .pipe(switchMap(x => {
			return this.insurancePolicyDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.insurancePolicyDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
