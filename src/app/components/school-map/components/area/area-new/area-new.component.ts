
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { Area } from 'app/shared/models/area';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { AreaService } from '../shared/area.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-area-new',
  templateUrl: './area-new.component.html',
  styleUrls: ['./area-new.component.scss'],
  providers: [
    ]
})

export class AreaNewComponent extends AppBaseComponent implements OnInit {
  areaForm: FormGroup;
  @Input() selectedArea: Area;
  errorMessages: FormControlError[] = [
        
  ];

  private regionalCenterCodesService: LookupService;
private branchCodesService: LookupService;

  
regionalCenterCodeSelectOptions: MaterialSelectOptions;
branchCodeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('regionalCenterCode', { static: true }) RegionalCenterCodeSelectComponent: MaterialSelectComponent;
	@ViewChild('branchCode', { static: true }) BranchCodeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<AreaNewComponent>,
    public areaService: AreaService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedArea = new Area();

    
	this.regionalCenterCodeSelectOptions = new MaterialSelectOptions({
	 data: this.regionalCenterCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود المركز الاقليمي',
	});

	this.branchCodeSelectOptions = new MaterialSelectOptions({
	 data: this.branchCodesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'كود الفرع',
	});


    this.areaForm = this.formBuilder.group({
     
  id : [0],
  buildingCode : [this.selectedArea.buildingCode, [ Validators.required ]],
  groundFloorArea : [this.selectedArea.groundFloorArea, [ Validators.required ]],
  backyardArea : [this.selectedArea.backyardArea, [ Validators.required ]],
  greenAreas : [this.selectedArea.greenAreas, [ Validators.required ]],
  playgroundArea : [this.selectedArea.playgroundArea, [ Validators.required ]],
  sideWalksArea : [this.selectedArea.sideWalksArea, [ Validators.required ]],
  siteTotalArea : [this.selectedArea.siteTotalArea, [ Validators.required ]],
  regionalCenterCode : [this.selectedArea.regionalCenterCode, [ Validators.required ]],
  branchCode : [this.selectedArea.branchCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.areaService.create(this.areaForm.value)
        .pipe(switchMap(x => {
			return this.areaService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.areaForm.get(name);
    }

  initializeLookupServices() {
    this.regionalCenterCodesService = new LookupService('regionalcentercodes', this.http);
this.branchCodesService = new LookupService('branchcodes', this.http);
  }
 }
