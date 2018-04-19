import { Component, OnInit, ViewEncapsulation, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SearchService } from '../services/search.service';
import { ProfileService } from '../services/profile.service';

//import _ from "lodash";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  navigationOpen: boolean = false;
  searchResults:any[] = [];
  searchInputValue:string;

  constructor(
    @Inject(DOCUMENT) private document: any, 
    private searchService:SearchService,
    private profileService:ProfileService
  ) { }

  ngOnInit() {
    console.log("init navigation Component");
  }

  searchInput(value){
    this.searchService.processSearch(value).subscribe(data => {
        this.searchResults = data["hits"]["hits"];
        console.log(this.searchResults);
    });
  }

  toggleMenu(){
    this.navigationOpen = !this.navigationOpen;
    this.document.body.setAttribute("nav-open",this.navigationOpen);
  }

  isLoggedIn(){
    return this.profileService.isLoggedIn();
  }

  getUserName(){
    let username:string = this.profileService.getUsername()
    username = username.charAt(0).toUpperCase() + username.slice(1);
    return username;
  }
}
