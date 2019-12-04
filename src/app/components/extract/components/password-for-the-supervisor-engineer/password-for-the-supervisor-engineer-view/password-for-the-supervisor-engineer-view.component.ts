
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { PasswordForTheSupervisorEngineer } from 'app/shared/models/password-for-the-supervisor-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { PasswordForTheSupervisorEngineerService } from '../shared/password-for-the-supervisor-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-password-for-the-supervisor-engineer-view',
  templateUrl: './password-for-the-supervisor-engineer-view.component.html',
  styleUrls: ['./password-for-the-supervisor-engineer-view.component.scss'],
  providers: []
})

export class PasswordForTheSupervisorEngineerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedPasswordForTheSupervisorEngineer: PasswordForTheSupervisorEngineer;
  passwordForTheSupervisorEngineerForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedPasswordForTheSupervisorEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<PasswordForTheSupervisorEngineerViewComponent>,
    public passwordForTheSupervisorEngineerService: PasswordForTheSupervisorEngineerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPasswordForTheSupervisorEngineer = this.selectedPasswordForTheSupervisorEngineerDialog.data || this.selectedPasswordForTheSupervisorEngineer;

    

    this.passwordForTheSupervisorEngineerForm = this.formBuilder.group({
      
  specializedEngineerNumber : [this.selectedPasswordForTheSupervisorEngineer.specializedEngineerNumber],
  password : [this.selectedPasswordForTheSupervisorEngineer.password]
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
    return this.passwordForTheSupervisorEngineerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.passwordForTheSupervisorEngineerForm.controls)) {
      this.passwordForTheSupervisorEngineerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

