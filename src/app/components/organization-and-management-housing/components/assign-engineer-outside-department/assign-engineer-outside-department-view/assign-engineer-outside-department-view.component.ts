
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssignEngineerOutsideDepartment } from 'app/shared/models/assign-engineer-outside-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssignEngineerOutsideDepartmentService } from '../shared/assign-engineer-outside-department.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assign-engineer-outside-department-view',
  templateUrl: './assign-engineer-outside-department-view.component.html',
  styleUrls: ['./assign-engineer-outside-department-view.component.scss'],
  providers: []
})

export class AssignEngineerOutsideDepartmentViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssignEngineerOutsideDepartment: AssignEngineerOutsideDepartment;
  assignEngineerOutsideDepartmentForm: FormGroup;

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;
private gendersService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;
typeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssignEngineerOutsideDepartmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssignEngineerOutsideDepartmentViewComponent>,
    public assignEngineerOutsideDepartmentService: AssignEngineerOutsideDepartmentService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignEngineerOutsideDepartment = this.selectedAssignEngineerOutsideDepartmentDialog.data || this.selectedAssignEngineerOutsideDepartment;

    
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
      
  executiveEngineerNumber : [this.selectedAssignEngineerOutsideDepartment.executiveEngineerNumber],
  schoolNumber : [this.selectedAssignEngineerOutsideDepartment.schoolNumber],
  atthchEnginnerNumber : [this.selectedAssignEngineerOutsideDepartment.atthchEnginnerNumber],
  yearPlan : [this.selectedAssignEngineerOutsideDepartment.yearPlan],
  bidNumber : [this.selectedAssignEngineerOutsideDepartment.bidNumber],
  supervisionBeginningDate : [this.selectedAssignEngineerOutsideDepartment.supervisionBeginningDate],
  branchCode : [this.selectedAssignEngineerOutsideDepartment.branchCode],
  constructionType : [this.selectedAssignEngineerOutsideDepartment.constructionType],
  offeringType : [this.selectedAssignEngineerOutsideDepartment.offeringType],
  type : [this.selectedAssignEngineerOutsideDepartment.type]
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
    return this.assignEngineerOutsideDepartmentForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assignEngineerOutsideDepartmentForm.controls)) {
      this.assignEngineerOutsideDepartmentForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gendersService = new LookupService('genders', this.http);
  }
}

