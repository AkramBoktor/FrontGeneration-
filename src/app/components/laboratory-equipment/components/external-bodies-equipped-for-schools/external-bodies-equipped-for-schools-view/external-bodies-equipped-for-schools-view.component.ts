
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ExternalBodiesEquippedForSchools } from 'app/shared/models/external-bodies-equipped-for-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ExternalBodiesEquippedForSchoolsService } from '../shared/external-bodies-equipped-for-schools.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-external-bodies-equipped-for-schools-view',
  templateUrl: './external-bodies-equipped-for-schools-view.component.html',
  styleUrls: ['./external-bodies-equipped-for-schools-view.component.scss'],
  providers: []
})

export class ExternalBodiesEquippedForSchoolsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedExternalBodiesEquippedForSchools: ExternalBodiesEquippedForSchools;
  externalBodiesEquippedForSchoolsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedExternalBodiesEquippedForSchoolsDialog: any,
    @Optional() public dialogRef: MatDialogRef<ExternalBodiesEquippedForSchoolsViewComponent>,
    public externalBodiesEquippedForSchoolsService: ExternalBodiesEquippedForSchoolsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedExternalBodiesEquippedForSchools = this.selectedExternalBodiesEquippedForSchoolsDialog.data || this.selectedExternalBodiesEquippedForSchools;

    

    this.externalBodiesEquippedForSchoolsForm = this.formBuilder.group({
      
  supplierCode : [this.selectedExternalBodiesEquippedForSchools.supplierCode],
  supplierName : [this.selectedExternalBodiesEquippedForSchools.supplierName]
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
    return this.externalBodiesEquippedForSchoolsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.externalBodiesEquippedForSchoolsForm.controls)) {
      this.externalBodiesEquippedForSchoolsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

