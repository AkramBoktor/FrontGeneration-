
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { WhatHappenedInTheSession } from 'app/shared/models/what-happened-in-the-session';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { WhatHappenedInTheSessionService } from '../shared/what-happened-in-the-session.service';




@Component({
  selector: 'app-what-happened-in-the-session-edit',
  templateUrl: './what-happened-in-the-session-edit.component.html',
  styleUrls: ['./what-happened-in-the-session-edit.component.scss'],
  providers: []
})

export class WhatHappenedInTheSessionEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedWhatHappenedInTheSession: WhatHappenedInTheSession;
  whatHappenedInTheSessionForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private entityTypeService: LookupService;
private entityCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
entityTypeSelectOptions: MaterialSelectOptions;
entityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityType', { static: true }) EntityTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('entityCode', { static: true }) EntityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedWhatHappenedInTheSessionDialog: any,
    @Optional() public dialogRef: MatDialogRef<WhatHappenedInTheSessionEditComponent>,
    public whatHappenedInTheSessionService: WhatHappenedInTheSessionService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedWhatHappenedInTheSession = new WhatHappenedInTheSession();
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
      
  id : [this.selectedWhatHappenedInTheSession.id],
  fileNumber : [this.selectedWhatHappenedInTheSession.fileNumber, [ Validators.required ]],
  entityName : [this.selectedWhatHappenedInTheSession.entityName, [ ]],
  lawsuitNumber : [this.selectedWhatHappenedInTheSession.lawsuitNumber, [ ]],
  year : [this.selectedWhatHappenedInTheSession.year, [ ]],
  sessionEvents : [this.selectedWhatHappenedInTheSession.sessionEvents, [ Validators.required ]],
  branchCode : [this.selectedWhatHappenedInTheSession.branchCode, [ ]],
  entityType : [this.selectedWhatHappenedInTheSession.entityType, [ ]],
  entityCode : [this.selectedWhatHappenedInTheSession.entityCode, [ ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.whatHappenedInTheSessionService.update(this.whatHappenedInTheSessionForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.whatHappenedInTheSessionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.whatHappenedInTheSessionForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.entityTypeService = new LookupService('entitytypes', this.http);
this.entityCodesService = new LookupService('entitycodes', this.http);
  }
}
