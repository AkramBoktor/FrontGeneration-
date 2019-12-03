
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AgendaExternal } from 'app/shared/models/agenda-external';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AgendaExternalService } from '../shared/agenda-external.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-agenda-external-edit',
  templateUrl: './agenda-external-edit.component.html',
  styleUrls: ['./agenda-external-edit.component.scss'],
  providers: []
})

export class AgendaExternalEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAgendaExternal: AgendaExternal;
  agendaExternalForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAgendaExternalDialog: any,
    @Optional() public dialogRef: MatDialogRef<AgendaExternalEditComponent>,
    public agendaExternalService: AgendaExternalService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAgendaExternal = new AgendaExternal();
    this.selectedAgendaExternal = this.selectedAgendaExternalDialog.data || this.selectedAgendaExternal;

    

    this.agendaExternalForm = this.formBuilder.group({
      
  id : [this.selectedAgendaExternal.id],
  phoneNumber : [this.selectedAgendaExternal.phoneNumber, [ Validators.required ]],
  email : [this.selectedAgendaExternal.email, [ Validators.required ]],
  newThirdParty : [this.selectedAgendaExternal.newThirdParty, [ Validators.required ]],
  newExternalJob : [this.selectedAgendaExternal.newExternalJob, [ Validators.required ]],
  externalemployeename : [this.selectedAgendaExternal.externalemployeename, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.agendaExternalService.update(this.agendaExternalForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.agendaExternalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.agendaExternalForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
