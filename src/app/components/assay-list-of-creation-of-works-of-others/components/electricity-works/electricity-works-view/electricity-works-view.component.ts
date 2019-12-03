
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ElectricityWorks } from 'app/shared/models/electricity-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ElectricityWorksService } from '../shared/electricity-works.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-electricity-works-view',
  templateUrl: './electricity-works-view.component.html',
  styleUrls: ['./electricity-works-view.component.scss'],
  providers: []
})

export class ElectricityWorksViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElectricityWorks: ElectricityWorks;
  electricityWorksForm: FormGroup;

  private listTypesService: LookupService;
private workTypesService: LookupService;
private itemCodesService: LookupService;
private modulesService: LookupService;

  
menuTypeSelectOptions: MaterialSelectOptions;
employmentTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
unitSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElectricityWorksDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElectricityWorksViewComponent>,
    public electricityWorksService: ElectricityWorksService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  activityType : [this.selectedElectricityWorks.activityType],
  pricingYear : [this.selectedElectricityWorks.pricingYear],
  itemName : [this.selectedElectricityWorks.itemName],
  unitPrice : [this.selectedElectricityWorks.unitPrice],
  menuType : [this.selectedElectricityWorks.menuType],
  employmentType : [this.selectedElectricityWorks.employmentType],
  itemCode : [this.selectedElectricityWorks.itemCode],
  unit : [this.selectedElectricityWorks.unit]
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
    return this.electricityWorksForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.electricityWorksForm.controls)) {
      this.electricityWorksForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.listTypesService = new LookupService('listtypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.modulesService = new LookupService('modules', this.http);
  }
}

