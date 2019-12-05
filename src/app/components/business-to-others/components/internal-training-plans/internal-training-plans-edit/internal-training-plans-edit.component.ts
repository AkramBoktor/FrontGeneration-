
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { InternalTrainingPlans } from 'app/shared/models/internal-training-plans';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { InternalTrainingPlansService } from '../shared/internal-training-plans.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-internal-training-plans-edit',
  templateUrl: './internal-training-plans-edit.component.html',
  styleUrls: ['./internal-training-plans-edit.component.scss'],
  providers: []
})

export class InternalTrainingPlansEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedInternalTrainingPlans: InternalTrainingPlans;
  internalTrainingPlansForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;

  
administrationOrBranchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('administrationOrBranchCode', { static: true }) AdministrationOrBranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedInternalTrainingPlansDialog: any,
    @Optional() public dialogRef: MatDialogRef<InternalTrainingPlansEditComponent>,
    public internalTrainingPlansService: InternalTrainingPlansService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedInternalTrainingPlans = new InternalTrainingPlans();
    this.selectedInternalTrainingPlans = this.selectedInternalTrainingPlansDialog.data || this.selectedInternalTrainingPlans;

    
	this.administrationOrBranchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الادارة او الفرع',
	});


    this.internalTrainingPlansForm = this.formBuilder.group({
      
  id : [this.selectedInternalTrainingPlans.id],
  date : [this.selectedInternalTrainingPlans.date, [ Validators.required ]],
  trainingNumber : [this.selectedInternalTrainingPlans.trainingNumber, [ Validators.required ]],
  trainingTopic : [this.selectedInternalTrainingPlans.trainingTopic, [ Validators.required ]],
  administrationOrBranchCode : [this.selectedInternalTrainingPlans.administrationOrBranchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.internalTrainingPlansService.update(this.internalTrainingPlansForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.internalTrainingPlansService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.internalTrainingPlansForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
