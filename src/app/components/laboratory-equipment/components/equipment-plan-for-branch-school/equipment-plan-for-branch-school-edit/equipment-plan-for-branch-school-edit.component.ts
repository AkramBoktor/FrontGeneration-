
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { EquipmentPlanForBranchSchool } from 'app/shared/models/equipment-plan-for-branch-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { EquipmentPlanForBranchSchoolService } from '../shared/equipment-plan-for-branch-school.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-equipment-plan-for-branch-school-edit',
  templateUrl: './equipment-plan-for-branch-school-edit.component.html',
  styleUrls: ['./equipment-plan-for-branch-school-edit.component.scss'],
  providers: []
})

export class EquipmentPlanForBranchSchoolEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEquipmentPlanForBranchSchool: EquipmentPlanForBranchSchool;
  equipmentPlanForBranchSchoolForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private processingTypesService: LookupService;
private planTypesService: LookupService;
private branchCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
planTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  
	@ViewChild('processingType', { static: true }) ProcessingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('planType', { static: true }) PlanTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branch', { static: true }) BranchSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEquipmentPlanForBranchSchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<EquipmentPlanForBranchSchoolEditComponent>,
    public equipmentPlanForBranchSchoolService: EquipmentPlanForBranchSchoolService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEquipmentPlanForBranchSchool = new EquipmentPlanForBranchSchool();
    this.selectedEquipmentPlanForBranchSchool = this.selectedEquipmentPlanForBranchSchoolDialog.data || this.selectedEquipmentPlanForBranchSchool;

    
	this.processingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.processingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع التجهيز',
	});

	this.planTypeSelectOptions = new MaterialSelectOptions({
	 data: this.planTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الخطة',
	});

	this.branchSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الفرع',
	});


    this.equipmentPlanForBranchSchoolForm = this.formBuilder.group({
      
  id : [this.selectedEquipmentPlanForBranchSchool.id],
  equipmentPlanYear : [this.selectedEquipmentPlanForBranchSchool.equipmentPlanYear, [ Validators.required ]],
  schoolNumber : [this.selectedEquipmentPlanForBranchSchool.schoolNumber, [ Validators.required ]],
  extensionNumber : [this.selectedEquipmentPlanForBranchSchool.extensionNumber, [ Validators.required ]],
  processingType : [this.selectedEquipmentPlanForBranchSchool.processingType, [ Validators.required ]],
  planType : [this.selectedEquipmentPlanForBranchSchool.planType, [ Validators.required ]],
  branch : [this.selectedEquipmentPlanForBranchSchool.branch, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.equipmentPlanForBranchSchoolService.update(this.equipmentPlanForBranchSchoolForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.equipmentPlanForBranchSchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.equipmentPlanForBranchSchoolForm.get(name);
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.planTypesService = new LookupService('plantypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}
