
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ElectricityWorks } from 'app/shared/models/electricity-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ElectricityWorksService } from '../shared/electricity-works.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-electricity-works-edit',
  templateUrl: './electricity-works-edit.component.html',
  styleUrls: ['./electricity-works-edit.component.scss'],
  providers: []
})

export class ElectricityWorksEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElectricityWorks: ElectricityWorks;
  electricityWorksForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private listTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private modulesService: LookupService;

  
menuTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  
	@ViewChild('menuType', { static: true }) MenuTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('employmentType', { static: true }) EmploymentTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unit', { static: true }) UnitSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElectricityWorksDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElectricityWorksEditComponent>,
    public electricityWorksService: ElectricityWorksService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectricityWorks = new ElectricityWorks();
    this.selectedElectricityWorks = this.selectedElectricityWorksDialog.data || this.selectedElectricityWorks;

    
	this.menuTypeSelectOptions = new MaterialSelectOptions({
	 data: this.listTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع القامه',
	});

	this.employmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل ',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.unitSelectOptions = new MaterialSelectOptions({
	 data: this.modulesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحده',
	});


    this.electricityWorksForm = this.formBuilder.group({
      
  id : [this.selectedElectricityWorks.id],
  activityType : [this.selectedElectricityWorks.activityType, [ Validators.required ]],
  pricingYear : [this.selectedElectricityWorks.pricingYear, [ Validators.required ]],
  itemName : [this.selectedElectricityWorks.itemName, [ Validators.required ]],
  unitPrice : [this.selectedElectricityWorks.unitPrice, [ Validators.required ]],
  menuType : [this.selectedElectricityWorks.menuType, [ Validators.required ]],
  employmentType : [this.selectedElectricityWorks.employmentType, [ Validators.required ]],
  itemCode : [this.selectedElectricityWorks.itemCode, [ Validators.required ]],
  unit : [this.selectedElectricityWorks.unit, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.electricityWorksService.update(this.electricityWorksForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.electricityWorksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.electricityWorksForm.get(name);
  }

  initializeLookupServices() {
    this.listTypesService = new LookupService('listtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}
