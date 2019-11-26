
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BuildingAssays } from 'app/shared/models/building-assays';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BuildingAssaysService } from '../shared/building-assays.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-assays-new',
  templateUrl: './building-assays-new.component.html',
  styleUrls: ['./building-assays-new.component.scss'],
  providers: [
    ]
})

export class BuildingAssaysNewComponent extends AppBaseComponent implements OnInit {
  buildingAssaysForm: FormGroup;
  @Input() selectedBuildingAssays: BuildingAssays;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BuildingAssaysNewComponent>,
    public buildingAssaysService: BuildingAssaysService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingAssays = new BuildingAssays();

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.workTypeSelectOptions = new MaterialSelectOptions({
	 data: this.workTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع العمل',
	});


    this.buildingAssaysForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedBuildingAssays.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedBuildingAssays.extensionCode, [ Validators.required ]],
  modelCode : [this.selectedBuildingAssays.modelCode, [ Validators.required ]],
  planYear : [this.selectedBuildingAssays.planYear, [ ]],
  pricingYear : [this.selectedBuildingAssays.pricingYear, [ ]],
  itemCode : [this.selectedBuildingAssays.itemCode, [ Validators.required ]],
  itemName : [this.selectedBuildingAssays.itemName, [ ]],
  amount : [this.selectedBuildingAssays.amount, [ Validators.required ]],
  price : [this.selectedBuildingAssays.price, [ ]],
  constructionType : [this.selectedBuildingAssays.constructionType, [ ]],
  workType : [this.selectedBuildingAssays.workType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.buildingAssaysService.create(this.buildingAssaysForm.value)
        .pipe(switchMap(x => {
			return this.buildingAssaysService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.buildingAssaysForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
 }
