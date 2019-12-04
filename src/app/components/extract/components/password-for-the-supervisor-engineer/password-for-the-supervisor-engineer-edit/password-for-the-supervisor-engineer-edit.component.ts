
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { PasswordForTheSupervisorEngineer } from 'app/shared/models/password-for-the-supervisor-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { PasswordForTheSupervisorEngineerService } from '../shared/password-for-the-supervisor-engineer.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-password-for-the-supervisor-engineer-edit',
  templateUrl: './password-for-the-supervisor-engineer-edit.component.html',
  styleUrls: ['./password-for-the-supervisor-engineer-edit.component.scss'],
  providers: []
})

export class PasswordForTheSupervisorEngineerEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPasswordForTheSupervisorEngineer: PasswordForTheSupervisorEngineer;
  passwordForTheSupervisorEngineerForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPasswordForTheSupervisorEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<PasswordForTheSupervisorEngineerEditComponent>,
    public passwordForTheSupervisorEngineerService: PasswordForTheSupervisorEngineerService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPasswordForTheSupervisorEngineer = new PasswordForTheSupervisorEngineer();
    this.selectedPasswordForTheSupervisorEngineer = this.selectedPasswordForTheSupervisorEngineerDialog.data || this.selectedPasswordForTheSupervisorEngineer;

    

    this.passwordForTheSupervisorEngineerForm = this.formBuilder.group({
      
  id : [this.selectedPasswordForTheSupervisorEngineer.id],
  specializedEngineerNumber : [this.selectedPasswordForTheSupervisorEngineer.specializedEngineerNumber, [ Validators.required ]],
  password : [this.selectedPasswordForTheSupervisorEngineer.password, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.passwordForTheSupervisorEngineerService.update(this.passwordForTheSupervisorEngineerForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.passwordForTheSupervisorEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.passwordForTheSupervisorEngineerForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
