
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment } from 'app/shared/models/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService } from '../shared/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit',
  templateUrl: './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit.component.html',
  styleUrls: ['./assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-edit.component.scss'],
  providers: []
})

export class AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment;
  assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentEditComponent>,
    public assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment = new AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment();
    this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment = this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentDialog.data || this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment;

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
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
      
  id : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.id],
  executiveEngineerNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.schoolNumber, [ Validators.required ]],
  atthchEnginnerNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.atthchEnginnerNumber, [ Validators.required ]],
  yearPlan : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.supervisionBeginningDate, [ Validators.required ]],
  branchCode : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.branchCode, [ Validators.required ]],
  constructionType : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.constructionType, [ Validators.required ]],
  offeringType : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.offeringType, [ Validators.required ]],
  type : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.type, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService.update(this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gendersService = new LookupService('genders', this.http);
  }
}
