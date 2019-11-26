
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AssigningMaintenanceElectricityProjectToElectricalEngineer } from 'app/shared/models/assigning-maintenance-electricity-project-to-electrical-engineer';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AssigningMaintenanceElectricityProjectToElectricalEngineerService } from '../shared/assigning-maintenance-electricity-project-to-electrical-engineer.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-assigning-maintenance-electricity-project-to-electrical-engineer-new',
  templateUrl: './assigning-maintenance-electricity-project-to-electrical-engineer-new.component.html',
  styleUrls: ['./assigning-maintenance-electricity-project-to-electrical-engineer-new.component.scss'],
  providers: [
    ]
})

export class AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent extends AppBaseComponent implements OnInit {
  assigningMaintenanceElectricityProjectToElectricalEngineerForm: FormGroup;
  @Input() selectedAssigningMaintenanceElectricityProjectToElectricalEngineer: AssigningMaintenanceElectricityProjectToElectricalEngineer;
  errorMessages: FormControlError[] = [
        
  ];

  private branchCodesService: LookupService;
private constructionTypesService: LookupService;
private offeringTypesService: LookupService;

  
branchCodeSelectOptions: MaterialSelectOptions;
constructionTypeSelectOptions: MaterialSelectOptions;
offeringTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('offeringType', { static: true }) OfferingTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AssigningMaintenanceElectricityProjectToElectricalEngineerNewComponent>,
    public assigningMaintenanceElectricityProjectToElectricalEngineerService: AssigningMaintenanceElectricityProjectToElectricalEngineerService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer = new AssigningMaintenanceElectricityProjectToElectricalEngineer();

    
	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'رقم الفرع',
	});

	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.offeringTypeSelectOptions = new MaterialSelectOptions({
	 data: this.offeringTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الطرح',
	});


    this.assigningMaintenanceElectricityProjectToElectricalEngineerForm = this.formBuilder.group({
     
  id : [0],
  executiveEngineerNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.executiveEngineerNumber, [ Validators.required ]],
  schoolNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.schoolNumber, [ Validators.required ]],
  attachEngineerNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.attachEngineerNumber, [ Validators.required ]],
  yearPlan : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.yearPlan, [ Validators.required ]],
  bidNumber : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.bidNumber, [ Validators.required ]],
  supervisionBeginningDate : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.supervisionBeginningDate, [ Validators.required ]],
  type : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.type, [ Validators.required ]],
  branchCode : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.branchCode, [ Validators.required ]],
  constructionType : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.constructionType, [ Validators.required ]],
  offeringType : [this.selectedAssigningMaintenanceElectricityProjectToElectricalEngineer.offeringType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.assigningMaintenanceElectricityProjectToElectricalEngineerService.create(this.assigningMaintenanceElectricityProjectToElectricalEngineerForm.value)
        .pipe(switchMap(x => {
			return this.assigningMaintenanceElectricityProjectToElectricalEngineerService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.assigningMaintenanceElectricityProjectToElectricalEngineerForm.get(name);
    }

  initializeLookupServices() {
    this.branchCodesService = new LookupService('branchcodes', this.http);
this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.offeringTypesService = new LookupService('offeringtypes', this.http);
  }
 }
