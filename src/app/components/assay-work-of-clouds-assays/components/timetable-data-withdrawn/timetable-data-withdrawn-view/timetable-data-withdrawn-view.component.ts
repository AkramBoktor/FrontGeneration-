
import { Component, Inject, Input, OnInit, Optional, Injector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { TimetableDataWithdrawn } from 'app/shared/models/timetable-data-withdrawn';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { TimetableDataWithdrawnService } from '../shared/timetable-data-withdrawn.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

@Component({
  selector: 'app-timetable-data-withdrawn-view',
  templateUrl: './timetable-data-withdrawn-view.component.html',
  styleUrls: ['./timetable-data-withdrawn-view.component.scss'],
  providers: []
})

export class TimetableDataWithdrawnViewComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTimetableDataWithdrawn: TimetableDataWithdrawn;
  timetableDataWithdrawnForm: FormGroup;

  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTimetableDataWithdrawnDialog: any,
    @Optional() public dialogRef: MatDialogRef<TimetableDataWithdrawnViewComponent>,
    public timetableDataWithdrawnService: TimetableDataWithdrawnService) {
		super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetableDataWithdrawn = this.selectedTimetableDataWithdrawnDialog.data || this.selectedTimetableDataWithdrawn;

    
	this.constructionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.constructionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الإنشاء',
	});

	this.baseTypeSelectOptions = new MaterialSelectOptions({
	 data: this.foundationTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'نوع الأساسات',
	});


    this.timetableDataWithdrawnForm = this.formBuilder.group({
      
  buildingCode : [this.selectedTimetableDataWithdrawn.buildingCode],
  extensionCode : [this.selectedTimetableDataWithdrawn.extensionCode],
  planYear : [this.selectedTimetableDataWithdrawn.planYear],
  modelCode : [this.selectedTimetableDataWithdrawn.modelCode],
  pricingYear : [this.selectedTimetableDataWithdrawn.pricingYear],
  scheduleCode : [this.selectedTimetableDataWithdrawn.scheduleCode],
  executionDuration : [this.selectedTimetableDataWithdrawn.executionDuration],
  floorNumber : [this.selectedTimetableDataWithdrawn.floorNumber],
  constructionType : [this.selectedTimetableDataWithdrawn.constructionType],
  baseType : [this.selectedTimetableDataWithdrawn.baseType]
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
    return this.timetableDataWithdrawnForm.get(name);
    }


  disableControls() {
    for (const control of Object.keys(this.timetableDataWithdrawnForm.controls)) {
      this.timetableDataWithdrawnForm.controls[control].disable();
    }
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}

