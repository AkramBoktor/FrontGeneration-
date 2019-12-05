
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { DeviceCancellation } from 'app/shared/models/device-cancellation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { DeviceCancellationService } from '../shared/device-cancellation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-device-cancellation-view',
  templateUrl: './device-cancellation-view.component.html',
  styleUrls: ['./device-cancellation-view.component.scss'],
  providers: []
})

export class DeviceCancellationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeviceCancellation: DeviceCancellation;
  deviceCancellationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeviceCancellationDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeviceCancellationViewComponent>,
    public deviceCancellationService: DeviceCancellationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeviceCancellation = this.selectedDeviceCancellationDialog.data || this.selectedDeviceCancellation;

    

    this.deviceCancellationForm = this.formBuilder.group({
      
  date : [this.selectedDeviceCancellation.date],
  schoolName : [this.selectedDeviceCancellation.schoolName],
  laboratoryNumber : [this.selectedDeviceCancellation.laboratoryNumber],
  deviceNumber : [this.selectedDeviceCancellation.deviceNumber]
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
    return this.deviceCancellationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.deviceCancellationForm.controls)) {
      this.deviceCancellationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

