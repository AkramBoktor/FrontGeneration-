
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { LandAssignmentDataForLiftingAndInspectionCommittees } from 'app/shared/models/land-assignment-data-for-lifting-and-inspection-committees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { LandAssignmentDataForLiftingAndInspectionCommitteesService } from '../shared/land-assignment-data-for-lifting-and-inspection-committees.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-land-assignment-data-for-lifting-and-inspection-committees-edit',
  templateUrl: './land-assignment-data-for-lifting-and-inspection-committees-edit.component.html',
  styleUrls: ['./land-assignment-data-for-lifting-and-inspection-committees-edit.component.scss'],
  providers: []
})

export class LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedLandAssignmentDataForLiftingAndInspectionCommittees: LandAssignmentDataForLiftingAndInspectionCommittees;
  landAssignmentDataForLiftingAndInspectionCommitteesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private committeeTypeCodesService: LookupService;

  
committeeTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('committeeType', { static: true }) CommitteeTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedLandAssignmentDataForLiftingAndInspectionCommitteesDialog: any,
    @Optional() public dialogRef: MatDialogRef<LandAssignmentDataForLiftingAndInspectionCommitteesEditComponent>,
    public landAssignmentDataForLiftingAndInspectionCommitteesService: LandAssignmentDataForLiftingAndInspectionCommitteesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAssignmentDataForLiftingAndInspectionCommittees = new LandAssignmentDataForLiftingAndInspectionCommittees();
    this.selectedLandAssignmentDataForLiftingAndInspectionCommittees = this.selectedLandAssignmentDataForLiftingAndInspectionCommitteesDialog.data || this.selectedLandAssignmentDataForLiftingAndInspectionCommittees;

    
	this.committeeTypeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنة',
	});


    this.landAssignmentDataForLiftingAndInspectionCommitteesForm = this.formBuilder.group({
      
  id : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.id],
  formationDate : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.formationDate, [ Validators.required ]],
  committeeNumber : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.committeeNumber, [ Validators.required ]],
  landNumber : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.landNumber, [ Validators.required ]],
  landName : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.landName, [ Validators.required ]],
  referenceDate : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.referenceDate, [ Validators.required ]],
  committeeType : [this.selectedLandAssignmentDataForLiftingAndInspectionCommittees.committeeType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.landAssignmentDataForLiftingAndInspectionCommitteesService.update(this.landAssignmentDataForLiftingAndInspectionCommitteesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.landAssignmentDataForLiftingAndInspectionCommitteesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.landAssignmentDataForLiftingAndInspectionCommitteesForm.get(name);
  }

  initializeLookupServices() {
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
}
