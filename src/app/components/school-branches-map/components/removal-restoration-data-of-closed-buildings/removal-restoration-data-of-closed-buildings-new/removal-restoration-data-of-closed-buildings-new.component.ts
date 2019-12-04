
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { RemovalRestorationDataOfClosedBuildings } from 'app/shared/models/removal-restoration-data-of-closed-buildings';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { RemovalRestorationDataOfClosedBuildingsService } from '../shared/removal-restoration-data-of-closed-buildings.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-removal-restoration-data-of-closed-buildings-new',
  templateUrl: './removal-restoration-data-of-closed-buildings-new.component.html',
  styleUrls: ['./removal-restoration-data-of-closed-buildings-new.component.scss'],
  providers: [
    ]
})

export class RemovalRestorationDataOfClosedBuildingsNewComponent extends AppBaseComponent implements OnInit {
  removalRestorationDataOfClosedBuildingsForm: FormGroup;
  @Input() selectedRemovalRestorationDataOfClosedBuildings: RemovalRestorationDataOfClosedBuildings;
  errorMessages: FormControlError[] = [
        
  ];

  private usePositionsService: LookupService;
private yesOrNosService: LookupService;

  
usageStatusSelectOptions: MaterialSelectOptions;
extensionClosingStatusSelectOptions: MaterialSelectOptions;

  
	@ViewChild('usageStatus', { static: true }) UsageStatusSelectComponent: MaterialSelectComponent;
	@ViewChild('extensionClosingStatus', { static: true }) ExtensionClosingStatusSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<RemovalRestorationDataOfClosedBuildingsNewComponent>,
    public removalRestorationDataOfClosedBuildingsService: RemovalRestorationDataOfClosedBuildingsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedRemovalRestorationDataOfClosedBuildings = new RemovalRestorationDataOfClosedBuildings();

    
	this.usageStatusSelectOptions = new MaterialSelectOptions({
	 data: this.usePositionsService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف الاستخدام',
	});

	this.extensionClosingStatusSelectOptions = new MaterialSelectOptions({
	 data: this.yesOrNosService.getAll(),
	 errorMessages: this.errorMessages,
	 label: 'موقف اغلاق الملحق',
	});


    this.removalRestorationDataOfClosedBuildingsForm = this.formBuilder.group({
     
  id : [0],
  schoolCode : [this.selectedRemovalRestorationDataOfClosedBuildings.schoolCode, [ Validators.required ]],
  extensionNumber : [this.selectedRemovalRestorationDataOfClosedBuildings.extensionNumber, [ Validators.required ]],
  closingDate : [this.selectedRemovalRestorationDataOfClosedBuildings.closingDate, [ Validators.required ]],
  decisionNumber : [this.selectedRemovalRestorationDataOfClosedBuildings.decisionNumber, [ Validators.required ]],
  decisionDate : [this.selectedRemovalRestorationDataOfClosedBuildings.decisionDate, [ Validators.required ]],
  removalDate : [this.selectedRemovalRestorationDataOfClosedBuildings.removalDate, [ Validators.required ]],
  usageStatus : [this.selectedRemovalRestorationDataOfClosedBuildings.usageStatus, [ Validators.required ]],
  extensionClosingStatus : [this.selectedRemovalRestorationDataOfClosedBuildings.extensionClosingStatus, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.removalRestorationDataOfClosedBuildingsService.create(this.removalRestorationDataOfClosedBuildingsForm.value)
        .pipe(switchMap(x => {
			return this.removalRestorationDataOfClosedBuildingsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.removalRestorationDataOfClosedBuildingsForm.get(name);
    }

  initializeLookupServices() {
    this.usePositionsService = new LookupService('usepositions', this.http);
this.yesOrNosService = new LookupService('yesornos', this.http);
  }
 }
