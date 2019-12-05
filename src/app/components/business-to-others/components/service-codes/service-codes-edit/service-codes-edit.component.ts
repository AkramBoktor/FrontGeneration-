
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ServiceCodes } from 'app/shared/models/service-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ServiceCodesService } from '../shared/service-codes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-service-codes-edit',
  templateUrl: './service-codes-edit.component.html',
  styleUrls: ['./service-codes-edit.component.scss'],
  providers: []
})

export class ServiceCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedServiceCodes: ServiceCodes;
  serviceCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedServiceCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<ServiceCodesEditComponent>,
    public serviceCodesService: ServiceCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedServiceCodes = new ServiceCodes();
    this.selectedServiceCodes = this.selectedServiceCodesDialog.data || this.selectedServiceCodes;

    

    this.serviceCodesForm = this.formBuilder.group({
      
  id : [this.selectedServiceCodes.id],
  serviceCode : [this.selectedServiceCodes.serviceCode, [ Validators.required ]],
  serviceConfiguration : [this.selectedServiceCodes.serviceConfiguration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.serviceCodesService.update(this.serviceCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.serviceCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.serviceCodesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
