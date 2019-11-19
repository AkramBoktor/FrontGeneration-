
import { Component, Inject, Injector, Input, OnInit, Optional } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AppBaseComponent } from 'app/shared/base/app-base.component';
import { FormControlError } from 'app/shared/models/controls/interfaces';
import { FeedingHour } from 'app/shared/models/feeding-hour';
import { switchMap } from 'rxjs/operators';
import { FeedingHourService } from '../shared/feeding-hour.service';




@Component({
  selector: 'app-feeding-hour-edit',
  templateUrl: './feeding-hour-edit.component.html',
  styleUrls: ['./feeding-hour-edit.component.scss'],
  providers: []
})

export class FeedingHourEditComponent extends AppBaseComponent implements OnInit {

  @Input() selectedFeedingHour: FeedingHour;
  feedingHourForm: FormGroup;
  errorMessages: FormControlError[] = [
          
      ];

  

  

  

  

  constructor(injector: Injector,
    @Optional() @Inject(MAT_DIALOG_DATA) public selectedFeedingHourDialog: any,
    @Optional() public dialogRef: MatDialogRef<FeedingHourEditComponent>,
    public feedingHourService: FeedingHourService) {
    super(injector);
    }

  ngOnInit() {
    this.initializeLookupServices();
    this.selectedFeedingHour = new FeedingHour();
    this.selectedFeedingHour = this.selectedFeedingHourDialog.data || this.selectedFeedingHour;

    

    this.feedingHourForm = this.formBuilder.group({
      
  id : [this.selectedFeedingHour.id],
  employeeCode : [this.selectedFeedingHour.employeeCode, [ Validators.required ]]
   }, {
	  validators: [ ]
      });

    

  }

  onSubmit() {
    this.feedingHourService.update(this.feedingHourForm.value, this.getControls('id').value)
    .pipe(switchMap(x => {
	    return this.feedingHourService.postAttachments(x.id, this.attachmentForm.get('attachmentFiles').value);
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
    return this.feedingHourForm.get(name);
  }

  initializeLookupServices() {
    
  }
}
