
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { GasAppliancesData } from 'app/shared/models/gas-appliances-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { GasAppliancesDataService } from '../shared/gas-appliances-data.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-gas-appliances-data-edit',
  templateUrl: './gas-appliances-data-edit.component.html',
  styleUrls: ['./gas-appliances-data-edit.component.scss'],
  providers: []
})

export class GasAppliancesDataEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedGasAppliancesData: GasAppliancesData;
  gasAppliancesDataForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private yesOrNosService: LookupService;
private deviceQualitiesService: LookupService;

  
isThereGasInSchoolSelectOptions: MaterialSelectOptions;
deviceQualitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('isThereGasInSchool', { static: true }) IsThereGasInSchoolSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceQuality', { static: true }) DeviceQualitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedGasAppliancesDataDialog: any,
    @Optional() public dialogRef: MatDialogRef<GasAppliancesDataEditComponent>,
    public gasAppliancesDataService: GasAppliancesDataService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGasAppliancesData = new GasAppliancesData();
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
      
  id : [this.selectedGasAppliancesData.id],
  buildingCode : [this.selectedGasAppliancesData.buildingCode, [ Validators.required ]],
  gasFeedingSourcesNumber : [this.selectedGasAppliancesData.gasFeedingSourcesNumber, [ Validators.required ]],
  extenstion : [this.selectedGasAppliancesData.extenstion, [ Validators.required ]],
  floor : [this.selectedGasAppliancesData.floor, [ Validators.required ]],
  spaceName : [this.selectedGasAppliancesData.spaceName, [ Validators.required ]],
  isThereGasInSchool : [this.selectedGasAppliancesData.isThereGasInSchool, [ Validators.required ]],
  deviceQuality : [this.selectedGasAppliancesData.deviceQuality, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.gasAppliancesDataService.update(this.gasAppliancesDataForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.gasAppliancesDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.gasAppliancesDataForm.get(name);
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.deviceQualitiesService = new LookupService('devicequalities', this.http);
  }
}
