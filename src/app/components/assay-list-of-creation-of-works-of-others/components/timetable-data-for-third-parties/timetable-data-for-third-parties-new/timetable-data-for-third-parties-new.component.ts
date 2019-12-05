
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TimetableDataForThirdParties } from 'app/shared/models/timetable-data-for-third-parties';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TimetableDataForThirdPartiesService } from '../shared/timetable-data-for-third-parties.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-timetable-data-for-third-parties-new',
  templateUrl: './timetable-data-for-third-parties-new.component.html',
  styleUrls: ['./timetable-data-for-third-parties-new.component.scss'],
  providers: [
    ]
})

export class TimetableDataForThirdPartiesNewComponent extends AppBaseComponent implements OnInit {
  timetableDataForThirdPartiesForm: FormGroup;
  @Input() selectedTimetableDataForThirdParties: TimetableDataForThirdParties;
  errorMessages: FormControlError[] = [
        
  ];

  private constructionTypesService: LookupService;
private listTypesService: LookupService;

  
constructionTypeSelectOptions: MaterialSelectOptions;
menuTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('constructionType', { static: true }) ConstructionTypeSelectComponent: MaterialSelectComponent;
	@ViewChild('menuType', { static: true }) MenuTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TimetableDataForThirdPartiesNewComponent>,
    public timetableDataForThirdPartiesService: TimetableDataForThirdPartiesService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTimetableDataForThirdParties = new TimetableDataForThirdParties();

    
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
     
  id : [0],
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
    this.timetableDataForThirdPartiesService.create(this.timetableDataForThirdPartiesForm.value)
        .pipe(switchMap(x => {
			return this.timetableDataForThirdPartiesService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.timetableDataForThirdPartiesForm.get(name);
    }

  initializeLookupServices() {
    this.constructionTypesService = new LookupService('constructiontypes', this.http);
this.listTypesService = new LookupService('listtypes', this.http);
  }
 }
