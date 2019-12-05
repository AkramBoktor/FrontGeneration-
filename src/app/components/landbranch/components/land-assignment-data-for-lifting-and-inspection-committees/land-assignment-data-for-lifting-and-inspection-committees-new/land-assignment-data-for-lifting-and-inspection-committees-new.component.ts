
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LandAssignmentDataForLiftingAndInspectionCommittees } from 'app/shared/models/land-assignment-data-for-lifting-and-inspection-committees';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LandAssignmentDataForLiftingAndInspectionCommitteesService } from '../shared/land-assignment-data-for-lifting-and-inspection-committees.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-land-assignment-data-for-lifting-and-inspection-committees-new',
  templateUrl: './land-assignment-data-for-lifting-and-inspection-committees-new.component.html',
  styleUrls: ['./land-assignment-data-for-lifting-and-inspection-committees-new.component.scss'],
  providers: [
    ]
})

export class LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent extends AppBaseComponent implements OnInit {
  landAssignmentDataForLiftingAndInspectionCommitteesForm: FormGroup;
  @Input() selectedLandAssignmentDataForLiftingAndInspectionCommittees: LandAssignmentDataForLiftingAndInspectionCommittees;
  errorMessages: FormControlError[] = [
        
  ];

  private committeeTypeCodesService: LookupService;

  
committeeTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('committeeType', { static: true }) CommitteeTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LandAssignmentDataForLiftingAndInspectionCommitteesNewComponent>,
    public landAssignmentDataForLiftingAndInspectionCommitteesService: LandAssignmentDataForLiftingAndInspectionCommitteesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLandAssignmentDataForLiftingAndInspectionCommittees = new LandAssignmentDataForLiftingAndInspectionCommittees();

    
	this.committeeTypeSelectOptions = new MaterialSelectOptions({
	 data: this.committeeTypeCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع اللجنة',
	});


    this.landAssignmentDataForLiftingAndInspectionCommitteesForm = this.formBuilder.group({
     
  id : [0],
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
    this.landAssignmentDataForLiftingAndInspectionCommitteesService.create(this.landAssignmentDataForLiftingAndInspectionCommitteesForm.value)
        .pipe(switchMap(x => {
			return this.landAssignmentDataForLiftingAndInspectionCommitteesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.landAssignmentDataForLiftingAndInspectionCommitteesForm.get(name);
    }

  initializeLookupServices() {
    this.committeeTypeCodesService = new LookupService('committeetypecodes', this.http);
  }
 }
