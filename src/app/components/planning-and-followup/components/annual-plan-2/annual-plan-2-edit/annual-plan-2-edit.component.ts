
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AnnualPlan2 } from 'app/shared/models/annual-plan-2';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AnnualPlan2Service } from '../shared/annual-plan-2.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-annual-plan-2-edit',
  templateUrl: './annual-plan-2-edit.component.html',
  styleUrls: ['./annual-plan-2-edit.component.scss'],
  providers: []
})

export class AnnualPlan2EditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAnnualPlan2: AnnualPlan2;
  annualPlan2Form: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAnnualPlan2Dialog: any,
    @Optional() public dialogRef: MatDialogRef<AnnualPlan2EditComponent>,
    public annualPlan2Service: AnnualPlan2Service) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAnnualPlan2 = new AnnualPlan2();
    this.selectedAnnualPlan2 = this.selectedAnnualPlan2Dialog.data || this.selectedAnnualPlan2;

    

    this.annualPlan2Form = this.formBuilder.group({
      
  id : [this.selectedAnnualPlan2.id],
  fiveYearplanNumber : [this.selectedAnnualPlan2.fiveYearplanNumber, [ Validators.required ]],
  projectsNumber : [this.selectedAnnualPlan2.projectsNumber, [ Validators.required ]],
  pLanYear : [this.selectedAnnualPlan2.pLanYear, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.annualPlan2Service.update(this.annualPlan2Form.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.annualPlan2Service.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.annualPlan2Form.get(name);
  }

  initializeLookupServices() {
    
  }
}
