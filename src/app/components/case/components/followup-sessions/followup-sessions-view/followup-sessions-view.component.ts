
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupSessions } from 'app/shared/models/followup-sessions';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FollowupSessionsService } from '../shared/followup-sessions.service';

@Component({
  selector: 'app-followup-sessions-view',
  templateUrl: './followup-sessions-view.component.html',
  styleUrls: ['./followup-sessions-view.component.scss'],
  providers: []
})

export class FollowupSessionsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowupSessions: FollowupSessions;
  followupSessionsForm: FormGroup;

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private courtCodesService: LookupService;
private circuitCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
courtCodeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowupSessionsDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowupSessionsViewComponent>,
    public followupSessionsService: FollowupSessionsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupSessions = this.selectedFollowupSessionsDialog.data || this.selectedFollowupSessions;

    
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

	this.courtCodeSelectOptions = new MaterialSelectOptions({
	 data: this.courtCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المحكمة ',
	});

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائره ',
	});


    this.followupSessionsForm = this.formBuilder.group({
      
  fileNumber : [this.selectedFollowupSessions.fileNumber],
  entityName : [this.selectedFollowupSessions.entityName],
  lawsuitNumber : [this.selectedFollowupSessions.lawsuitNumber],
  year : [this.selectedFollowupSessions.year],
  sessionDate : [this.selectedFollowupSessions.sessionDate],
  decisionCode : [this.selectedFollowupSessions.decisionCode],
  nextSessionDate : [this.selectedFollowupSessions.nextSessionDate],
  branchCode : [this.selectedFollowupSessions.branchCode],
  entityType : [this.selectedFollowupSessions.entityType],
  entityCode : [this.selectedFollowupSessions.entityCode],
  courtCode : [this.selectedFollowupSessions.courtCode],
  chamberType : [this.selectedFollowupSessions.chamberType]
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
    return this.followupSessionsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.followupSessionsForm.controls)) {
      this.followupSessionsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
  }
}

