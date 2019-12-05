
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { RegisterANewSubsidyCode } from 'app/shared/models/register-a-new-subsidy-code';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { RegisterANewSubsidyCodeService } from '../shared/register-a-new-subsidy-code.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register-a-new-subsidy-code-edit',
  templateUrl: './register-a-new-subsidy-code-edit.component.html',
  styleUrls: ['./register-a-new-subsidy-code-edit.component.scss'],
  providers: []
})

export class RegisterANewSubsidyCodeEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRegisterANewSubsidyCode: RegisterANewSubsidyCode;
  registerANewSubsidyCodeForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRegisterANewSubsidyCodeDialog: any,
    @Optional() public dialogRef: MatDialogRef<RegisterANewSubsidyCodeEditComponent>,
    public registerANewSubsidyCodeService: RegisterANewSubsidyCodeService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRegisterANewSubsidyCode = new RegisterANewSubsidyCode();
    this.selectedRegisterANewSubsidyCode = this.selectedRegisterANewSubsidyCodeDialog.data || this.selectedRegisterANewSubsidyCode;

    

    this.registerANewSubsidyCodeForm = this.formBuilder.group({
      
  id : [this.selectedRegisterANewSubsidyCode.id],
  subsidyCode : [this.selectedRegisterANewSubsidyCode.subsidyCode, [ Validators.required ]],
  subsidyAmount : [this.selectedRegisterANewSubsidyCode.subsidyAmount, [ Validators.required ]],
  subsidyName : [this.selectedRegisterANewSubsidyCode.subsidyName, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.registerANewSubsidyCodeService.update(this.registerANewSubsidyCodeForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.registerANewSubsidyCodeService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.registerANewSubsidyCodeForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
