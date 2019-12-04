
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { ElectricalConnectionsToTheBuilding } from 'app/shared/models/electrical-connections-to-the-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { ElectricalConnectionsToTheBuildingService } from '../shared/electrical-connections-to-the-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-electrical-connections-to-the-building-new',
  templateUrl: './electrical-connections-to-the-building-new.component.html',
  styleUrls: ['./electrical-connections-to-the-building-new.component.scss'],
  providers: [
    ]
})

export class ElectricalConnectionsToTheBuildingNewComponent extends AppBaseComponent implements OnInit {
  electricalConnectionsToTheBuildingForm: FormGroup;
  @Input() selectedElectricalConnectionsToTheBuilding: ElectricalConnectionsToTheBuilding;
  errorMessages: FormControlError[] = [
        
  ];

  private yesOrNosService: LookupService;
private electricalConductivityCodesService: LookupService;

  
powerSourceSelectOptions: MaterialSelectOptions;
electricalConductivityCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('powerSource', { static: true }) PowerSourceSelectComponent: MaterialSelectComponent;
	@ViewChild('electricalConductivityCode', { static: true }) ElectricalConductivityCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<ElectricalConnectionsToTheBuildingNewComponent>,
    public electricalConnectionsToTheBuildingService: ElectricalConnectionsToTheBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedElectricalConnectionsToTheBuilding = new ElectricalConnectionsToTheBuilding();

    
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
     
  id : [0],
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
    this.electricalConnectionsToTheBuildingService.create(this.electricalConnectionsToTheBuildingForm.value)
        .pipe(switchMap(x => {
			return this.electricalConnectionsToTheBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.electricalConnectionsToTheBuildingForm.get(name);
    }

  initializeLookupServices() {
    this.yesOrNosService = new LookupService('yesornos', this.http);
this.electricalConductivityCodesService = new LookupService('electricalconductivitycodes', this.http);
  }
 }
