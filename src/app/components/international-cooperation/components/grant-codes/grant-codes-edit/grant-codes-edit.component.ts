
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GrantCodes } from 'app/shared/models/grant-codes';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GrantCodesService } from '../shared/grant-codes.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-grant-codes-edit',
  templateUrl: './grant-codes-edit.component.html',
  styleUrls: ['./grant-codes-edit.component.scss'],
  providers: []
})

export class GrantCodesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGrantCodes: GrantCodes;
  grantCodesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGrantCodesDialog: any,
    @Optional() public dialogRef: MatDialogRef<GrantCodesEditComponent>,
    public grantCodesService: GrantCodesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGrantCodes = new GrantCodes();
    this.selectedGrantCodes = this.selectedGrantCodesDialog.data || this.selectedGrantCodes;

    

    this.grantCodesForm = this.formBuilder.group({
      
  id : [this.selectedGrantCodes.id],
  grantCode : [this.selectedGrantCodes.grantCode, [ Validators.required ]],
  grantName : [this.selectedGrantCodes.grantName, [ ]],
  entityCode : [this.selectedGrantCodes.entityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.grantCodesService.update(this.grantCodesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.grantCodesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.grantCodesForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
