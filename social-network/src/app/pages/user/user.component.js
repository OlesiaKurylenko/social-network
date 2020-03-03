import { SNComponent } from "@socialNetwork";

class UserComponent extends SNComponent {
    constructor(config) {
        super(config);
    }
}
export const userComponent = new UserComponent({
    selector: "app-root",
    template: `
   
    <main class="container">
    <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow row">
      <app-tabs></app-tabs>
     </div>
    </main>
    <div class="row">
  <div class="col-4"> <app-user-info></app-user-info></div>
  <div class="col-5"></div>
</div>
    <router-outlet></router-outlet>
   `,
    styles: `
    .bg-purple {
    background-color: var(--purple);
    }
   
`
});
