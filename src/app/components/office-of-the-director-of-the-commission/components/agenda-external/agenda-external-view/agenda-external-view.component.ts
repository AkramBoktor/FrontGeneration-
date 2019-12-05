
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AgendaExternal } from 'app/shared/models/agenda-external';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AgendaExternalService } from '../shared/agenda-external.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-agenda-external-view',
  templateUrl: './agenda-external-view.component.html',
  styleUrls: ['./agenda-external-view.component.scss'],
  providers: []
})

export class AgendaExternalViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAgendaExternal: AgendaExternal;
  agendaExternalForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAgendaExternalDialog: any,
    @Optional() public dialogRef: MatDialogRef<AgendaExternalViewComponent>,
    public agendaExternalService: AgendaExternalService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAgendaExternal = this.selectedAgendaExternalDialog.data || this.selectedAgendaExternal;

    

    this.agendaExternalForm = this.formBuilder.group({
      
  phoneNumber : [this.selectedAgendaExternal.phoneNumber],
  email : [this.selectedAgendaExternal.email],
  newThirdParty : [this.selectedAgendaExternal.newThirdParty],
  newExternalJob : [this.selectedAgendaExternal.newExternalJob],
  externalemployeename : [this.selectedAgendaExternal.externalemployeename]
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
    return this.agendaExternalForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.agendaExternalForm.controls)) {
      this.agendaExternalForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

