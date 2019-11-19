
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TerminationOfTheEmployee'sJobPlacement } from 'app/shared/models/termination-of-the-employee's-job-placement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheEmployee'sJobPlacementService } from '../shared/termination-of-the-employee's-job-placement.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-employee's-job-placement-view',
  templateUrl: './termination-of-the-employee's-job-placement-view.component.html',
  styleUrls: ['./termination-of-the-employee's-job-placement-view.component.scss'],
  providers: []
})

export class TerminationOfTheEmployee'sJobPlacementViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheEmployee'sJobPlacement: TerminationOfTheEmployee'sJobPlacement;
  terminationOfTheEmployee'sJobPlacementForm: FormGroup;

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
jobDwellingonthemSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheEmployee'sJobPlacementDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheEmployee'sJobPlacementViewComponent>,
    public terminationOfTheEmployee'sJobPlacementService: TerminationOfTheEmployee'sJobPlacementService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployee'sJobPlacement = this.selectedTerminationOfTheEmployee'sJobPlacementDialog.data || this.selectedTerminationOfTheEmployee'sJobPlacement;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.jobDwellingonthemSelectOptions = new MaterialSelectOptions({
	 data: this.jobTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوظيفه المسكن عليها ',
	});


    this.terminationOfTheEmployee'sJobPlacementForm = this.formBuilder.group({
      
  employeeCode : [this.selectedTerminationOfTheEmployee'sJobPlacement.employeeCode],
  analgesiaDate : [this.selectedTerminationOfTheEmployee'sJobPlacement.analgesiaDate],
  endAnalgesiaDate : [this.selectedTerminationOfTheEmployee'sJobPlacement.endAnalgesiaDate],
  branchCode : [this.selectedTerminationOfTheEmployee'sJobPlacement.branchCode],
  department : [this.selectedTerminationOfTheEmployee'sJobPlacement.department],
  jobDwellingonthem : [this.selectedTerminationOfTheEmployee'sJobPlacement.jobDwellingonthem]
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
    return this.terminationOfTheEmployee'sJobPlacementForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.terminationOfTheEmployee'sJobPlacementForm.controls)) {
      this.terminationOfTheEmployee'sJobPlacementForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

