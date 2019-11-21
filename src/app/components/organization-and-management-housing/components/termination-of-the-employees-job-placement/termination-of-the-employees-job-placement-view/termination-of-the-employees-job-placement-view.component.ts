
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TerminationOfTheEmployeesJobPlacement } from 'app/shared/models/termination-of-the-employees-job-placement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TerminationOfTheEmployeesJobPlacementService } from '../shared/termination-of-the-employees-job-placement.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-termination-of-the-employees-job-placement-view',
  templateUrl: './termination-of-the-employees-job-placement-view.component.html',
  styleUrls: ['./termination-of-the-employees-job-placement-view.component.scss'],
  providers: []
})

export class TerminationOfTheEmployeesJobPlacementViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheEmployeesJobPlacement: TerminationOfTheEmployeesJobPlacement;
  terminationOfTheEmployeesJobPlacementForm: FormGroup;

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
jobDwellingonthemSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheEmployeesJobPlacementDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheEmployeesJobPlacementViewComponent>,
    public terminationOfTheEmployeesJobPlacementService: TerminationOfTheEmployeesJobPlacementService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployeesJobPlacement = this.selectedTerminationOfTheEmployeesJobPlacementDialog.data || this.selectedTerminationOfTheEmployeesJobPlacement;

    
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


    this.terminationOfTheEmployeesJobPlacementForm = this.formBuilder.group({
      
  employeeCode : [this.selectedTerminationOfTheEmployeesJobPlacement.employeeCode],
  analgesiaDate : [this.selectedTerminationOfTheEmployeesJobPlacement.analgesiaDate],
  endAnalgesiaDate : [this.selectedTerminationOfTheEmployeesJobPlacement.endAnalgesiaDate],
  branchCode : [this.selectedTerminationOfTheEmployeesJobPlacement.branchCode],
  department : [this.selectedTerminationOfTheEmployeesJobPlacement.department],
  jobDwellingonthem : [this.selectedTerminationOfTheEmployeesJobPlacement.jobDwellingonthem]
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
    return this.terminationOfTheEmployeesJobPlacementForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.terminationOfTheEmployeesJobPlacementForm.controls)) {
      this.terminationOfTheEmployeesJobPlacementForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
}

