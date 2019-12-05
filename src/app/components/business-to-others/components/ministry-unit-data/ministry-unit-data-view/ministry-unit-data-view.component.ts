
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { MinistryUnitData } from 'app/shared/models/ministry-unit-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MinistryUnitDataService } from '../shared/ministry-unit-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-ministry-unit-data-view',
  templateUrl: './ministry-unit-data-view.component.html',
  styleUrls: ['./ministry-unit-data-view.component.scss'],
  providers: []
})

export class MinistryUnitDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMinistryUnitData: MinistryUnitData;
  ministryUnitDataForm: FormGroup;

  private ministriesService: LookupService;
private branchCodesService: LookupService;
private sectionsOrCentersService: LookupService;
private unitTypesService: LookupService;

  
ministryTypeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
departmentCodeSelectOptions: MaterialSelectOptions;
unitTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMinistryUnitDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<MinistryUnitDataViewComponent>,
    public ministryUnitDataService: MinistryUnitDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMinistryUnitData = this.selectedMinistryUnitDataDialog.data || this.selectedMinistryUnitData;

    
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
      
  unitCode : [this.selectedMinistryUnitData.unitCode],
  unitName : [this.selectedMinistryUnitData.unitName],
  unitAddress : [this.selectedMinistryUnitData.unitAddress],
  headquarters : [this.selectedMinistryUnitData.headquarters],
  ministryType : [this.selectedMinistryUnitData.ministryType],
  branchCode : [this.selectedMinistryUnitData.branchCode],
  departmentCode : [this.selectedMinistryUnitData.departmentCode],
  unitType : [this.selectedMinistryUnitData.unitType]
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
    return this.ministryUnitDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.ministryUnitDataForm.controls)) {
      this.ministryUnitDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.ministriesService = new LookupService('ministries', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.unitTypesService = new LookupService('unittypes', this.http);
  }
}

