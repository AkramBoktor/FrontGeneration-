
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { BasicDataOfThePlot } from 'app/shared/models/basic-data-of-the-plot';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { BasicDataOfThePlotService } from '../shared/basic-data-of-the-plot.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-basic-data-of-the-plot-new',
  templateUrl: './basic-data-of-the-plot-new.component.html',
  styleUrls: ['./basic-data-of-the-plot-new.component.scss'],
  providers: [
    ]
})

export class BasicDataOfThePlotNewComponent extends AppBaseComponent implements OnInit {
  basicDataOfThePlotForm: FormGroup;
  @Input() selectedBasicDataOfThePlot: BasicDataOfThePlot;
  errorMessages: FormControlError[] = [
        
  ];

  private sectionsOrCentersService: LookupService;
private villagesService: LookupService;
private followersService: LookupService;
private landOwnershipsService: LookupService;

  
centerDepartmentSelectOptions: MaterialSelectOptions;
villageNeighborhoodSelectOptions: MaterialSelectOptions;
followVillageSelectOptions: MaterialSelectOptions;
landOwnerSelectOptions: MaterialSelectOptions;

  
	@ViewChild('centerDepartment', { static: true }) CenterDepartmentSelectComponent: MaterialSelectComponent;
	@ViewChild('villageNeighborhood', { static: true }) VillageNeighborhoodSelectComponent: MaterialSelectComponent;
	@ViewChild('followVillage', { static: true }) FollowVillageSelectComponent: MaterialSelectComponent;
	@ViewChild('landOwner', { static: true }) LandOwnerSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<BasicDataOfThePlotNewComponent>,
    public basicDataOfThePlotService: BasicDataOfThePlotService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedBasicDataOfThePlot = new BasicDataOfThePlot();

    
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
     
  id : [0],
  pieceNumber : [this.selectedBasicDataOfThePlot.pieceNumber, [ Validators.required ]],
  landName : [this.selectedBasicDataOfThePlot.landName, [ Validators.required ]],
  totalArea : [this.selectedBasicDataOfThePlot.totalArea, [ Validators.required ]],
  centerDepartment : [this.selectedBasicDataOfThePlot.centerDepartment, [ Validators.required ]],
  villageNeighborhood : [this.selectedBasicDataOfThePlot.villageNeighborhood, [ Validators.required ]],
  followVillage : [this.selectedBasicDataOfThePlot.followVillage, [ Validators.required ]],
  landOwner : [this.selectedBasicDataOfThePlot.landOwner, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.basicDataOfThePlotService.create(this.basicDataOfThePlotForm.value)
        .pipe(switchMap(x => {
			return this.basicDataOfThePlotService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.basicDataOfThePlotForm.get(name);
    }

  initializeLookupServices() {
    this.sectionsOrCentersService = new LookupService('sectionsorcenters', this.http);
this.villagesService = new LookupService('villages', this.http);
this.followersService = new LookupService('followers', this.http);
this.landOwnershipsService = new LookupService('landownerships', this.http);
  }
 }
