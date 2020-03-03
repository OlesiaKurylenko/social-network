import { SNComponent, router } from "@socialNetwork";
import { http } from "../../../../framework";

class UsersComponent extends SNComponent {
  constructor(config) {
    super(config);
    this.userList = [];
    this.user = null;
    this.data = { html_templ: '' }
  }
  afterInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUsers('', '');

  }
  renderComponent() {
    let templ = '';
    this.userList.forEach(el => {

      let textButt = '';
      let typeButt = '';
      let idbutton = '';
      let added = ''
      if (el.request_user_id === null && el.friend_user_id === null) {
        textButt = 'Add friend';
        typeButt = 'primary';
        idbutton = `${el.id}_add-friend_${this.user.id}`;
      }
      if (el.request_user_id === null && (el.friend_user_id === this.user.id || el.friend_friend_id === this.user.id)) {
        textButt = 'Remove friend';
        typeButt = 'secondary';
        idbutton = `${el.id}_remove-friend_${this.user.id}`;
        added = `<span><i>friends</i><span>`
      }
      if (!!el.request_user_id && el.request_user_id !== this.user.id && el.request_friend_id === this.user.id) {
        textButt = 'Ignore';
        typeButt = 'danger';
        idbutton = `${el.id}_ignore-friend_${this.user.id}`;
        added = `<spa><i>request </i></span><button id="${el.id}_accept-friend_${this.user.id}" type="button" class="btn btn-outline-success changed-status">Accept</button>`
      }
      if (!!el.request_user_id && el.request_user_id === this.user.id && el.request_friend_id !== this.user.id) {
        textButt = 'Cancel request';
        typeButt = 'warning';
        idbutton = `${el.id}_cancel-request-friend_${this.user.id}`;
        added = `<span><i>pending request</i><span>`
      }

      templ += this.getTemplate()
        .replace('{{avatar}}', el.avatar)
        .replace('{{firstname}}', el.first_name)
        .replace('{{lastname}}', el.last_name)
        .replace('{{login}}', el.login)
        .replace('{{text}}', textButt)
        .replace('{{buttontype}}', typeButt)
        .replace('{{idbutton}}', idbutton)
        .replace('{{}}', added);

    });
    this.data.html_templ = templ;
    this.render();


  }
  getTemplate() {
    return `<div class="media text-muted pt-3">
          <img src="http://localhost:3000/{{avatar}}" alt="32x32" class="mr-2 rounded" style="width: 64px; height: 64px;">
          <div class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <div class="d-flex justify-content-between align-items-center w-100">
              <strong class="text-gray-dark">{{firstname}} {{lastname}}</strong>
              {{}}
              <button id="{{idbutton}}" type="button" class="btn btn-outline-{{buttontype}} changed-status">{{text}}</button>
            </div>
            <span class="d-block">{{login}}</span>
          </div>
        </div>`;
  }
  getUsers(first_name, last_name) {
    http.get('api/users', true, { first_name, last_name }).then(res => {
      this.userList = res.data;
      this.renderComponent();
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
    console.log(target.id)
    event.stopPropagation();
    event.preventDefault();
  }
  onClickFilter() {
    let firstName = document.getElementById('first_name')
    let lastname = document.getElementById('last_name')
    this.getUsers(firstName.value, lastname.value);
  }
  onPressEnter(event) {
    if (event.keyCode == 13) {
      let firstName = document.getElementById('first_name')
      let lastname = document.getElementById('last_name')
      this.getUsers(firstName.value, lastname.value);
    }

    event.stopPropagation();
    event.preventDefault();
  }
  onLostFocus(event) {
    let firstName = document.getElementById('first_name')
    let lastname = document.getElementById('last_name')
    this.getUsers(firstName.value, lastname.value);
    event.stopPropagation();
    event.preventDefault();
  }
  onClear() {
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
              <a class="text-muted" aria-label="Search">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="mx-3" role="img" viewBox="0 0 24 24" focusable="false"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
              </a>
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