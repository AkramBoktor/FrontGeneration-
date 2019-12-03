
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { DeviceCancellation } from 'app/shared/models/device-cancellation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { DeviceCancellationService } from '../shared/device-cancellation.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-device-cancellation-edit',
  templateUrl: './device-cancellation-edit.component.html',
  styleUrls: ['./device-cancellation-edit.component.scss'],
  providers: []
})

export class DeviceCancellationEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedDeviceCancellation: DeviceCancellation;
  deviceCancellationForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedDeviceCancellationDialog: any,
    @Optional() public dialogRef: MatDialogRef<DeviceCancellationEditComponent>,
    public deviceCancellationService: DeviceCancellationService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeviceCancellation = new DeviceCancellation();
    this.selectedDeviceCancellation = this.selectedDeviceCancellationDialog.data || this.selectedDeviceCancellation;

    

    this.deviceCancellationForm = this.formBuilder.group({
      
  id : [this.selectedDeviceCancellation.id]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.deviceCancellationService.update(this.deviceCancellationForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.deviceCancellationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.deviceCancellationForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
