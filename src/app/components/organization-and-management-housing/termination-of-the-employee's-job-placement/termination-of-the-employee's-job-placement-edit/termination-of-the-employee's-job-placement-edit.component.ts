
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TerminationOfTheEmployee'sJobPlacement } from 'app/shared/models/termination-of-the-employee's-job-placement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TerminationOfTheEmployee'sJobPlacementService } from '../shared/termination-of-the-employee's-job-placement.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-employee's-job-placement-edit',
  templateUrl: './termination-of-the-employee's-job-placement-edit.component.html',
  styleUrls: ['./termination-of-the-employee's-job-placement-edit.component.scss'],
  providers: []
})

export class TerminationOfTheEmployee'sJobPlacementEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTerminationOfTheEmployee'sJobPlacement: TerminationOfTheEmployee'sJobPlacement;
  terminationOfTheEmployee'sJobPlacementForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTerminationOfTheEmployee'sJobPlacementDialog: any,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheEmployee'sJobPlacementEditComponent>,
    public terminationOfTheEmployee'sJobPlacementService: TerminationOfTheEmployee'sJobPlacementService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployee'sJobPlacement = new TerminationOfTheEmployee'sJobPlacement();
    this.selectedTerminationOfTheEmployee'sJobPlacement = this.selectedTerminationOfTheEmployee'sJobPlacementDialog.data || this.selectedTerminationOfTheEmployee'sJobPlacement;

    
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


    this.terminationOfTheEmployee'sJobPlacementForm = this.formBuilder.group({
      
  id : [this.selectedTerminationOfTheEmployee'sJobPlacement.id],
  employeeCode : [this.selectedTerminationOfTheEmployee'sJobPlacement.employeeCode, [ Validators.required ]],
  jobDwellingonthem : [this.selectedTerminationOfTheEmployee'sJobPlacement.jobDwellingonthem, [ Validators.required ]],
  analgesiaDate : [this.selectedTerminationOfTheEmployee'sJobPlacement.analgesiaDate, [ Validators.required ]],
  endAnalgesiaDate : [this.selectedTerminationOfTheEmployee'sJobPlacement.endAnalgesiaDate, [ Validators.required ]],
  branchCode : [this.selectedTerminationOfTheEmployee'sJobPlacement.branchCode, [ Validators.required ]],
  department : [this.selectedTerminationOfTheEmployee'sJobPlacement.department, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.terminationOfTheEmployee'sJobPlacementService.update(this.terminationOfTheEmployee'sJobPlacementForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.terminationOfTheEmployee'sJobPlacementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.terminationOfTheEmployee'sJobPlacementForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
  }
}
