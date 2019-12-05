
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AgendaInternal } from 'app/shared/models/agenda-internal';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AgendaInternalService } from '../shared/agenda-internal.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-agenda-internal-view',
  templateUrl: './agenda-internal-view.component.html',
  styleUrls: ['./agenda-internal-view.component.scss'],
  providers: []
})

export class AgendaInternalViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAgendaInternal: AgendaInternal;
  agendaInternalForm: FormGroup;

  private jobTypesService: LookupService;
private subDepartmentsService: LookupService;

  
jobSelectOptions: MaterialSelectOptions;
entitySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAgendaInternalDialog: any,
    @Optional() public dialogRef: MatDialogRef<AgendaInternalViewComponent>,
    public agendaInternalService: AgendaInternalService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  employeeCode : [this.selectedAgendaInternal.employeeCode],
  phoneNumber : [this.selectedAgendaInternal.phoneNumber],
  email : [this.selectedAgendaInternal.email],
  employeeName : [this.selectedAgendaInternal.employeeName],
  job : [this.selectedAgendaInternal.job],
  entity : [this.selectedAgendaInternal.entity]
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
    return this.agendaInternalForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.agendaInternalForm.controls)) {
      this.agendaInternalForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.jobTypesService = new LookupService('jobtypes', this.http);
this.subDepartmentsService = new LookupService('subdepartments', this.http);
  }
}

