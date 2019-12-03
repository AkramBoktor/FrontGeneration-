
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Malfunction } from 'app/shared/models/malfunction';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { MalfunctionService } from '../shared/malfunction.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-malfunction-new',
  templateUrl: './malfunction-new.component.html',
  styleUrls: ['./malfunction-new.component.scss'],
  providers: [
    ]
})

export class MalfunctionNewComponent extends AppBaseComponent implements OnInit {
  malfunctionForm: FormGroup;
  @Input() selectedMalfunction: Malfunction;
  errorMessages: FormControlError[] = [
        
  ];

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

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('laboratoryType', { static: true }) LaboratoryTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentCode', { static: true }) EquipmentCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('deviceType', { static: true }) DeviceTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('malfunctionPart', { static: true }) MalfunctionPartSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<MalfunctionNewComponent>,
    public malfunctionService: MalfunctionService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedMalfunction = new Malfunction();

    
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
     
  id : [0],
  buildingCode : [this.selectedMalfunction.buildingCode, [ Validators.required ]],
  laboratoryNumber : [this.selectedMalfunction.laboratoryNumber, [ Validators.required ]],
  deviceNumber : [this.selectedMalfunction.deviceNumber, [ Validators.required ]],
  malfunctionDate : [this.selectedMalfunction.malfunctionDate, [ Validators.required ]],
  malfunctionPartNumber : [this.selectedMalfunction.malfunctionPartNumber, [ Validators.required ]],
  malfunctionPartSerial : [this.selectedMalfunction.malfunctionPartSerial, [ Validators.required ]],
  buildingType : [this.selectedMalfunction.buildingType, [ Validators.required ]],
  laboratoryType : [this.selectedMalfunction.laboratoryType, [ Validators.required ]],
  equipmentCode : [this.selectedMalfunction.equipmentCode, [ Validators.required ]],
  deviceType : [this.selectedMalfunction.deviceType, [ Validators.required ]],
  malfunctionPart : [this.selectedMalfunction.malfunctionPart, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.malfunctionService.create(this.malfunctionForm.value)
        .pipe(switchMap(x => {
			return this.malfunctionService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.malfunctionForm.get(name);
    }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.laboratoryTypesService = new LookupService('laboratorytypes', this.http);
this.equipmentCodesService = new LookupService('equipmentcodes', this.http);
this.deviceTypesService = new LookupService('devicetypes', this.http);
this.malfunctionPartsService = new LookupService('malfunctionparts', this.http);
  }
 }
