
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { GasAppliancesData } from 'app/shared/models/gas-appliances-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { GasAppliancesDataService } from '../shared/gas-appliances-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-gas-appliances-data-view',
  templateUrl: './gas-appliances-data-view.component.html',
  styleUrls: ['./gas-appliances-data-view.component.scss'],
  providers: []
})

export class GasAppliancesDataViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGasAppliancesData: GasAppliancesData;
  gasAppliancesDataForm: FormGroup;

  private yesOrNosService: LookupService;
private deviceQualitiesService: LookupService;

  
isThereGasInSchoolSelectOptions: MaterialSelectOptions;
deviceQualitySelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGasAppliancesDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<GasAppliancesDataViewComponent>,
    public gasAppliancesDataService: GasAppliancesDataService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGasAppliancesData = this.selectedGasAppliancesDataDialog.data || this.selectedGasAppliancesData;

    
	this.isThereGasInSchoolSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'هل يوجد غاز بالمدرسه',
	});

	this.deviceQualitySelectOptions = new MaterialSelectOptions({
	 data: this.deviceQualitiesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوعيه الجهاز',
	});


    this.gasAppliancesDataForm = this.formBuilder.group({
      
  buildingCode : [this.selectedGasAppliancesData.buildingCode],
  gasFeedingSourcesNumber : [this.selectedGasAppliancesData.gasFeedingSourcesNumber],
  extenstion : [this.selectedGasAppliancesData.extenstion],
  floor : [this.selectedGasAppliancesData.floor],
  spaceName : [this.selectedGasAppliancesData.spaceName],
  isThereGasInSchool : [this.selectedGasAppliancesData.isThereGasInSchool],
  deviceQuality : [this.selectedGasAppliancesData.deviceQuality]
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
    return this.gasAppliancesDataForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.gasAppliancesDataForm.controls)) {
      this.gasAppliancesDataForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.deviceQualitiesService = new LookupService('devicequalities', this.http);
  }
}

