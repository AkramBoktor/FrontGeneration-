
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { EquipmentPlanForBranchSchool } from 'app/shared/models/equipment-plan-for-branch-school';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { EquipmentPlanForBranchSchoolService } from '../shared/equipment-plan-for-branch-school.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-equipment-plan-for-branch-school-new',
  templateUrl: './equipment-plan-for-branch-school-new.component.html',
  styleUrls: ['./equipment-plan-for-branch-school-new.component.scss'],
  providers: [
    ]
})

export class EquipmentPlanForBranchSchoolNewComponent extends AppBaseComponent implements OnInit {
  equipmentPlanForBranchSchoolForm: FormGroup;
  @Input() selectedEquipmentPlanForBranchSchool: EquipmentPlanForBranchSchool;
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
    @Optional() public dialogRef: MatDialogRef<EquipmentPlanForBranchSchoolNewComponent>,
    public equipmentPlanForBranchSchoolService: EquipmentPlanForBranchSchoolService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedEquipmentPlanForBranchSchool = new EquipmentPlanForBranchSchool();

    
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
     
  id : [0],
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
    this.equipmentPlanForBranchSchoolService.create(this.equipmentPlanForBranchSchoolForm.value)
        .pipe(switchMap(x => {
			return this.equipmentPlanForBranchSchoolService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
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
