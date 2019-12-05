
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { InternalTrainingPlans } from 'app/shared/models/internal-training-plans';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { InternalTrainingPlansService } from '../shared/internal-training-plans.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-internal-training-plans-view',
  templateUrl: './internal-training-plans-view.component.html',
  styleUrls: ['./internal-training-plans-view.component.scss'],
  providers: []
})

export class InternalTrainingPlansViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInternalTrainingPlans: InternalTrainingPlans;
  internalTrainingPlansForm: FormGroup;

  private branchCodesService: LookupService;

  
administrationOrBranchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInternalTrainingPlansDialog: any,
    @Optional() public dialogRef: MatDialogRef<InternalTrainingPlansViewComponent>,
    public internalTrainingPlansService: InternalTrainingPlansService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInternalTrainingPlans = this.selectedInternalTrainingPlansDialog.data || this.selectedInternalTrainingPlans;

    
	this.administrationOrBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة او الفرع',
	});


    this.internalTrainingPlansForm = this.formBuilder.group({
      
  date : [this.selectedInternalTrainingPlans.date],
  trainingNumber : [this.selectedInternalTrainingPlans.trainingNumber],
  trainingTopic : [this.selectedInternalTrainingPlans.trainingTopic],
  administrationOrBranchCode : [this.selectedInternalTrainingPlans.administrationOrBranchCode]
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
    return this.internalTrainingPlansForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.internalTrainingPlansForm.controls)) {
      this.internalTrainingPlansForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

