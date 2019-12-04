
import { Component,Inject, Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { TimetableDataForThirdParties } from 'app/shared/models/timetable-data-for-third-parties';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';

import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';

import { TimetableDataForThirdPartiesService } from '../shared/timetable-data-for-third-parties.service';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-timetable-data-for-third-parties-edit',
  templateUrl: './timetable-data-for-third-parties-edit.component.html',
  styleUrls: ['./timetable-data-for-third-parties-edit.component.scss'],
  providers: []
})

export class TimetableDataForThirdPartiesEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedTimetableDataForThirdParties: TimetableDataForThirdParties;
  timetableDataForThirdPartiesForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  private constructionTypesService: LookupService;
private listTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
menuTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('menuType', { static: true }) MenuTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedTimetableDataForThirdPartiesDialog: any,
    @Optional() public dialogRef: MatDialogRef<TimetableDataForThirdPartiesEditComponent>,
    public timetableDataForThirdPartiesService: TimetableDataForThirdPartiesService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetableDataForThirdParties = new TimetableDataForThirdParties();
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
      
  id : [this.selectedTimetableDataForThirdParties.id],
  buildingCode : [this.selectedTimetableDataForThirdParties.buildingCode, [ Validators.required ]],
  extensionCode : [this.selectedTimetableDataForThirdParties.extensionCode, [ Validators.required ]],
  planYear : [this.selectedTimetableDataForThirdParties.planYear, [ ]],
  modelCode : [this.selectedTimetableDataForThirdParties.modelCode, [ Validators.required ]],
  pricingYear : [this.selectedTimetableDataForThirdParties.pricingYear, [ Validators.required ]],
  timetable : [this.selectedTimetableDataForThirdParties.timetable, [ Validators.required ]],
  durationofexecution : [this.selectedTimetableDataForThirdParties.durationofexecution, [ ]],
  numberofFloors : [this.selectedTimetableDataForThirdParties.numberofFloors, [ ]],
  constructionType : [this.selectedTimetableDataForThirdParties.constructionType, [ Validators.required ]],
  menuType : [this.selectedTimetableDataForThirdParties.menuType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.timetableDataForThirdPartiesService.update(this.timetableDataForThirdPartiesForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.timetableDataForThirdPartiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.timetableDataForThirdPartiesForm.get(name);
  }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.listTypesService = new LookupService('listtypes', this.http);
  }
}
