
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { PrintMaintenanceIndexationBuilding } from 'app/shared/models/print-maintenance-indexation-building';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { PrintMaintenanceIndexationBuildingService } from '../shared/print-maintenance-indexation-building.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-print-maintenance-indexation-building-new',
  templateUrl: './print-maintenance-indexation-building-new.component.html',
  styleUrls: ['./print-maintenance-indexation-building-new.component.scss'],
  providers: [
    ]
})

export class PrintMaintenanceIndexationBuildingNewComponent extends AppBaseComponent implements OnInit {
  printMaintenanceIndexationBuildingForm: FormGroup;
  @Input() selectedPrintMaintenanceIndexationBuilding: PrintMaintenanceIndexationBuilding;
  errorMessages: FormControlError[] = [
        
  ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<PrintMaintenanceIndexationBuildingNewComponent>,
    public printMaintenanceIndexationBuildingService: PrintMaintenanceIndexationBuildingService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedPrintMaintenanceIndexationBuilding = new PrintMaintenanceIndexationBuilding();

    

    this.printMaintenanceIndexationBuildingForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedPrintMaintenanceIndexationBuilding.buildingCode, [ Validators.required ]],
  yearPlan : [this.selectedPrintMaintenanceIndexationBuilding.yearPlan, [ Validators.required ]],
  maintenanceType : [this.selectedPrintMaintenanceIndexationBuilding.maintenanceType, [ Validators.required ]],
  printType : [this.selectedPrintMaintenanceIndexationBuilding.printType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.printMaintenanceIndexationBuildingService.create(this.printMaintenanceIndexationBuildingForm.value)
        .pipe(switchMap(x => {
			return this.printMaintenanceIndexationBuildingService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.printMaintenanceIndexationBuildingForm.get(name);
    }

  initializeLookupServices() {
    
  }
 }
