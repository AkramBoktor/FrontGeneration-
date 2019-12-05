
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { EquipmentPlanForBranchSchool } from 'app/shared/models/equipment-plan-for-branch-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { EquipmentPlanForBranchSchoolService } from '../shared/equipment-plan-for-branch-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-equipment-plan-for-branch-school-view',
  templateUrl: './equipment-plan-for-branch-school-view.component.html',
  styleUrls: ['./equipment-plan-for-branch-school-view.component.scss'],
  providers: []
})

export class EquipmentPlanForBranchSchoolViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedEquipmentPlanForBranchSchool: EquipmentPlanForBranchSchool;
  equipmentPlanForBranchSchoolForm: FormGroup;

  private processingTypesService: LookupService;
private planTypesService: LookupService;
private branchCodesService: LookupService;

  
processingTypeSelectOptions: MaterialSelectOptions;
planTypeSelectOptions: MaterialSelectOptions;
branchSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedEquipmentPlanForBranchSchoolDialog: any,
    @Optional() public dialogRef: MatDialogRef<EquipmentPlanForBranchSchoolViewComponent>,
    public equipmentPlanForBranchSchoolService: EquipmentPlanForBranchSchoolService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  equipmentPlanYear : [this.selectedEquipmentPlanForBranchSchool.equipmentPlanYear],
  schoolNumber : [this.selectedEquipmentPlanForBranchSchool.schoolNumber],
  extensionNumber : [this.selectedEquipmentPlanForBranchSchool.extensionNumber],
  processingType : [this.selectedEquipmentPlanForBranchSchool.processingType],
  planType : [this.selectedEquipmentPlanForBranchSchool.planType],
  branch : [this.selectedEquipmentPlanForBranchSchool.branch]
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
    return this.equipmentPlanForBranchSchoolForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.equipmentPlanForBranchSchoolForm.controls)) {
      this.equipmentPlanForBranchSchoolForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.processingTypesService = new LookupService('processingtypes', this.http);
this.planTypesService = new LookupService('plantypes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
}

