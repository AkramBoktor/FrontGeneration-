
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { WhatHappenedInTheSession } from 'app/shared/models/what-happened-in-the-session';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { WhatHappenedInTheSessionService } from '../shared/what-happened-in-the-session.service';

@Component({
  selector: 'app-what-happened-in-the-session-view',
  templateUrl: './what-happened-in-the-session-view.component.html',
  styleUrls: ['./what-happened-in-the-session-view.component.scss'],
  providers: []
})

export class WhatHappenedInTheSessionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedWhatHappenedInTheSession: WhatHappenedInTheSession;
  whatHappenedInTheSessionForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedWhatHappenedInTheSessionDialog: any,
    @Optional() public dialogRef: MatDialogRef<WhatHappenedInTheSessionViewComponent>,
    public whatHappenedInTheSessionService: WhatHappenedInTheSessionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWhatHappenedInTheSession = this.selectedWhatHappenedInTheSessionDialog.data || this.selectedWhatHappenedInTheSession;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.entityTypeSelectOptions = new MaterialSelectOptions({
	 data: this.entityTypeService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهة',
	});

	this.entityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.entityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الجهة',
	});


    this.whatHappenedInTheSessionForm = this.formBuilder.group({
      
  fileNumber : [this.selectedWhatHappenedInTheSession.fileNumber],
  entityName : [this.selectedWhatHappenedInTheSession.entityName],
  lawsuitNumber : [this.selectedWhatHappenedInTheSession.lawsuitNumber],
  year : [this.selectedWhatHappenedInTheSession.year],
  sessionEvents : [this.selectedWhatHappenedInTheSession.sessionEvents],
  branchCode : [this.selectedWhatHappenedInTheSession.branchCode],
  entityType : [this.selectedWhatHappenedInTheSession.entityType],
  entityCode : [this.selectedWhatHappenedInTheSession.entityCode]
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
    return this.whatHappenedInTheSessionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.whatHappenedInTheSessionForm.controls)) {
      this.whatHappenedInTheSessionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
  }
}

