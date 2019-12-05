
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { LandAssignmentDataForLiftingAndInspectionCommittees } from 'app/shared/models/land-assignment-data-for-lifting-and-inspection-committees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { LandAssignmentDataForLiftingAndInspectionCommitteesService } from '../shared/land-assignment-data-for-lifting-and-inspection-committees.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-land-assignment-data-for-lifting-and-inspection-committees-view',
  templateUrl: './land-assignment-data-for-lifting-and-inspection-committees-view.component.html',
  styleUrls: ['./land-assignment-data-for-lifting-and-inspection-committees-view.component.scss'],
  providers: []
})

export class LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLandAssignmentDataForLiftingAndInspectionCommittees: LandAssignmentDataForLiftingAndInspectionCommittees;
  landAssignmentDataForLiftingAndInspectionCommitteesForm: FormGroup;

  private committeeTypeCodesService: LookupService;

  
committeeTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLandAssignmentDataForLiftingAndInspectionCommitteesDialog: any,
    @Optional() public dialogRef: MatDialogRef<LandAssignmentDataForLiftingAndInspectionCommitteesViewComponent>,
    public landAssignmentDataForLiftingAndInspectionCommitteesService: LandAssignmentDataForLiftingAndInspectionCommitteesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAssignmentDataForLiftingAndInspectionCommittees = this.selectedLandAssignmentDataForLiftingAndInspectionCommitteesDialog.data || this.selectedLandAssignmentDataForLiftingAndInspectionCommittees;

    
	this.committeeTypeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنة',
	});


    this.landAssignmentDataForLiftingAndInspectionCommitteesForm = this.formBuilder.group({
      
  formationDate : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.formationDate],
  committeeNumber : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.committeeNumber],
  landNumber : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.landNumber],
  landName : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.landName],
  referenceDate : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.referenceDate],
  committeeType : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.committeeType]
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
    return this.landAssignmentDataForLiftingAndInspectionCommitteesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.landAssignmentDataForLiftingAndInspectionCommitteesForm.controls)) {
      this.landAssignmentDataForLiftingAndInspectionCommitteesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
}

