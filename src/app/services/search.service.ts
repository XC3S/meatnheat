import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  // process search request
  processSearch(query:string){

    if(query && query.length > 1){
      query = query + "~1";
    }

    let searchRequestBody = {
      query: {
        query_string: {
          query: query
        }
      }
    };
    
    return this.http.post('https://search-meatnheat-4h2snfosrsqyslactur7whkfiy.eu-central-1.es.amazonaws.com/recipe/profile/_search?pretty=true', searchRequestBody);
  }
}
