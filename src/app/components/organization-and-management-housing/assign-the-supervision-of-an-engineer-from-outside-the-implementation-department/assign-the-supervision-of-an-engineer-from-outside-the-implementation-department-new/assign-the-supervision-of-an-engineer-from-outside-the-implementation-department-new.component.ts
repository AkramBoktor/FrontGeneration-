
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment } from 'app/shared/models/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService } from '../shared/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new',
  templateUrl: './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new.component.html',
  styleUrls: ['./assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-new.component.scss'],
  providers: [
    ]
})

export class AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent extends AppBaseComponent implements OnInit {
  assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm: FormGroup;
  @Input() selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private gendersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('type', { static: true }) TypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentNewComponent>,
    public assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment = new AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});

	this.typeSelectOptions = new MaterialSelectOptions({
	 data: this.gendersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'النوع',
	});


    this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm = this.formBuilder.group({
     
  id : [0],
  executiveEngineerNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.schoolNumber, [ Validators.required ]],
  atthchEnginnerNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.atthchEnginnerNumber, [ Validators.required ]],
  yearPlan : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.yearPlan, [ ]],
  bidNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.bidNumber, [ ]],
  supervisionBeginningDate : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.supervisionBeginningDate, [ Validators.required ]],
  branchCode : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.branchCode, [ Validators.required ]],
  constructionType : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.constructionType, [ Validators.required ]],
  offeringType : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.offeringType, [ ]],
  type : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.type, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService.create(this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.value)
        .pipe(switchMap(x => {
			return this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gendersService = new LookupService('genders', this.http);
  }
 }
