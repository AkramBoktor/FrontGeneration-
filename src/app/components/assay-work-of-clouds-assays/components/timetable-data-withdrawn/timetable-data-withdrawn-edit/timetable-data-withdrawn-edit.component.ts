
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TimetableDataWithdrawn } from 'app/shared/models/timetable-data-withdrawn';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TimetableDataWithdrawnService } from '../shared/timetable-data-withdrawn.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-timetable-data-withdrawn-edit',
  templateUrl: './timetable-data-withdrawn-edit.component.html',
  styleUrls: ['./timetable-data-withdrawn-edit.component.scss'],
  providers: []
})

export class TimetableDataWithdrawnEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTimetableDataWithdrawn: TimetableDataWithdrawn;
  timetableDataWithdrawnForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private foundationTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
baseTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('baseType', { static: true }) BaseTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTimetableDataWithdrawnDialog: any,
    @Optional() public dialogRef: MatDialogRef<TimetableDataWithdrawnEditComponent>,
    public timetableDataWithdrawnService: TimetableDataWithdrawnService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetableDataWithdrawn = new TimetableDataWithdrawn();
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
      
  id : [this.selectedTimetableDataWithdrawn.id],
  buildingCode : [this.selectedTimetableDataWithdrawn.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedTimetableDataWithdrawn.extensionCode, [ Validators.required ]],
  planYear : [this.selectedTimetableDataWithdrawn.planYear, [ ]],
  modelCode : [this.selectedTimetableDataWithdrawn.modelCode, [ Validators.required ]],
  pricingYear : [this.selectedTimetableDataWithdrawn.pricingYear, [ Validators.required ]],
  scheduleCode : [this.selectedTimetableDataWithdrawn.scheduleCode, [ Validators.required ]],
  executionDuration : [this.selectedTimetableDataWithdrawn.executionDuration, [ ]],
  floorNumber : [this.selectedTimetableDataWithdrawn.floorNumber, [ ]],
  constructionType : [this.selectedTimetableDataWithdrawn.constructionType, [ Validators.required ]],
  baseType : [this.selectedTimetableDataWithdrawn.baseType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.timetableDataWithdrawnService.update(this.timetableDataWithdrawnForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.timetableDataWithdrawnService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.timetableDataWithdrawnForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.foundationTypesService = new LookupService('foundationtypes', this.http);
  }
}
