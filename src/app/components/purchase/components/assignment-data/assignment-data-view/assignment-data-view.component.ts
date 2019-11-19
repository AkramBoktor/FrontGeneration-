
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssignmentData } from 'app/shared/models/assignment-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssignmentDataService } from '../shared/assignment-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assignment-data-view',
  templateUrl: './assignment-data-view.component.html',
  styleUrls: ['./assignment-data-view.component.scss'],
  providers: []
})

export class AssignmentDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssignmentData: AssignmentData;
  assignmentDataForm: FormGroup;

  private offeringTypesService: LookupService;

  
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssignmentDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssignmentDataViewComponent>,
    public assignmentDataService: AssignmentDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignmentData = this.selectedAssignmentDataDialog.data || this.selectedAssignmentData;

    
	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.assignmentDataForm = this.formBuilder.group({
      
  bidNumber : [this.selectedAssignmentData.bidNumber],
  technicalReport : [this.selectedAssignmentData.technicalReport],
  offeringType : [this.selectedAssignmentData.offeringType]
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
    return this.assignmentDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assignmentDataForm.controls)) {
      this.assignmentDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

