
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ExtensionInsurancePolicyData } from 'app/shared/models/extension-insurance-policy-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ExtensionInsurancePolicyDataService } from '../shared/extension-insurance-policy-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-extension-insurance-policy-data-edit',
  templateUrl: './extension-insurance-policy-data-edit.component.html',
  styleUrls: ['./extension-insurance-policy-data-edit.component.scss'],
  providers: []
})

export class ExtensionInsurancePolicyDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExtensionInsurancePolicyData: ExtensionInsurancePolicyData;
  extensionInsurancePolicyDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExtensionInsurancePolicyDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExtensionInsurancePolicyDataEditComponent>,
    public extensionInsurancePolicyDataService: ExtensionInsurancePolicyDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExtensionInsurancePolicyData = new ExtensionInsurancePolicyData();
    this.selectedExtensionInsurancePolicyData = this.selectedExtensionInsurancePolicyDataDialog.data || this.selectedExtensionInsurancePolicyData;

    

    this.extensionInsurancePolicyDataForm = this.formBuilder.group({
      
  id : [this.selectedExtensionInsurancePolicyData.id],
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
    this.extensionInsurancePolicyDataService.update(this.extensionInsurancePolicyDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.extensionInsurancePolicyDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.extensionInsurancePolicyDataForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
