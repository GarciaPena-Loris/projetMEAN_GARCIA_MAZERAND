import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import { HeaderComponent } from './header/header.component';
import {MatButton} from "@angular/material/button";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule, provideHttpClient, withFetch} from '@angular/common/http';
import { HousingComponent } from './housing/housing.component';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import { HousingCardComponent } from './housing-card/housing-card.component';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RentComponent } from './rent/rent.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MapComponent} from "./map/map.component";
import {SelectorComponent} from "./selector/selector.component";
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {GoogleMapsModule} from "@angular/google-maps";
import { AuthCardComponent } from './auth-card/auth-card.component';
import { HousingViewComponent } from './housing-view/housing-view.component';
import {MatGridList, MatGridTile} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    HeaderComponent,
    HousingComponent,
    HousingCardComponent,
    RentComponent,
    SelectorComponent,
    MapComponent,
    AuthCardComponent,
    HousingViewComponent
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatIcon,
    MatInput,
    MatButton,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    FlexLayoutServerModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatTabGroup,
    MatTab,
    MatTabContent,
    ReactiveFormsModule,
    MatGridList,
    MatGridTile
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
