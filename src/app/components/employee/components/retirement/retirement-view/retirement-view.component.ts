
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { Retirement } from 'app/shared/models/retirement';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RetirementService } from '../shared/retirement.service';

@Component({
  selector: 'app-retirement-view',
  templateUrl: './retirement-view.component.html',
  styleUrls: ['./retirement-view.component.scss'],
  providers: []
})

export class RetirementViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedRetirement: Retirement;
  retirementForm: FormGroup;

  private leavingServiceReasonsService: LookupService;

  
terminationReasonSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedRetirementDialog: any,
    @Optional() public dialogRef: MatDialogRef<RetirementViewComponent>,
    public retirementService: RetirementService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRetirement = this.selectedRetirementDialog.data || this.selectedRetirement;

    
	this.terminationReasonSelectOptions = new MaterialSelectOptions({
	 data: this.leavingServiceReasonsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'سبب انهاء الخدمه',
	});


    this.retirementForm = this.formBuilder.group({
      
  employeeCode : [this.selectedRetirement.employeeCode],
  decisionCode : [this.selectedRetirement.decisionCode],
  decisionDate : [this.selectedRetirement.decisionDate],
  terminationDate : [this.selectedRetirement.terminationDate],
  terminationReason : [this.selectedRetirement.terminationReason]
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
    return this.retirementForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.retirementForm.controls)) {
      this.retirementForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.leavingServiceReasonsService = new LookupService('leavingservicereasons', this.http);
  }
}

