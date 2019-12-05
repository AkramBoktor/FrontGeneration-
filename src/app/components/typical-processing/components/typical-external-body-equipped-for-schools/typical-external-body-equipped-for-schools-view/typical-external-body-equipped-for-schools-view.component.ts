
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TypicalExternalBodyEquippedForSchools } from 'app/shared/models/typical-external-body-equipped-for-schools';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TypicalExternalBodyEquippedForSchoolsService } from '../shared/typical-external-body-equipped-for-schools.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-typical-external-body-equipped-for-schools-view',
  templateUrl: './typical-external-body-equipped-for-schools-view.component.html',
  styleUrls: ['./typical-external-body-equipped-for-schools-view.component.scss'],
  providers: []
})

export class TypicalExternalBodyEquippedForSchoolsViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTypicalExternalBodyEquippedForSchools: TypicalExternalBodyEquippedForSchools;
  typicalExternalBodyEquippedForSchoolsForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTypicalExternalBodyEquippedForSchoolsDialog: any,
    @Optional() public dialogRef: MatDialogRef<TypicalExternalBodyEquippedForSchoolsViewComponent>,
    public typicalExternalBodyEquippedForSchoolsService: TypicalExternalBodyEquippedForSchoolsService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTypicalExternalBodyEquippedForSchools = this.selectedTypicalExternalBodyEquippedForSchoolsDialog.data || this.selectedTypicalExternalBodyEquippedForSchools;

    

    this.typicalExternalBodyEquippedForSchoolsForm = this.formBuilder.group({
      
  supplierName : [this.selectedTypicalExternalBodyEquippedForSchools.supplierName],
  supplierCode : [this.selectedTypicalExternalBodyEquippedForSchools.supplierCode]
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
    return this.typicalExternalBodyEquippedForSchoolsForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.typicalExternalBodyEquippedForSchoolsForm.controls)) {
      this.typicalExternalBodyEquippedForSchoolsForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

