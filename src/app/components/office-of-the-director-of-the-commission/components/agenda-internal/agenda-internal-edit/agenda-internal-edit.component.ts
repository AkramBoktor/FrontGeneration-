
import { Component, Inject, Injector, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AgendaInternal } from 'app/shared/models/agenda-internal';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';
import { AgendaInternalService } from '../shared/agenda-internal.service';




@Component({
  selector: 'app-agenda-internal-edit',
  templateUrl: './agenda-internal-edit.component.html',
  styleUrls: ['./agenda-internal-edit.component.scss'],
  providers: []
})

export class AgendaInternalEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAgendaInternal: AgendaInternal;
  agendaInternalForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private jobTypesService: LookupService;
private subDepartmentsService: LookupService;

  
jobSelectOptions: MaterialSelectOptions;
entitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('job', { static: true }) JobSelectComponent: MaterialSelectComponent;
	@ViewChild('entity', { static: true }) EntitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAgendaInternalDialog: any,
    @Optional() public dialogRef: MatDialogRef<AgendaInternalEditComponent>,
    public agendaInternalService: AgendaInternalService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAgendaInternal = new AgendaInternal();
    this.selectedAgendaInternal = this.selectedAgendaInternalDialog.data || this.selectedAgendaInternal;

    
	this.jobSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه',
	});

	this.entitySelectOptions = new MaterialSelectOptions({
	 data: this.subDepartmentsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'جهه',
	});


    this.agendaInternalForm = this.formBuilder.group({
      
  id : [this.selectedAgendaInternal.id],
  employeeCode : [this.selectedAgendaInternal.employeeCode, [ Validators.required ]],
  phoneNumber : [this.selectedAgendaInternal.phoneNumber, [ Validators.required ]],
  email : [this.selectedAgendaInternal.email, [ Validators.required ]],
  employeeName : [this.selectedAgendaInternal.employeeName, [ ]],
  job : [this.selectedAgendaInternal.job, [ Validators.required ]],
  entity : [this.selectedAgendaInternal.entity, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.agendaInternalService.update(this.agendaInternalForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.agendaInternalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.agendaInternalForm.get(name);
  }

  initializeLookupServices() {
    this.jobTypesService = new LookupService('jobtypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}
