
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineer } from 'app/shared/models/assigning-maintenance-electricity-project-to-electrical-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerService } from '../shared/assigning-maintenance-electricity-project-to-electrical-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-assigning-maintenance-electricity-project-to-electrical-engineer-view',
  templateUrl: './assigning-maintenance-electricity-project-to-electrical-engineer-view.component.html',
  styleUrls: ['./assigning-maintenance-electricity-project-to-electrical-engineer-view.component.scss'],
  providers: []
})

export class AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedAssigningMaintenanceElectricityProjectToElectricalEngineer: AssigningMaintenanceElectricityProjectToElectricalEngineer;
  assigningMaintenanceElectricityProjectToElectricalEngineerForm: FormGroup;

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedAssigningMaintenanceElectricityProjectToElectricalEngineerDialog: any,
    @Optional() public dialogRef: MatDialogRef<AssigningMaintenanceElectricityProjectToElectricalEngineerViewComponent>,
    public assigningMaintenanceElectricityProjectToElectricalEngineerService: AssigningMaintenanceElectricityProjectToElectricalEngineerService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer = this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineerDialog.data || this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer;

    
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


    this.assigningMaintenanceElectricityProjectToElectricalEngineerForm = this.formBuilder.group({
      
  executiveEngineerNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.executiveEngineerNumber],
  schoolNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.schoolNumber],
  attachEngineerNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.attachEngineerNumber],
  yearPlan : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.yearPlan],
  bidNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.bidNumber],
  supervisionBeginningDate : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.supervisionBeginningDate],
  type : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.type],
  branchCode : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.branchCode],
  constructionType : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.constructionType],
  offeringType : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.offeringType]
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
    return this.assigningMaintenanceElectricityProjectToElectricalEngineerForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.assigningMaintenanceElectricityProjectToElectricalEngineerForm.controls)) {
      this.assigningMaintenanceElectricityProjectToElectricalEngineerForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
}

