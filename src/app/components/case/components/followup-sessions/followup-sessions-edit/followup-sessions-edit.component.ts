
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupSessions } from 'app/shared/models/followup-sessions';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { FollowupSessionsService } from '../shared/followup-sessions.service';




@Component({
  selector: 'app-followup-sessions-edit',
  templateUrl: './followup-sessions-edit.component.html',
  styleUrls: ['./followup-sessions-edit.component.scss'],
  providers: []
})

export class FollowupSessionsEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFollowupSessions: FollowupSessions;
  followupSessionsForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;
private circuitCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;
chamberTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('chamberType', { static: true }) ChamberTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFollowupSessionsDialog: any,
    @Optional() public dialogRef: MatDialogRef<FollowupSessionsEditComponent>,
    public followupSessionsService: FollowupSessionsService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupSessions = new FollowupSessions();
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

	this.chamberTypeSelectOptions = new MaterialSelectOptions({
	 data: this.circuitCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الدائرة',
	});


    this.followupSessionsForm = this.formBuilder.group({
      
  id : [this.selectedFollowupSessions.id],
  fileNumber : [this.selectedFollowupSessions.fileNumber, [ Validators.required ]],
  entityName : [this.selectedFollowupSessions.entityName, [ ]],
  lawsuitNumber : [this.selectedFollowupSessions.lawsuitNumber, [ ]],
  year : [this.selectedFollowupSessions.year, [ ]],
  courtCode : [this.selectedFollowupSessions.courtCode, [ ]],
  sessionDate : [this.selectedFollowupSessions.sessionDate, [ Validators.required ]],
  decisionCode : [this.selectedFollowupSessions.decisionCode, [ Validators.required ]],
  nextSessionDate : [this.selectedFollowupSessions.nextSessionDate, [ Validators.required ]],
  branchCode : [this.selectedFollowupSessions.branchCode, [ ]],
  entityType : [this.selectedFollowupSessions.entityType, [ ]],
  entityCode : [this.selectedFollowupSessions.entityCode, [ ]],
  chamberType : [this.selectedFollowupSessions.chamberType, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.followupSessionsService.update(this.followupSessionsForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.followupSessionsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.followupSessionsForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
  }
}
