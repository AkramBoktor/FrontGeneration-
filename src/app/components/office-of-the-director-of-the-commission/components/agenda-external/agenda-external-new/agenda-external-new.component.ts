
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AgendaExternal } from 'app/shared/models/agenda-external';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AgendaExternalService } from '../shared/agenda-external.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-agenda-external-new',
  templateUrl: './agenda-external-new.component.html',
  styleUrls: ['./agenda-external-new.component.scss'],
  providers: [
    ]
})

export class AgendaExternalNewComponent extends AppBaseComponent implements OnInit {
  agendaExternalForm: FormGroup;
  @Input() selectedAgendaExternal: AgendaExternal;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AgendaExternalNewComponent>,
    public agendaExternalService: AgendaExternalService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAgendaExternal = new AgendaExternal();

    

    this.agendaExternalForm = this.formBuilder.group({
     
  id : [0],
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
    this.agendaExternalService.create(this.agendaExternalForm.value)
        .pipe(switchMap(x => {
			return this.agendaExternalService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.agendaExternalForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
