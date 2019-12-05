
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExternalJobType } from 'app/shared/models/external-job-type';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalJobTypeService } from '../shared/external-job-type.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-external-job-type-view',
  templateUrl: './external-job-type-view.component.html',
  styleUrls: ['./external-job-type-view.component.scss'],
  providers: []
})

export class ExternalJobTypeViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalJobType: ExternalJobType;
  externalJobTypeForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalJobTypeDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalJobTypeViewComponent>,
    public externalJobTypeService: ExternalJobTypeService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalJobType = this.selectedExternalJobTypeDialog.data || this.selectedExternalJobType;

    

    this.externalJobTypeForm = this.formBuilder.group({
      
  eexternaljobcode : [this.selectedExternalJobType.eexternaljobcode],
  externaljobname : [this.selectedExternalJobType.externaljobname]
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
    return this.externalJobTypeForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.externalJobTypeForm.controls)) {
      this.externalJobTypeForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

