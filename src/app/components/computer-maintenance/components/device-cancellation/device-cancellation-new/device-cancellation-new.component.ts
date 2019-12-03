
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { DeviceCancellation } from 'app/shared/models/device-cancellation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { DeviceCancellationService } from '../shared/device-cancellation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-device-cancellation-new',
  templateUrl: './device-cancellation-new.component.html',
  styleUrls: ['./device-cancellation-new.component.scss'],
  providers: [
    ]
})

export class DeviceCancellationNewComponent extends AppBaseComponent implements OnInit {
  deviceCancellationForm: FormGroup;
  @Input() selectedDeviceCancellation: DeviceCancellation;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<DeviceCancellationNewComponent>,
    public deviceCancellationService: DeviceCancellationService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedDeviceCancellation = new DeviceCancellation();

    

    this.deviceCancellationForm = this.formBuilder.group({
     
  id : [0],
  date : [this.selectedDeviceCancellation.date, [ Validators.required ]],
  schoolName : [this.selectedDeviceCancellation.schoolName, [ Validators.required ]],
  laboratoryNumber : [this.selectedDeviceCancellation.laboratoryNumber, [ Validators.required ]],
  deviceNumber : [this.selectedDeviceCancellation.deviceNumber, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.deviceCancellationService.create(this.deviceCancellationForm.value)
        .pipe(switchMap(x => {
			return this.deviceCancellationService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.deviceCancellationForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
