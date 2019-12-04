
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TerminationOfTheEmployeesJobPlacement } from 'app/shared/models/termination-of-the-employees-job-placement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheEmployeesJobPlacementService } from '../shared/termination-of-the-employees-job-placement.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-employees-job-placement-new',
  templateUrl: './termination-of-the-employees-job-placement-new.component.html',
  styleUrls: ['./termination-of-the-employees-job-placement-new.component.scss'],
  providers: [
    ]
})

export class TerminationOfTheEmployeesJobPlacementNewComponent extends AppBaseComponent implements OnInit {
  terminationOfTheEmployeesJobPlacementForm: FormGroup;
  @Input() selectedTerminationOfTheEmployeesJobPlacement: TerminationOfTheEmployeesJobPlacement;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private jobTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
departmentSelectOptions: MaterialSelectOptions;
jobDwellingonthemSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('department', { static: true }) DepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('jobDwellingonthem', { static: true }) JobDwellingonthemSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheEmployeesJobPlacementNewComponent>,
    public terminationOfTheEmployeesJobPlacementService: TerminationOfTheEmployeesJobPlacementService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployeesJobPlacement = new TerminationOfTheEmployeesJobPlacement();

    
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
     
  id : [0],
  employeeCode : [this.selectedTerminationOfTheEmployeesJobPlacement.employeeCode, [ Validators.required ]],
  analgesiaDate : [this.selectedTerminationOfTheEmployeesJobPlacement.analgesiaDate, [ ]],
  endAnalgesiaDate : [this.selectedTerminationOfTheEmployeesJobPlacement.endAnalgesiaDate, [ Validators.required ]],
  branchCode : [this.selectedTerminationOfTheEmployeesJobPlacement.branchCode, [ Validators.required ]],
  department : [this.selectedTerminationOfTheEmployeesJobPlacement.department, [ ]],
  jobDwellingonthem : [this.selectedTerminationOfTheEmployeesJobPlacement.jobDwellingonthem, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.terminationOfTheEmployeesJobPlacementService.create(this.terminationOfTheEmployeesJobPlacementForm.value)
        .pipe(switchMap(x => {
			return this.terminationOfTheEmployeesJobPlacementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.terminationOfTheEmployeesJobPlacementForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
