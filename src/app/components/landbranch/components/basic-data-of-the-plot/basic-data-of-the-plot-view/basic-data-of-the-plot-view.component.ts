
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { BasicDataOfThePlot } from 'app/shared/models/basic-data-of-the-plot';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { BasicDataOfThePlotService } from '../shared/basic-data-of-the-plot.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-basic-data-of-the-plot-view',
  templateUrl: './basic-data-of-the-plot-view.component.html',
  styleUrls: ['./basic-data-of-the-plot-view.component.scss'],
  providers: []
})

export class BasicDataOfThePlotViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedBasicDataOfThePlot: BasicDataOfThePlot;
  basicDataOfThePlotForm: FormGroup;

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private landOwnershipsService: LookupService;

  
centerDepartmentSelectOptions: MaterialSelectOptions;
villageNeighborhoodSelectOptions: MaterialSelectOptions;
followVillageSelectOptions: MaterialSelectOptions;
landOwnerSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedBasicDataOfThePlotDialog: any,
    @Optional() public dialogRef: MatDialogRef<BasicDataOfThePlotViewComponent>,
    public basicDataOfThePlotService: BasicDataOfThePlotService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataOfThePlot = this.selectedBasicDataOfThePlotDialog.data || this.selectedBasicDataOfThePlot;

    
	this.centerDepartmentSelectOptions = new MaterialSelectOptions({
	 data: this.sectionsOrCentersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'المركز/القسم',
	});

	this.villageNeighborhoodSelectOptions = new MaterialSelectOptions({
	 data: this.villagesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'قرية/حي',
	});

	this.followVillageSelectOptions = new MaterialSelectOptions({
	 data: this.followersService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'تابع قرية شياخة',
	});

	this.landOwnerSelectOptions = new MaterialSelectOptions({
	 data: this.landOwnershipsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'مالك الارض',
	});


    this.basicDataOfThePlotForm = this.formBuilder.group({
      
  pieceNumber : [this.selectedBasicDataOfThePlot.pieceNumber],
  landName : [this.selectedBasicDataOfThePlot.landName],
  totalArea : [this.selectedBasicDataOfThePlot.totalArea],
  centerDepartment : [this.selectedBasicDataOfThePlot.centerDepartment],
  villageNeighborhood : [this.selectedBasicDataOfThePlot.villageNeighborhood],
  followVillage : [this.selectedBasicDataOfThePlot.followVillage],
  landOwner : [this.selectedBasicDataOfThePlot.landOwner]
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
    return this.basicDataOfThePlotForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.basicDataOfThePlotForm.controls)) {
      this.basicDataOfThePlotForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
  }
}

