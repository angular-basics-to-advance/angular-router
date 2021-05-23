import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(private serversService: ServersService,
    private route: ActivatedRoute, //ActivatedRoute is the path of the current component which is assigned to route.
    private router: Router) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];     //here '+' convert id value from string to number
    //  coz if we parse a parameter from our URL , it will always be a string because our whole URL is simply just text.

    this.server = this.serversService.getServer(id);
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params['id'])
    }
    );
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
    // this.router.navigate(['/servers', this.server.id, 'edit'], { queryParamsHandling: 'preserve' })

    //relativeTo : if we are already in a child component(server component) and 
    // if we want to navigate to another child component then we dont need to specify the full path('severs/:id/edit')
    // but we can provide the route of the component we want to navigate (if we want to go edit server and we are already in the server component
    // then we just need to navigate to /edit and add the remaining path using the angular provided name 'relativeTo'
    // and assign this to the activated route(this.route))
  }
}
