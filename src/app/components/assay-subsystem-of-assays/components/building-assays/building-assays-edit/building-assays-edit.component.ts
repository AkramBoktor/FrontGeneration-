
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { BuildingAssays } from 'app/shared/models/building-assays';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { BuildingAssaysService } from '../shared/building-assays.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-building-assays-edit',
  templateUrl: './building-assays-edit.component.html',
  styleUrls: ['./building-assays-edit.component.scss'],
  providers: []
})

export class BuildingAssaysEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingAssays: BuildingAssays;
  buildingAssaysForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('workType', { static: true }) WorkTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingAssaysDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingAssaysEditComponent>,
    public buildingAssaysService: BuildingAssaysService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBuildingAssays = new BuildingAssays();
    this.selectedBuildingAssays = this.selectedBuildingAssaysDialog.data || this.selectedBuildingAssays;

    
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
      
  id : [this.selectedBuildingAssays.id],
  buildingCode : [this.selectedBuildingAssays.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedBuildingAssays.extensionCode, [ Validators.required ]],
  modelCode : [this.selectedBuildingAssays.modelCode, [ ]],
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
    this.buildingAssaysService.update(this.buildingAssaysForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.buildingAssaysService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.buildingAssaysForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}
