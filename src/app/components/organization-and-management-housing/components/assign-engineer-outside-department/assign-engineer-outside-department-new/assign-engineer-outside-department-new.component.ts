
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssignEngineerOutsideDepartment } from 'app/shared/models/assign-engineer-outside-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssignEngineerOutsideDepartmentService } from '../shared/assign-engineer-outside-department.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assign-engineer-outside-department-new',
  templateUrl: './assign-engineer-outside-department-new.component.html',
  styleUrls: ['./assign-engineer-outside-department-new.component.scss'],
  providers: [
    ]
})

export class AssignEngineerOutsideDepartmentNewComponent extends AppBaseComponent implements OnInit {
  assignEngineerOutsideDepartmentForm: FormGroup;
  @Input() selectedAssignEngineerOutsideDepartment: AssignEngineerOutsideDepartment;
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
    @Optional() public dialogRef: MatDialogRef<AssignEngineerOutsideDepartmentNewComponent>,
    public assignEngineerOutsideDepartmentService: AssignEngineerOutsideDepartmentService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignEngineerOutsideDepartment = new AssignEngineerOutsideDepartment();

    
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


    this.assignEngineerOutsideDepartmentForm = this.formBuilder.group({
     
  id : [0],
  executiveEngineerNumber : [this.selectedAssignEngineerOutsideDepartment.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedAssignEngineerOutsideDepartment.schoolNumber, [ Validators.required ]],
  atthchEnginnerNumber : [this.selectedAssignEngineerOutsideDepartment.atthchEnginnerNumber, [ Validators.required ]],
  yearPlan : [this.selectedAssignEngineerOutsideDepartment.yearPlan, [ ]],
  bidNumber : [this.selectedAssignEngineerOutsideDepartment.bidNumber, [ ]],
  supervisionBeginningDate : [this.selectedAssignEngineerOutsideDepartment.supervisionBeginningDate, [ Validators.required ]],
  branchCode : [this.selectedAssignEngineerOutsideDepartment.branchCode, [ Validators.required ]],
  constructionType : [this.selectedAssignEngineerOutsideDepartment.constructionType, [ Validators.required ]],
  offeringType : [this.selectedAssignEngineerOutsideDepartment.offeringType, [ ]],
  type : [this.selectedAssignEngineerOutsideDepartment.type, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assignEngineerOutsideDepartmentService.create(this.assignEngineerOutsideDepartmentForm.value)
        .pipe(switchMap(x => {
			return this.assignEngineerOutsideDepartmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assignEngineerOutsideDepartmentForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gendersService = new LookupService('genders', this.http);
  }
 }
