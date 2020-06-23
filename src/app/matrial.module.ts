import {NgModule} from '@angular/core';
import {MatButtonModule, MatInputModule, MatFormFieldModule,
    MatNativeDateModule,MatDatepickerModule, MatCheckboxModule,
    MatSidenavModule, MatToolbarModule, MatListModule,
    MatTabsModule, MatCardModule, MatSelectModule,
    MatProgressSpinnerModule, MatTableModule, MatSortModule,
    MatPaginatorModule, MatDialogModule, MatRadioModule,
    MatMenuModule, MatDividerModule, MatAutocompleteModule,
    MatExpansionModule, MatSlideToggleModule, MatBadgeModule
,MatSnackBarModule} from '@angular/material';


@NgModule ({
    imports: [MatButtonModule, MatFormFieldModule, MatInputModule,
        MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
        MatSidenavModule, MatToolbarModule, MatListModule, 
        MatTabsModule, MatCardModule, MatSelectModule,
        MatProgressSpinnerModule, MatTableModule, MatSortModule,
        MatPaginatorModule, MatDialogModule, MatRadioModule,
        MatMenuModule, MatDividerModule, MatAutocompleteModule,
        MatExpansionModule, MatSlideToggleModule, MatBadgeModule,MatSnackBarModule ],

    exports: [MatButtonModule, MatFormFieldModule, MatInputModule,
        MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
        MatSidenavModule, MatToolbarModule, MatListModule,
        MatTabsModule, MatCardModule, MatSelectModule,
        MatProgressSpinnerModule, MatTableModule, MatSortModule,
        MatPaginatorModule, MatDialogModule, MatRadioModule,
        MatMenuModule, MatDividerModule, MatAutocompleteModule,
        MatExpansionModule, MatSlideToggleModule, MatBadgeModule, MatSnackBarModule ]
})

export class MaterialModule {}