
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AgendaInternal } from 'app/shared/models/agenda-internal';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AgendaInternalService } from '../shared/agenda-internal.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-agenda-internal-new',
  templateUrl: './agenda-internal-new.component.html',
  styleUrls: ['./agenda-internal-new.component.scss'],
  providers: [
    ]
})

export class AgendaInternalNewComponent extends AppBaseComponent implements OnInit {
  agendaInternalForm: FormGroup;
  @Input() selectedAgendaInternal: AgendaInternal;
  errorMessages: FormControlError[] = [
        
  ];

  private jobTypesService: LookupService;
private subDepartmentsService: LookupService;

  
jobSelectOptions: MaterialSelectOptions;
entitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('job', { static: true }) JobSelectComponent: MaterialSelectComponent;
	@ViewChild('entity', { static: true }) EntitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AgendaInternalNewComponent>,
    public agendaInternalService: AgendaInternalService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAgendaInternal = new AgendaInternal();

    
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
     
  id : [0],
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
    this.agendaInternalService.create(this.agendaInternalForm.value)
        .pipe(switchMap(x => {
			return this.agendaInternalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.agendaInternalForm.get(name);
    }

  initializeLookupServices() {
    this.jobTypesService = new LookupService('jobtypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
 }
