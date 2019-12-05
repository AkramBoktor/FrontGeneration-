
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { MinistryUnitData } from 'app/shared/models/ministry-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MinistryUnitDataService } from '../shared/ministry-unit-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-ministry-unit-data-new',
  templateUrl: './ministry-unit-data-new.component.html',
  styleUrls: ['./ministry-unit-data-new.component.scss'],
  providers: [
    ]
})

export class MinistryUnitDataNewComponent extends AppBaseComponent implements OnInit {
  ministryUnitDataForm: FormGroup;
  @Input() selectedMinistryUnitData: MinistryUnitData;
  errorMessages: FormControlError[] = [
        
  ];

  private ministriesService: LookupService;
private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private unitTypesService: LookupService;

  
ministryTypeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
departmentCodeSelectOptions: MaterialSelectOptions;
unitTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('ministryType', { static: true }) MinistryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('departmentCode', { static: true }) DepartmentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitType', { static: true }) UnitTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MinistryUnitDataNewComponent>,
    public ministryUnitDataService: MinistryUnitDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMinistryUnitData = new MinistryUnitData();

    
	this.ministryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.ministriesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوزارة',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.departmentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'القسم',
	});

	this.unitTypeSelectOptions = new MaterialSelectOptions({
	 data: this.unitTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الوحدة',
	});


    this.ministryUnitDataForm = this.formBuilder.group({
     
  id : [0],
  unitCode : [this.selectedMinistryUnitData.unitCode, [ Validators.required ]],
  unitName : [this.selectedMinistryUnitData.unitName, [ Validators.required ]],
  unitAddress : [this.selectedMinistryUnitData.unitAddress, [ Validators.required ]],
  headquarters : [this.selectedMinistryUnitData.headquarters, [ Validators.required ]],
  ministryType : [this.selectedMinistryUnitData.ministryType, [ Validators.required ]],
  branchCode : [this.selectedMinistryUnitData.branchCode, [ Validators.required ]],
  departmentCode : [this.selectedMinistryUnitData.departmentCode, [ Validators.required ]],
  unitType : [this.selectedMinistryUnitData.unitType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.ministryUnitDataService.create(this.ministryUnitDataForm.value)
        .pipe(switchMap(x => {
			return this.ministryUnitDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.ministryUnitDataForm.get(name);
    }

  initializeLookupServices() {
    this.ministriesService = new LookupService('ministries', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.unitTypesService = new LookupService('unittypes', this.http);
  }
 }
