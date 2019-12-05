
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { TheMainRoads } from 'app/shared/models/the-main-roads';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { TheMainRoadsService } from '../shared/the-main-roads.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-the-main-roads-new',
  templateUrl: './the-main-roads-new.component.html',
  styleUrls: ['./the-main-roads-new.component.scss'],
  providers: [
    ]
})

export class TheMainRoadsNewComponent extends AppBaseComponent implements OnInit {
  theMainRoadsForm: FormGroup;
  @Input() selectedTheMainRoads: TheMainRoads;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;
private directionStatusCodesService: LookupService;
private directionCodesService: LookupService;

  
centerCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;
mainRoadStatusCodeSelectOptions: MaterialSelectOptions;
movementDirectionCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerCode', { static: true }) CenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('mainRoadStatusCode', { static: true }) MainRoadStatusCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('movementDirectionCode', { static: true }) MovementDirectionCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<TheMainRoadsNewComponent>,
    public theMainRoadsService: TheMainRoadsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedTheMainRoads = new TheMainRoads();

    
	this.centerCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});

	this.mainRoadStatusCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionStatusCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود حالة الطريق الرئيسي',
	});

	this.movementDirectionCodeSelectOptions = new MaterialSelectOptions({
	 data: this.directionCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود اتجاه الحركة',
	});


    this.theMainRoadsForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedTheMainRoads.buildingCode, [ Validators.required ]],
  mainRoadNumber : [this.selectedTheMainRoads.mainRoadNumber, [ Validators.required ]],
  roadWidth : [this.selectedTheMainRoads.roadWidth, [ Validators.required ]],
  usage : [this.selectedTheMainRoads.usage, [ Validators.required ]],
  theNameOfTheRoad : [this.selectedTheMainRoads.theNameOfTheRoad, [ Validators.required ]],
  centerCode : [this.selectedTheMainRoads.centerCode, [ Validators.required ]],
  branchCode : [this.selectedTheMainRoads.branchCode, [ Validators.required ]],
  mainRoadStatusCode : [this.selectedTheMainRoads.mainRoadStatusCode, [ Validators.required ]],
  movementDirectionCode : [this.selectedTheMainRoads.movementDirectionCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.theMainRoadsService.create(this.theMainRoadsForm.value)
        .pipe(switchMap(x => {
			return this.theMainRoadsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.theMainRoadsForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
this.directionStatusCodesService = new LookupService('directionstatuscodes', this.http);
this.directionCodesService = new LookupService('directioncodes', this.http);
  }
 }
