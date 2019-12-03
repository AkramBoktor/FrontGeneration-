
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { ElectricalConnectionsToTheBuilding } from 'app/shared/models/electrical-connections-to-the-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { ElectricalConnectionsToTheBuildingService } from '../shared/electrical-connections-to-the-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-electrical-connections-to-the-building-view',
  templateUrl: './electrical-connections-to-the-building-view.component.html',
  styleUrls: ['./electrical-connections-to-the-building-view.component.scss'],
  providers: []
})

export class ElectricalConnectionsToTheBuildingViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElectricalConnectionsToTheBuilding: ElectricalConnectionsToTheBuilding;
  electricalConnectionsToTheBuildingForm: FormGroup;

  private yesOrNosService: LookupService;
private electricalConductivityCodesService: LookupService;

  
powerSourceSelectOptions: MaterialSelectOptions;
electricalConductivityCodeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElectricalConnectionsToTheBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElectricalConnectionsToTheBuildingViewComponent>,
    public electricalConnectionsToTheBuildingService: ElectricalConnectionsToTheBuildingService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectricalConnectionsToTheBuilding = this.selectedElectricalConnectionsToTheBuildingDialog.data || this.selectedElectricalConnectionsToTheBuilding;

    
	this.powerSourceSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مصدر التيار',
	});

	this.electricalConductivityCodeSelectOptions = new MaterialSelectOptions({
	 data: this.electricalConductivityCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود التوصيل الكهربي',
	});


    this.electricalConnectionsToTheBuildingForm = this.formBuilder.group({
      
  buildingCode : [this.selectedElectricalConnectionsToTheBuilding.buildingCode],
  guoCounter : [this.selectedElectricalConnectionsToTheBuilding.guoCounter],
  facetsNumber : [this.selectedElectricalConnectionsToTheBuilding.facetsNumber],
  specialtransformers : [this.selectedElectricalConnectionsToTheBuilding.specialtransformers],
  ability : [this.selectedElectricalConnectionsToTheBuilding.ability],
  number : [this.selectedElectricalConnectionsToTheBuilding.number],
  feederMainCableStrip : [this.selectedElectricalConnectionsToTheBuilding.feederMainCableStrip],
  networkClosestSourceFeed : [this.selectedElectricalConnectionsToTheBuilding.networkClosestSourceFeed],
  powerSource : [this.selectedElectricalConnectionsToTheBuilding.powerSource],
  electricalConductivityCode : [this.selectedElectricalConnectionsToTheBuilding.electricalConductivityCode]
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
    return this.electricalConnectionsToTheBuildingForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.electricalConnectionsToTheBuildingForm.controls)) {
      this.electricalConnectionsToTheBuildingForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.electricalConductivityCodesService = new LookupService('electricalconductivitycodes', this.http);
  }
}

