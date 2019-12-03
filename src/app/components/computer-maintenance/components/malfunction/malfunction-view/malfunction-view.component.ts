
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { Malfunction } from 'app/shared/models/malfunction';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MalfunctionService } from '../shared/malfunction.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-malfunction-view',
  templateUrl: './malfunction-view.component.html',
  styleUrls: ['./malfunction-view.component.scss'],
  providers: []
})

export class MalfunctionViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedMalfunction: Malfunction;
  malfunctionForm: FormGroup;

  private buildingTypesService: LookupService;
private laboratoryTypesService: LookupService;
private equipmentCodesService: LookupService;
private deviceTypesService: LookupService;
private malfunctionPartsService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
laboratoryTypeSelectOptions: MaterialSelectOptions;
equipmentCodeSelectOptions: MaterialSelectOptions;
deviceTypeSelectOptions: MaterialSelectOptions;
malfunctionPartSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedMalfunctionDialog: any,
    @Optional() public dialogRef: MatDialogRef<MalfunctionViewComponent>,
    public malfunctionService: MalfunctionService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMalfunction = this.selectedMalfunctionDialog.data || this.selectedMalfunction;

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبني',
	});

	this.laboratoryTypeSelectOptions = new MaterialSelectOptions({
	 data: this.laboratoryTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعمل',
	});

	this.equipmentCodeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المعده',
	});

	this.deviceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.deviceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الجهاز',
	});

	this.malfunctionPartSelectOptions = new MaterialSelectOptions({
	 data: this.malfunctionPartsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الجزء العاطل',
	});


    this.malfunctionForm = this.formBuilder.group({
      
  buildingCode : [this.selectedMalfunction.buildingCode],
  laboratoryNumber : [this.selectedMalfunction.laboratoryNumber],
  deviceNumber : [this.selectedMalfunction.deviceNumber],
  malfunctionDate : [this.selectedMalfunction.malfunctionDate],
  malfunctionPartNumber : [this.selectedMalfunction.malfunctionPartNumber],
  malfunctionPartSerial : [this.selectedMalfunction.malfunctionPartSerial],
  buildingType : [this.selectedMalfunction.buildingType],
  laboratoryType : [this.selectedMalfunction.laboratoryType],
  equipmentCode : [this.selectedMalfunction.equipmentCode],
  deviceType : [this.selectedMalfunction.deviceType],
  malfunctionPart : [this.selectedMalfunction.malfunctionPart]
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
    return this.malfunctionForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.malfunctionForm.controls)) {
      this.malfunctionForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.malfunctionPartsService = new LookupService('malfunctionparts', this.http);
  }
}

