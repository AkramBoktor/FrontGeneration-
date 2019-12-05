
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Accreditation } from 'app/shared/models/accreditation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AccreditationService } from '../shared/accreditation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-accreditation-view',
  templateUrl: './accreditation-view.component.html',
  styleUrls: ['./accreditation-view.component.scss'],
  providers: []
})

export class AccreditationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAccreditation: Accreditation;
  accreditationForm: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAccreditationDialog: any,
    @Optional() public dialogRef: MatDialogRef<AccreditationViewComponent>,
    public accreditationService: AccreditationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAccreditation = this.selectedAccreditationDialog.data || this.selectedAccreditation;

    

    this.accreditationForm = this.formBuilder.group({
      
  accreditationCode : [this.selectedAccreditation.accreditationCode],
  accreditationName : [this.selectedAccreditation.accreditationName]
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
    return this.accreditationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.accreditationForm.controls)) {
      this.accreditationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

