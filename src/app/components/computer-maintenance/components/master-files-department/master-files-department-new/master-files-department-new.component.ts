
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MasterFilesDepartment } from 'app/shared/models/master-files-department';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MasterFilesDepartmentService } from '../shared/master-files-department.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-master-files-department-new',
  templateUrl: './master-files-department-new.component.html',
  styleUrls: ['./master-files-department-new.component.scss'],
  providers: [
    ]
})

export class MasterFilesDepartmentNewComponent extends AppBaseComponent implements OnInit {
  masterFilesDepartmentForm: FormGroup;
  @Input() selectedMasterFilesDepartment: MasterFilesDepartment;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private areasService: LookupService;
private equipmentCodesService: LookupService;
private deviceTypesService: LookupService;
private warrantyConditionsService: LookupService;

  
branchCodeorAdministrationSelectOptions: MaterialSelectOptions;
areaCodeSelectOptions: MaterialSelectOptions;
equimentTypeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;
warrantyperiodSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCodeorAdministration', { static: true }) BranchCodeorAdministrationSelectComponent: MaterialSelectComponent;
	@ViewChild('areaCode', { static: true }) AreaCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('equimentType', { static: true }) EquimentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('warrantyperiod', { static: true }) WarrantyperiodSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MasterFilesDepartmentNewComponent>,
    public masterFilesDepartmentService: MasterFilesDepartmentService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMasterFilesDepartment = new MasterFilesDepartment();

    
	this.branchCodeorAdministrationSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع او الاداره',
	});

	this.areaCodeSelectOptions = new MaterialSelectOptions({
	 data: this.areasService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المنطقه',
	});

	this.equimentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعده',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});

	this.warrantyperiodSelectOptions = new MaterialSelectOptions({
	 data: this.warrantyConditionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'فتره الضمان',
	});


    this.masterFilesDepartmentForm = this.formBuilder.group({
     
  id : [0],
  roomPhoneNumber : [this.selectedMasterFilesDepartment.roomPhoneNumber, [ Validators.required ]],
  deviceNumber : [this.selectedMasterFilesDepartment.deviceNumber, [ Validators.required ]],
  manufacturer : [this.selectedMasterFilesDepartment.manufacturer, [ Validators.required ]],
  startDate : [this.selectedMasterFilesDepartment.startDate, [ Validators.required ]],
  supplierCompany : [this.selectedMasterFilesDepartment.supplierCompany, [ Validators.required ]],
  branchCodeorAdministration : [this.selectedMasterFilesDepartment.branchCodeorAdministration, [ Validators.required ]],
  areaCode : [this.selectedMasterFilesDepartment.areaCode, [ Validators.required ]],
  equimentType : [this.selectedMasterFilesDepartment.equimentType, [ Validators.required ]],
  deviceType : [this.selectedMasterFilesDepartment.deviceType, [ Validators.required ]],
  warrantyperiod : [this.selectedMasterFilesDepartment.warrantyperiod, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.masterFilesDepartmentService.create(this.masterFilesDepartmentForm.value)
        .pipe(switchMap(x => {
			return this.masterFilesDepartmentService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.masterFilesDepartmentForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.areasService = new LookupService('areas', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.warrantyConditionsService = new LookupService('warrantyconditions', this.http);
  }
 }
