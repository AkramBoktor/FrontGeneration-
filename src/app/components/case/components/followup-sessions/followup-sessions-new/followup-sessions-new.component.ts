
import { Component, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { FollowupSessions } from 'app/shared/models/followup-sessions';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { FollowupSessionsService } from '../shared/followup-sessions.service';


@Component({
  selector: 'app-followup-sessions-new',
  templateUrl: './followup-sessions-new.component.html',
  styleUrls: ['./followup-sessions-new.component.scss'],
  providers: [
    ]
})

export class FollowupSessionsNewComponent extends AppBaseComponent implements OnInit {
  followupSessionsForm: FormGroup;
  @Input() selectedFollowupSessions: FollowupSessions;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('courtCode', { static: true }) CourtCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('chamberType', { static: true }) ChamberTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FollowupSessionsNewComponent>,
    public followupSessionsService: FollowupSessionsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFollowupSessions = new FollowupSessions();

    
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
     
  id : [0],
  fileNumber : [this.selectedFollowupSessions.fileNumber, [ Validators.required ]],
  entityName : [this.selectedFollowupSessions.entityName, [ ]],
  lawsuitNumber : [this.selectedFollowupSessions.lawsuitNumber, [ ]],
  year : [this.selectedFollowupSessions.year, [ ]],
  sessionDate : [this.selectedFollowupSessions.sessionDate, [ Validators.required ]],
  decisionCode : [this.selectedFollowupSessions.decisionCode, [ Validators.required ]],
  nextSessionDate : [this.selectedFollowupSessions.nextSessionDate, [ Validators.required ]],
  branchCode : [this.selectedFollowupSessions.branchCode, [ ]],
  entityType : [this.selectedFollowupSessions.entityType, [ ]],
  entityCode : [this.selectedFollowupSessions.entityCode, [ ]],
  courtCode : [this.selectedFollowupSessions.courtCode, [ ]],
  chamberType : [this.selectedFollowupSessions.chamberType, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.followupSessionsService.create(this.followupSessionsForm.value)
        .pipe(switchMap(x => {
			return this.followupSessionsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.followupSessionsForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
this.courtCodesService = new LookupService('courtcodes', this.http);
this.circuitCodesService = new LookupService('circuitcodes', this.http);
  }
 }
