
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { GasAppliancesData } from 'app/shared/models/gas-appliances-data';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { GasAppliancesDataService } from '../shared/gas-appliances-data.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-gas-appliances-data-new',
  templateUrl: './gas-appliances-data-new.component.html',
  styleUrls: ['./gas-appliances-data-new.component.scss'],
  providers: [
    ]
})

export class GasAppliancesDataNewComponent extends AppBaseComponent implements OnInit {
  gasAppliancesDataForm: FormGroup;
  @Input() selectedGasAppliancesData: GasAppliancesData;
  errorMessages: FormControlError[] = [
        
  ];

  private yesOrNosService: LookupService;
private deviceQualitiesService: LookupService;

  
isThereGasInSchoolSelectOptions: MaterialSelectOptions;
deviceQualitySelectOptions: MaterialSelectOptions;

  
	@ViewChild('isThereGasInSchool', { static: true }) IsThereGasInSchoolSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceQuality', { static: true }) DeviceQualitySelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<GasAppliancesDataNewComponent>,
    public gasAppliancesDataService: GasAppliancesDataService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedGasAppliancesData = new GasAppliancesData();

    
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
     
  id : [0],
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
    this.gasAppliancesDataService.create(this.gasAppliancesDataForm.value)
        .pipe(switchMap(x => {
			return this.gasAppliancesDataService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.gasAppliancesDataForm.get(name);
    }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.deviceQualitiesService = new LookupService('devicequalities', this.http);
  }
 }
