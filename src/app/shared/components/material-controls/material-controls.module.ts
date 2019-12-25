import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatPaginatorIntl,
    MatAutocompleteModule,
    MatStepperModule,
    MatProgressBarModule,
    MatDividerModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { MaterialSelectComponent } from './material-select/material-select.component';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { getArabicPaginatorIntl } from './mat-paginator-intl';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonPipesModule } from 'app/shared/pipes/common-pipes.module';
import { MaterialAutocompleteComponent } from './material-autocomplete/material-autocomplete.component';
import { SharedDirectivesModule } from 'app/shared/directives/shared-directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatMomentDateModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDividerModule,

        ScrollingModule,

        CommonPipesModule,
        SharedDirectivesModule
    ],
    declarations: [MaterialSelectComponent, MaterialDialogComponent, MaterialAutocompleteComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatMomentDateModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDividerModule,

        ScrollingModule,

        MaterialSelectComponent,
        MaterialDialogComponent,
        MaterialAutocompleteComponent,
        SharedDirectivesModule
    ],
    providers: [
        { provide: MatPaginatorIntl, useValue: getArabicPaginatorIntl() }
    ]
})

export class MaterialControlsModule {
}
