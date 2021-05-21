import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // the router.snapshot.param changes the id and name for the first time and it will reflect in the
    // URL as well as in the page(view). but if we want any subsequent changes to our component(UserComonent) 
    // the URL gets updated but the View will not change as angular thinks why to reload the same page again
    // on which you are already present. So to update the view we need to inform angular that we need 
    // a future update to this page(userComponnet) by calling params.subscribe()
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };

    // the router.param updates the links in the URL as well as the id and name by using 
    // the help of Observable i.e subscribe()
    // subscribe takes an function as argument and in the parameter part we need to send the parameter
    // of type Params(present in angular/router) and inside params we send the link values we need to update
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

}
