
import { Component,Input, OnInit, Optional, ViewChild, Injector } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { MaterialSelectOptions } from 'app/shared/models/controls/material-select.model';
import { startWith } from 'rxjs/operators';
import { MaterialSelectComponent } from 'app/shared/components/material-controls/material-select/material-select.component';
import { FundStatistics } from 'app/shared/models/fund-statistics';
import { ValidatorFunctions } from 'app/shared/validations/validator-functions';
import { FundStatisticsService } from '../shared/fund-statistics.service';
import { LookupService } from 'app/shared/pages/lookup-form/lookup.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-fund-statistics-new',
  templateUrl: './fund-statistics-new.component.html',
  styleUrls: ['./fund-statistics-new.component.scss'],
  providers: [
    ]
})

export class FundStatisticsNewComponent extends AppBaseComponent implements OnInit {
  fundStatisticsForm: FormGroup;
  @Input() selectedFundStatistics: FundStatistics;
  errorMessages: FormControlError[] = [
        
  ];

  private collectionTypesService: LookupService;

  
collectionTypeSelectOptions: MaterialSelectOptions;

  
	@ViewChild('collectionType', { static: true }) CollectionTypeSelectComponent: MaterialSelectComponent;

  

  constructor(injector: Injector,
    @Optional() public dialogRef: MatDialogRef<FundStatisticsNewComponent>,
    public fundStatisticsService: FundStatisticsService)
    {
    super(injector);
    }
    
  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFundStatistics = new FundStatistics();

    
	this.collectionTypeSelectOptions = new MaterialSelectOptions({
	 data: this.collectionTypesService.getAll(),
	 errorMessages: this.errorMessages,
	 label: ' نوع التحصيل',
	});


    this.fundStatisticsForm = this.formBuilder.group({
     
  id : [0],
  collectionNumber : [this.selectedFundStatistics.collectionNumber, [ Validators.required ]],
  collectionDate : [this.selectedFundStatistics.collectionDate, [ Validators.required ]],
  employeeCode : [this.selectedFundStatistics.employeeCode, [ Validators.required ]],
  from : [this.selectedFundStatistics.from, [ Validators.required ]],
  to : [this.selectedFundStatistics.to, [ Validators.required ]],
  amount : [this.selectedFundStatistics.amount, [ Validators.required ]],
  collectionType : [this.selectedFundStatistics.collectionType, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

        

  }
  onSubmit() {
    this.fundStatisticsService.create(this.fundStatisticsForm.value)
        .pipe(switchMap(x => {
			return this.fundStatisticsService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
		 }))
        .subscribe(result => {
        this.onBack();
        });
  }

  onBack(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
   }

  getControls(name: string) {
    return this.fundStatisticsForm.get(name);
    }

  initializeLookupServices() {
    this.collectionTypesService = new LookupService('collectiontypes', this.http);
  }
 }
