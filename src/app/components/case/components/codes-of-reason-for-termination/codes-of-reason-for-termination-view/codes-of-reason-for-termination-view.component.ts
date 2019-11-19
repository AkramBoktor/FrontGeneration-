
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { CodesOfReasonForTermination } from 'app/shared/models/codes-of-reason-for-termination';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { CodesOfReasonForTerminationService } from '../shared/codes-of-reason-for-termination.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-codes-of-reason-for-termination-view',
  templateUrl: './codes-of-reason-for-termination-view.component.html',
  styleUrls: ['./codes-of-reason-for-termination-view.component.scss'],
  providers: []
})

export class CodesOfReasonForTerminationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedCodesOfReasonForTermination: CodesOfReasonForTermination;
  codesOfReasonForTerminationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedCodesOfReasonForTerminationDialog: any,
    @Optional() public dialogRef: MatDialogRef<CodesOfReasonForTerminationViewComponent>,
    public codesOfReasonForTerminationService: CodesOfReasonForTerminationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedCodesOfReasonForTermination = this.selectedCodesOfReasonForTerminationDialog.data || this.selectedCodesOfReasonForTermination;

    

    this.codesOfReasonForTerminationForm = this.formBuilder.group({
      
  code : [this.selectedCodesOfReasonForTermination.code],
  name : [this.selectedCodesOfReasonForTermination.name]
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
    return this.codesOfReasonForTerminationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.codesOfReasonForTerminationForm.controls)) {
      this.codesOfReasonForTerminationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

