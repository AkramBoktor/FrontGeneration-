
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment } from 'app/shared/models/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService } from '../shared/assign-the-supervision-of-an-engineer-from-outside-the-implementation-department.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view',
  templateUrl: './assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view.component.html',
  styleUrls: ['./assign-the-supervision-of-an-engineer-from-outside-the-implementation-department-view.component.scss'],
  providers: []
})

export class AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment;
  assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm: FormGroup;

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private gendersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentViewComponent>,
    public assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService: AssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment = this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentDialog.data || this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment;

    
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
      
  executiveEngineerNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.executiveEngineerNumber],
  schoolNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.schoolNumber],
  atthchEnginnerNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.atthchEnginnerNumber],
  yearPlan : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.yearPlan],
  bidNumber : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.bidNumber],
  supervisionBeginningDate : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.supervisionBeginningDate],
  branchCode : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.branchCode],
  constructionType : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.constructionType],
  offeringType : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.offeringType],
  type : [this.selectedAssignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartment.type]
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
    return this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.controls)) {
      this.assignTheSupervisionOfAnEngineerFromOutsideTheImplementationDepartmentForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gendersService = new LookupService('genders', this.http);
  }
}

