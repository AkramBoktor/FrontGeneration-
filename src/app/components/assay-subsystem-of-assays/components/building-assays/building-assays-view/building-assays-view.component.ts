
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BuildingAssays } from 'app/shared/models/building-assays';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BuildingAssaysService } from '../shared/building-assays.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-building-assays-view',
  templateUrl: './building-assays-view.component.html',
  styleUrls: ['./building-assays-view.component.scss'],
  providers: []
})

export class BuildingAssaysViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBuildingAssays: BuildingAssays;
  buildingAssaysForm: FormGroup;

  private constructionTypesService: LookupService;
private workTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
workTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBuildingAssaysDialog: any,
    @Optional() public dialogRef: MatDialogRef<BuildingAssaysViewComponent>,
    public buildingAssaysService: BuildingAssaysService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
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
      
  buildingCode : [this.selectedBuildingAssays.buildingCode],
  extensionCode : [this.selectedBuildingAssays.extensionCode],
  modelCode : [this.selectedBuildingAssays.modelCode],
  planYear : [this.selectedBuildingAssays.planYear],
  pricingYear : [this.selectedBuildingAssays.pricingYear],
  itemCode : [this.selectedBuildingAssays.itemCode],
  itemName : [this.selectedBuildingAssays.itemName],
  amount : [this.selectedBuildingAssays.amount],
  price : [this.selectedBuildingAssays.price],
  constructionType : [this.selectedBuildingAssays.constructionType],
  workType : [this.selectedBuildingAssays.workType]
      });

    this.disableControls();
  }

  onConfirm() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getErrorMessage = (formCtrl: AbstractControl) => {
    const errorMessages: FormControlError[] = [
          
        ];
    return ValidatorFunctions.getErrorMessage(formCtrl, errorMessages);
   }

  getControls(name: string) {
    return this.buildingAssaysForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.buildingAssaysForm.controls)) {
      this.buildingAssaysForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.workTypesService = new LookupService('worktypes', this.http);
  }
}

