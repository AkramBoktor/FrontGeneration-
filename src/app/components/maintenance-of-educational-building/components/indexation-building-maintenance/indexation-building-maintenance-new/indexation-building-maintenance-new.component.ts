
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { IndexationBuildingMaintenance } from 'app/shared/models/indexation-building-maintenance';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { IndexationBuildingMaintenanceService } from '../shared/indexation-building-maintenance.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-indexation-building-maintenance-new',
  templateUrl: './indexation-building-maintenance-new.component.html',
  styleUrls: ['./indexation-building-maintenance-new.component.scss'],
  providers: [
    ]
})

export class IndexationBuildingMaintenanceNewComponent extends AppBaseComponent implements OnInit {
  indexationBuildingMaintenanceForm: FormGroup;
  @Input() selectedIndexationBuildingMaintenance: IndexationBuildingMaintenance;
  errorMessages: FormControlError[] = [
        
  ];

  private maintenanceTypesService: LookupService;

  
maintenanceTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('maintenanceType', { static: true }) MaintenanceTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<IndexationBuildingMaintenanceNewComponent>,
    public indexationBuildingMaintenanceService: IndexationBuildingMaintenanceService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedIndexationBuildingMaintenance = new IndexationBuildingMaintenance();

    
	this.maintenanceTypeSelectOptions = new MaterialSelectOptions({
	 data: this.maintenanceTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع الصيانه',
	});


    this.indexationBuildingMaintenanceForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedIndexationBuildingMaintenance.buildingCode, [ Validators.required ]],
  yearPlan : [this.selectedIndexationBuildingMaintenance.yearPlan, [ Validators.required ]],
  yearPricing : [this.selectedIndexationBuildingMaintenance.yearPricing, [ Validators.required ]],
  employmentType : [this.selectedIndexationBuildingMaintenance.employmentType, [ Validators.required ]],
  extensionCode : [this.selectedIndexationBuildingMaintenance.extensionCode, [ Validators.required ]],
  floorNumber : [this.selectedIndexationBuildingMaintenance.floorNumber, [ Validators.required ]],
  spaceCode : [this.selectedIndexationBuildingMaintenance.spaceCode, [ Validators.required ]],
  itemCode : [this.selectedIndexationBuildingMaintenance.itemCode, [ Validators.required ]],
  itemName : [this.selectedIndexationBuildingMaintenance.itemName, [ Validators.required ]],
  quantity : [this.selectedIndexationBuildingMaintenance.quantity, [ Validators.required ]],
  price : [this.selectedIndexationBuildingMaintenance.price, [ Validators.required ]],
  maintenanceType : [this.selectedIndexationBuildingMaintenance.maintenanceType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.indexationBuildingMaintenanceService.create(this.indexationBuildingMaintenanceForm.value)
        .pipe(switchMap(x => {
			return this.indexationBuildingMaintenanceService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.indexationBuildingMaintenanceForm.get(name);
    }

  initializeLookupServices() {
    this.maintenanceTypesService = new LookupService('maintenancetypes', this.http);
  }
 }
