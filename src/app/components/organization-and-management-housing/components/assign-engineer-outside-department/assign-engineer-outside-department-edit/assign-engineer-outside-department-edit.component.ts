
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AssignEngineerOutsideDepartment } from 'app/shared/models/assign-engineer-outside-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { AssignEngineerOutsideDepartmentService } from '../shared/assign-engineer-outside-department.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assign-engineer-outside-department-edit',
  templateUrl: './assign-engineer-outside-department-edit.component.html',
  styleUrls: ['./assign-engineer-outside-department-edit.component.scss'],
  providers: []
})

export class AssignEngineerOutsideDepartmentEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssignEngineerOutsideDepartment: AssignEngineerOutsideDepartment;
  assignEngineerOutsideDepartmentForm: FormGroup;
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
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssignEngineerOutsideDepartmentDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssignEngineerOutsideDepartmentEditComponent>,
    public assignEngineerOutsideDepartmentService: AssignEngineerOutsideDepartmentService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssignEngineerOutsideDepartment = new AssignEngineerOutsideDepartment();
    this.selectedAssignEngineerOutsideDepartment = this.selectedAssignEngineerOutsideDepartmentDialog.data || this.selectedAssignEngineerOutsideDepartment;

    
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


    this.assignEngineerOutsideDepartmentForm = this.formBuilder.group({
      
  id : [this.selectedAssignEngineerOutsideDepartment.id],
  executiveEngineerNumber : [this.selectedAssignEngineerOutsideDepartment.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedAssignEngineerOutsideDepartment.schoolNumber, [ Validators.required ]],
  atthchEnginnerNumber : [this.selectedAssignEngineerOutsideDepartment.atthchEnginnerNumber, [ Validators.required ]],
  yearPlan : [this.selectedAssignEngineerOutsideDepartment.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedAssignEngineerOutsideDepartment.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedAssignEngineerOutsideDepartment.supervisionBeginningDate, [ Validators.required ]],
  branchCode : [this.selectedAssignEngineerOutsideDepartment.branchCode, [ Validators.required ]],
  constructionType : [this.selectedAssignEngineerOutsideDepartment.constructionType, [ Validators.required ]],
  offeringType : [this.selectedAssignEngineerOutsideDepartment.offeringType, [ Validators.required ]],
  type : [this.selectedAssignEngineerOutsideDepartment.type, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.assignEngineerOutsideDepartmentService.update(this.assignEngineerOutsideDepartmentForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.assignEngineerOutsideDepartmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.assignEngineerOutsideDepartmentForm.get(name);
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
this.gendersService = new LookupService('genders', this.http);
  }
}
