
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TimetableDataForThirdParties } from 'app/shared/models/timetable-data-for-third-parties';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TimetableDataForThirdPartiesService } from '../shared/timetable-data-for-third-parties.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-timetable-data-for-third-parties-view',
  templateUrl: './timetable-data-for-third-parties-view.component.html',
  styleUrls: ['./timetable-data-for-third-parties-view.component.scss'],
  providers: []
})

export class TimetableDataForThirdPartiesViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTimetableDataForThirdParties: TimetableDataForThirdParties;
  timetableDataForThirdPartiesForm: FormGroup;

  private constructionTypesService: LookupService;
private listTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
menuTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTimetableDataForThirdPartiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<TimetableDataForThirdPartiesViewComponent>,
    public timetableDataForThirdPartiesService: TimetableDataForThirdPartiesService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetableDataForThirdParties = this.selectedTimetableDataForThirdPartiesDialog.data || this.selectedTimetableDataForThirdParties;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الانشاء',
	});

	this.menuTypeSelectOptions = new MaterialSelectOptions({
	 data: this.listTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع القامه',
	});


    this.timetableDataForThirdPartiesForm = this.formBuilder.group({
      
  buildingCode : [this.selectedTimetableDataForThirdParties.buildingCode],
  extensionCode : [this.selectedTimetableDataForThirdParties.extensionCode],
  planYear : [this.selectedTimetableDataForThirdParties.planYear],
  modelCode : [this.selectedTimetableDataForThirdParties.modelCode],
  pricingYear : [this.selectedTimetableDataForThirdParties.pricingYear],
  timetable : [this.selectedTimetableDataForThirdParties.timetable],
  durationofexecution : [this.selectedTimetableDataForThirdParties.durationofexecution],
  numberofFloors : [this.selectedTimetableDataForThirdParties.numberofFloors],
  constructionType : [this.selectedTimetableDataForThirdParties.constructionType],
  menuType : [this.selectedTimetableDataForThirdParties.menuType]
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
    return this.timetableDataForThirdPartiesForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.timetableDataForThirdPartiesForm.controls)) {
      this.timetableDataForThirdPartiesForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.listTypesService = new LookupService('listtypes', this.http);
  }
}

