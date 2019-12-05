
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { LastMaintenanceDate } from 'app/shared/models/last-maintenance-date';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { LastMaintenanceDateService } from '../shared/last-maintenance-date.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-last-maintenance-date-new',
  templateUrl: './last-maintenance-date-new.component.html',
  styleUrls: ['./last-maintenance-date-new.component.scss'],
  providers: [
    ]
})

export class LastMaintenanceDateNewComponent extends AppBaseComponent implements OnInit {
  lastMaintenanceDateForm: FormGroup;
  @Input() selectedLastMaintenanceDate: LastMaintenanceDate;
  errorMessages: FormControlError[] = [
        
  ];

  private buildingTypesService: LookupService;
private equipmentGroupsService: LookupService;
private equipmentTypesService: LookupService;

  
buildingTypeSelectOptions: MaterialSelectOptions;
equipmentGroupSelectOptions: MaterialSelectOptions;
equipmentTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('buildingType', { static: true }) BuildingTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentGroup', { static: true }) EquipmentGroupSelectComponent: MaterialSelectComponent;
	@ViewChild('equipmentType', { static: true }) EquipmentTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<LastMaintenanceDateNewComponent>,
    public lastMaintenanceDateService: LastMaintenanceDateService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedLastMaintenanceDate = new LastMaintenanceDate();

    
	this.buildingTypeSelectOptions = new MaterialSelectOptions({
	 data: this.buildingTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المبنى',
	});

	this.equipmentGroupSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentGroupsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مجموعة المعدات',
	});

	this.equipmentTypeSelectOptions = new MaterialSelectOptions({
	 data: this.equipmentTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع المعدة',
	});


    this.lastMaintenanceDateForm = this.formBuilder.group({
     
  id : [0],
  equipmentNumber : [this.selectedLastMaintenanceDate.equipmentNumber, [ Validators.required ]],
  mainMaintenanceItem : [this.selectedLastMaintenanceDate.mainMaintenanceItem, [ Validators.required ]],
  lastDateMaintenance : [this.selectedLastMaintenanceDate.lastDateMaintenance, [ Validators.required ]],
  buildingType : [this.selectedLastMaintenanceDate.buildingType, [ Validators.required ]],
  equipmentGroup : [this.selectedLastMaintenanceDate.equipmentGroup, [ Validators.required ]],
  equipmentType : [this.selectedLastMaintenanceDate.equipmentType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.lastMaintenanceDateService.create(this.lastMaintenanceDateForm.value)
        .pipe(switchMap(x => {
			return this.lastMaintenanceDateService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.lastMaintenanceDateForm.get(name);
    }

  initializeLookupServices() {
    this.buildingTypesService = new LookupService('buildingtypes', this.http);
this.equipmentGroupsService = new LookupService('equipmentgroups', this.http);
this.equipmentTypesService = new LookupService('equipmenttypes', this.http);
  }
 }
