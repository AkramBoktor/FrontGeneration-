
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TerminationOfTheEmployee'sJobPlacement } from 'app/shared/models/termination-of-the-employee's-job-placement';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TerminationOfTheEmployee'sJobPlacementService } from '../shared/termination-of-the-employee's-job-placement.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-termination-of-the-employee's-job-placement-new',
  templateUrl: './termination-of-the-employee's-job-placement-new.component.html',
  styleUrls: ['./termination-of-the-employee's-job-placement-new.component.scss'],
  providers: [
    ]
})

export class TerminationOfTheEmployee'sJobPlacementNewComponent extends AppBaseComponent implements OnInit {
  terminationOfTheEmployee'sJobPlacementForm: FormGroup;
  @Input() selectedTerminationOfTheEmployee'sJobPlacement: TerminationOfTheEmployee'sJobPlacement;
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
    @Optional() public dialogRef: MatDialogRef<TerminationOfTheEmployee'sJobPlacementNewComponent>,
    public terminationOfTheEmployee'sJobPlacementService: TerminationOfTheEmployee'sJobPlacementService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTerminationOfTheEmployee'sJobPlacement = new TerminationOfTheEmployee'sJobPlacement();

    
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
     
  id : [0],
  employeeCode : [this.selectedTerminationOfTheEmployee'sJobPlacement.employeeCode, [ Validators.required ]],
  analgesiaDate : [this.selectedTerminationOfTheEmployee'sJobPlacement.analgesiaDate, [ ]],
  endAnalgesiaDate : [this.selectedTerminationOfTheEmployee'sJobPlacement.endAnalgesiaDate, [ Validators.required ]],
  branchCode : [this.selectedTerminationOfTheEmployee'sJobPlacement.branchCode, [ Validators.required ]],
  department : [this.selectedTerminationOfTheEmployee'sJobPlacement.department, [ ]],
  jobDwellingonthem : [this.selectedTerminationOfTheEmployee'sJobPlacement.jobDwellingonthem, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.terminationOfTheEmployee'sJobPlacementService.create(this.terminationOfTheEmployee'sJobPlacementForm.value)
        .pipe(switchMap(x => {
			return this.terminationOfTheEmployee'sJobPlacementService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.terminationOfTheEmployee'sJobPlacementForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.jobTypesService = new LookupService('jobtypes', this.http);
  }
 }
