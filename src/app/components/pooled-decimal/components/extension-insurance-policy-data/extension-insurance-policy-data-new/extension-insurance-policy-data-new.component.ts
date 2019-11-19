
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ExtensionInsurancePolicyData } from 'app/shared/models/extension-insurance-policy-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ExtensionInsurancePolicyDataService } from '../shared/extension-insurance-policy-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-extension-insurance-policy-data-new',
  templateUrl: './extension-insurance-policy-data-new.component.html',
  styleUrls: ['./extension-insurance-policy-data-new.component.scss'],
  providers: [
    ]
})

export class ExtensionInsurancePolicyDataNewComponent extends AppBaseComponent implements OnInit {
  extensionInsurancePolicyDataForm: FormGroup;
  @Input() selectedExtensionInsurancePolicyData: ExtensionInsurancePolicyData;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ExtensionInsurancePolicyDataNewComponent>,
    public extensionInsurancePolicyDataService: ExtensionInsurancePolicyDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtensionInsurancePolicyData = new ExtensionInsurancePolicyData();

    

    this.extensionInsurancePolicyDataForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedExtensionInsurancePolicyData.buildingCode, [ Validators.required ]],
  insuranceCompany : [this.selectedExtensionInsurancePolicyData.insuranceCompany, [ Validators.required ]],
  modelCode : [this.selectedExtensionInsurancePolicyData.modelCode, [ Validators.required ]],
  floorsNumber : [this.selectedExtensionInsurancePolicyData.floorsNumber, [ Validators.required ]],
  classroomNumber : [this.selectedExtensionInsurancePolicyData.classroomNumber, [ Validators.required ]],
  extensionDate : [this.selectedExtensionInsurancePolicyData.extensionDate, [ Validators.required ]],
  extensionCode : [this.selectedExtensionInsurancePolicyData.extensionCode, [ Validators.required ]],
  extensionAmount : [this.selectedExtensionInsurancePolicyData.extensionAmount, [ Validators.required ]],
  insuranceFee : [this.selectedExtensionInsurancePolicyData.insuranceFee, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.extensionInsurancePolicyDataService.create(this.extensionInsurancePolicyDataForm.value)
        .pipe(switchMap(x => {
			return this.extensionInsurancePolicyDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.extensionInsurancePolicyDataForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
