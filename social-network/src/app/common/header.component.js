import { SNComponent } from "@socialNetwork";

class HeaderComponent extends SNComponent {
  constructor(config) {
    super(config);
  }
}
export const header = new HeaderComponent({
  selector: "app-header",
  template: ``
});
