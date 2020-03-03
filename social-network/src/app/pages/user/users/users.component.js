import { SNComponent, router } from "@socialNetwork";
import { http } from "../../../../framework";
import { userService } from "./user.service";

class UsersComponent extends SNComponent {
  constructor(config) {
    super(config);
    this.userList = [];
    this.user = null;
    this.data = { html_templ: '' }
    this.search = {
      first_name: '',
      last_name: ''
    }
  }
  afterInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUsers(this.search.first_name, this.search.last_name);

  }
  renderComponent() {
    let templ = userService.renderComponent(this.userList, this.user);
    this.data.html_templ = templ;
    this.render();

  }

  getUsers(first_name, last_name) {
    http.get('api/users', true, { first_name, last_name, user_id: this.user.id }).then(res => {
      if (res.message === "Success") {
        this.userList = res.data;
        this.renderComponent();
      }

    }).catch(err => {
      this.userList = [];
    })
  }
  events() {
    return {
      'click .input-group-prepend': 'onClickFilter',
      'keyup .form-control': 'onPressEnter',
      'focusout .form-control': 'onLostFocus',
      'click .form-control-btn': 'onClear',
      'click .changed-status': 'onChangeStatus',
    }
  }
  onChangeStatus({ target }) {
    let res = target.id.split('_');

    userService.processFriend(res[0], res[1], res[2]).then(res => {
      console.log('processFriend', res)
      this.getUsers(this.search.first_name, this.search.last_name);
    })
    event.stopPropagation();
    event.preventDefault();
  }
  onClickFilter() {
    let firstName = document.getElementById('first_name')
    let lastname = document.getElementById('last_name')
    if (firstName.value === this.search.first_name && lastname.value === this.search.last_name)
      return;
    this.search.first_name = firstName.value;
    this.search.last_name = lastname.value;
    this.getUsers(firstName.value, lastname.value);
    event.stopPropagation();
    event.preventDefault();
  }
  onPressEnter(event) {
    if (event.keyCode == 13) {
      let firstName = document.getElementById('first_name')
      let lastname = document.getElementById('last_name')
      if (firstName.value === this.search.first_name && lastname.value === this.search.last_name)
        return;
      this.search.first_name = firstName.value;
      this.search.last_name = lastname.value;

      this.getUsers(firstName.value, lastname.value);
    }

    event.stopPropagation();
    event.preventDefault();
  }
  onLostFocus(event) {
    let firstName = document.getElementById('first_name')
    let lastname = document.getElementById('last_name')
    if (firstName.value === this.search.first_name && lastname.value === this.search.last_name)
      return;
    this.search.first_name = firstName.value;
    this.search.last_name = lastname.value;

    this.getUsers(firstName.value, lastname.value);
    event.stopPropagation();
    event.preventDefault();
  }
  onClear() {
    this.search.first_name = '';
    this.search.last_name = '';
    this.getUsers('', '');
    event.stopPropagation();
    event.preventDefault();
  }
}
export const usersComponent = new UsersComponent({
  selector: 'app-users',
  template: `
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="">First and last name
        </span>
      </div>
          <input type="text" class="form-control" id="first_name" >
          <input type="text" class="form-control" id="last_name">
          <button type="button" class="btn btn-secondary form-control-btn">x</button>
      </div>
    
    <div id="setHtml" class="my-3 p-3 bg-white rounded box-shadow setListUsers">
    {{html_templ}}
    </div>
    `

})