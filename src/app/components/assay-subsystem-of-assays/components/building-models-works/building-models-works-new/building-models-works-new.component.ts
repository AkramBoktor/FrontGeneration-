
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BuildingModelsWorks } from 'app/shared/models/building-models-works';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingModelsWorksService } from '../shared/building-models-works.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-models-works-new',
  templateUrl: './building-models-works-new.component.html',
  styleUrls: ['./building-models-works-new.component.scss'],
  providers: [
    ]
})

export class BuildingModelsWorksNewComponent extends AppBaseComponent implements OnInit {
  buildingModelsWorksForm: FormGroup;
  @Input() selectedBuildingModelsWorks: BuildingModelsWorks;
  errorMessages: FormControlError[] = [
        
  ];

  private workTypesService: LookupService;
private itemCodesService: LookupService;
private measurementUnitsService: LookupService;

  
workTypeSelectOptions: MaterialSelectOptions;
itemCodeSelectOptions: MaterialSelectOptions;
unitCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('itemCode', { static: true }) ItemCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('unitCode', { static: true }) UnitCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BuildingModelsWorksNewComponent>,
    public buildingModelsWorksService: BuildingModelsWorksService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingModelsWorks = new BuildingModelsWorks();

    
	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});

	this.itemCodeSelectOptions = new MaterialSelectOptions({
	 data: this.itemCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود البند',
	});

	this.unitCodeSelectOptions = new MaterialSelectOptions({
	 data: this.measurementUnitsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'الوحدة',
	});


    this.buildingModelsWorksForm = this.formBuilder.group({
     
  id : [0],
  modelCode : [this.selectedBuildingModelsWorks.modelCode, [ Validators.required ]],
  activityType : [this.selectedBuildingModelsWorks.activityType, [ Validators.required ]],
  itemName : [this.selectedBuildingModelsWorks.itemName, [ ]],
  amount : [this.selectedBuildingModelsWorks.amount, [ Validators.required ]],
  workType : [this.selectedBuildingModelsWorks.workType, [ Validators.required ]],
  itemCode : [this.selectedBuildingModelsWorks.itemCode, [ Validators.required ]],
  unitCode : [this.selectedBuildingModelsWorks.unitCode, [ ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.buildingModelsWorksService.create(this.buildingModelsWorksForm.value)
        .pipe(switchMap(x => {
			return this.buildingModelsWorksService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.buildingModelsWorksForm.get(name);
    }

  initializeLookupServices() {
    this.workTypesService = new LookupService('worktypes', this.http);
this.itemCodesService = new LookupService('itemcodes', this.http);
this.measurementUnitsService = new LookupService('measurementunits', this.http);
  }
 }
