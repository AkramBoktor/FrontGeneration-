
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ServiceCodes } from 'app/shared/models/service-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ServiceCodesService } from '../shared/service-codes.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-service-codes-new',
  templateUrl: './service-codes-new.component.html',
  styleUrls: ['./service-codes-new.component.scss'],
  providers: [
    ]
})

export class ServiceCodesNewComponent extends AppBaseComponent implements OnInit {
  serviceCodesForm: FormGroup;
  @Input() selectedServiceCodes: ServiceCodes;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ServiceCodesNewComponent>,
    public serviceCodesService: ServiceCodesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedServiceCodes = new ServiceCodes();

    

    this.serviceCodesForm = this.formBuilder.group({
     
  id : [0],
  serviceCode : [this.selectedServiceCodes.serviceCode, [ Validators.required ]],
  serviceConfiguration : [this.selectedServiceCodes.serviceConfiguration, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.serviceCodesService.create(this.serviceCodesForm.value)
        .pipe(switchMap(x => {
			return this.serviceCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.serviceCodesForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
