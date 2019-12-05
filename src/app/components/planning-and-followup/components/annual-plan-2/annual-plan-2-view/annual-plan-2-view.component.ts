
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AnnualPlan2 } from 'app/shared/models/annual-plan-2';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AnnualPlan2Service } from '../shared/annual-plan-2.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-annual-plan-2-view',
  templateUrl: './annual-plan-2-view.component.html',
  styleUrls: ['./annual-plan-2-view.component.scss'],
  providers: []
})

export class AnnualPlan2ViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAnnualPlan2: AnnualPlan2;
  annualPlan2Form: FormGroup;

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAnnualPlan2Dialog: any,
    @Optional() public dialogRef: MatDialogRef<AnnualPlan2ViewComponent>,
    public annualPlan2Service: AnnualPlan2Service) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnnualPlan2 = this.selectedAnnualPlan2Dialog.data || this.selectedAnnualPlan2;

    

    this.annualPlan2Form = this.formBuilder.group({
      
  fiveYearplanNumber : [this.selectedAnnualPlan2.fiveYearplanNumber],
  projectsNumber : [this.selectedAnnualPlan2.projectsNumber],
  pLanYear : [this.selectedAnnualPlan2.pLanYear],
  yearplanNumber : [this.selectedAnnualPlan2.yearplanNumber]
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
    return this.annualPlan2Form.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.annualPlan2Form.controls)) {
      this.annualPlan2Form.controls[control].disable();
    }
  }

  initializeLookupServices() {
    
  }
}

