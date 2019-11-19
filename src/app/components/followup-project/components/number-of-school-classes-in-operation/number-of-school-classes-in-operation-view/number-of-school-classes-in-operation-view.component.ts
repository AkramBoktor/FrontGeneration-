
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { NumberOfSchoolClassesInOperation } from 'app/shared/models/number-of-school-classes-in-operation';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { NumberOfSchoolClassesInOperationService } from '../shared/number-of-school-classes-in-operation.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-number-of-school-classes-in-operation-view',
  templateUrl: './number-of-school-classes-in-operation-view.component.html',
  styleUrls: ['./number-of-school-classes-in-operation-view.component.scss'],
  providers: []
})

export class NumberOfSchoolClassesInOperationViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedNumberOfSchoolClassesInOperation: NumberOfSchoolClassesInOperation;
  numberOfSchoolClassesInOperationForm: FormGroup;

  private branchCodesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedNumberOfSchoolClassesInOperationDialog: any,
    @Optional() public dialogRef: MatDialogRef<NumberOfSchoolClassesInOperationViewComponent>,
    public numberOfSchoolClassesInOperationService: NumberOfSchoolClassesInOperationService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedNumberOfSchoolClassesInOperation = this.selectedNumberOfSchoolClassesInOperationDialog.data || this.selectedNumberOfSchoolClassesInOperation;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.numberOfSchoolClassesInOperationForm = this.formBuilder.group({
      
  projectCode : [this.selectedNumberOfSchoolClassesInOperation.projectCode],
  classesNumber : [this.selectedNumberOfSchoolClassesInOperation.classesNumber],
  branchCode : [this.selectedNumberOfSchoolClassesInOperation.branchCode]
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
    return this.numberOfSchoolClassesInOperationForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.numberOfSchoolClassesInOperationForm.controls)) {
      this.numberOfSchoolClassesInOperationForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

