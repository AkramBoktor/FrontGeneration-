
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TerminationOfTheEmployeesJobPlacement } from 'app/shared/models/termination-of-the-employees-job-placement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TerminationOfTheEmployeesJobPlacementService } from '../shared/termination-of-the-employees-job-placement.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-employees-job-placement-edit',
  templateUrl: './termination-of-the-employees-job-placement-edit.component.html',
  styleUrls: ['./termination-of-the-employees-job-placement-edit.component.scss'],
  providers: []
})

export class TerminationOfTheEmployeesJobPlacementEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheEmployeesJobPlacement: TerminationOfTheEmployeesJobPlacement;
  terminationOfTheEmployeesJobPlacementForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheEmployeesJobPlacementDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheEmployeesJobPlacementEditComponent>,
    public terminationOfTheEmployeesJobPlacementService: TerminationOfTheEmployeesJobPlacementService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployeesJobPlacement = new TerminationOfTheEmployeesJobPlacement();
    this.selectedTerminationOfTheEmployeesJobPlacement = this.selectedTerminationOfTheEmployeesJobPlacementDialog.data || this.selectedTerminationOfTheEmployeesJobPlacement;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.departmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});


    this.terminationOfTheEmployeesJobPlacementForm = this.formBuilder.group({
      
  id : [this.selectedTerminationOfTheEmployeesJobPlacement.id],
  employeeCode : [this.selectedTerminationOfTheEmployeesJobPlacement.employeeCode, [ Validators.required ]],
  jobDwellingonthem : [this.selectedTerminationOfTheEmployeesJobPlacement.jobDwellingonthem, [ Validators.required ]],
  analgesiaDate : [this.selectedTerminationOfTheEmployeesJobPlacement.analgesiaDate, [ Validators.required ]],
  endAnalgesiaDate : [this.selectedTerminationOfTheEmployeesJobPlacement.endAnalgesiaDate, [ Validators.required ]],
  branchCode : [this.selectedTerminationOfTheEmployeesJobPlacement.branchCode, [ Validators.required ]],
  department : [this.selectedTerminationOfTheEmployeesJobPlacement.department, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.terminationOfTheEmployeesJobPlacementService.update(this.terminationOfTheEmployeesJobPlacementForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.terminationOfTheEmployeesJobPlacementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.terminationOfTheEmployeesJobPlacementForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}
