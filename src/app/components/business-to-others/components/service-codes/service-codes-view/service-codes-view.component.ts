
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ServiceCodes } from 'app/shared/models/service-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ServiceCodesService } from '../shared/service-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-service-codes-view',
  templateUrl: './service-codes-view.component.html',
  styleUrls: ['./service-codes-view.component.scss'],
  providers: []
})

export class ServiceCodesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedServiceCodes: ServiceCodes;
  serviceCodesForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedServiceCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ServiceCodesViewComponent>,
    public serviceCodesService: ServiceCodesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedServiceCodes = this.selectedServiceCodesDialog.data || this.selectedServiceCodes;

    

    this.serviceCodesForm = this.formBuilder.group({
      
  serviceCode : [this.selectedServiceCodes.serviceCode],
  serviceConfiguration : [this.selectedServiceCodes.serviceConfiguration]
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
    return this.serviceCodesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.serviceCodesForm.controls)) {
      this.serviceCodesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

