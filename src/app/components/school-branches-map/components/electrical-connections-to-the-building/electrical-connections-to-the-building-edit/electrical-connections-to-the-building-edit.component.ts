
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { ElectricalConnectionsToTheBuilding } from 'app/shared/models/electrical-connections-to-the-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { ElectricalConnectionsToTheBuildingService } from '../shared/electrical-connections-to-the-building.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-electrical-connections-to-the-building-edit',
  templateUrl: './electrical-connections-to-the-building-edit.component.html',
  styleUrls: ['./electrical-connections-to-the-building-edit.component.scss'],
  providers: []
})

export class ElectricalConnectionsToTheBuildingEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedElectricalConnectionsToTheBuilding: ElectricalConnectionsToTheBuilding;
  electricalConnectionsToTheBuildingForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private yesOrNosService: LookupService;
private electricalConductivityCodesService: LookupService;

  
powerSourceSelectOptions: MaterialSelectOptions;
electricalConductivityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('powerSource', { static: true }) PowerSourceSelectComponent: MaterialSelectComponent;
	@ViewChild('electricalConductivityCode', { static: true }) ElectricalConductivityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedElectricalConnectionsToTheBuildingDialog: any,
    @Optional() public dialogRef: MatDialogRef<ElectricalConnectionsToTheBuildingEditComponent>,
    public electricalConnectionsToTheBuildingService: ElectricalConnectionsToTheBuildingService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectricalConnectionsToTheBuilding = new ElectricalConnectionsToTheBuilding();
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
      
  id : [this.selectedElectricalConnectionsToTheBuilding.id],
  buildingCode : [this.selectedElectricalConnectionsToTheBuilding.buildingCode, [ Validators.required ]],
  guoCounter : [this.selectedElectricalConnectionsToTheBuilding.guoCounter, [ Validators.required ]],
  facetsNumber : [this.selectedElectricalConnectionsToTheBuilding.facetsNumber, [ Validators.required ]],
  specialtransformers : [this.selectedElectricalConnectionsToTheBuilding.specialtransformers, [ Validators.required ]],
  ability : [this.selectedElectricalConnectionsToTheBuilding.ability, [ Validators.required ]],
  number : [this.selectedElectricalConnectionsToTheBuilding.number, [ Validators.required ]],
  feederMainCableStrip : [this.selectedElectricalConnectionsToTheBuilding.feederMainCableStrip, [ Validators.required ]],
  networkClosestSourceFeed : [this.selectedElectricalConnectionsToTheBuilding.networkClosestSourceFeed, [ Validators.required ]],
  powerSource : [this.selectedElectricalConnectionsToTheBuilding.powerSource, [ Validators.required ]],
  electricalConductivityCode : [this.selectedElectricalConnectionsToTheBuilding.electricalConductivityCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.electricalConnectionsToTheBuildingService.update(this.electricalConnectionsToTheBuildingForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.electricalConnectionsToTheBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.electricalConnectionsToTheBuildingForm.get(name);
  }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.electricalConductivityCodesService = new LookupService('electricalconductivitycodes', this.http);
  }
}
