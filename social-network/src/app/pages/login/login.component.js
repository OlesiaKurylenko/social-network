import { SNComponent } from "@socialNetwork";
import { http } from "../../../framework/tools/http";
import { router } from "../../../framework/core/rounting/router";

class LoginComponent extends SNComponent {
    constructor(config) {
        super(config);
        this.data = {
            title: ' test'
        }
    }
    onInit() {
    }
    afterInit() {
    }
    events() {
        return {
            'submit .loginForm': 'onSubmit'
        }
    }
    onSubmit(event) {
        let { target } = event;
        event.stopPropagation();
        event.preventDefault()
        let cildren = target.getElementsByTagName('input');

        let el = document.getElementById('error_login')
        if (el)
            el.innerText = '';

        http.post('login', { login: cildren[0].value, password: cildren[1].value }, false)
            .then(data => {
                if (data.message === "Success") {
                    let { token, user } = data.data;
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                    router.navigate("#tabs/users");
                }
                else {
                    el.innerText = 'Error user or password';
                }

            })
    }
    result(result) {
    }

}
export const loginComponent = new LoginComponent({
    selector: 'app-login',
    template: `
    <div class="my-3 p-3 bg-white rounded box-shadow" >
    <form id="loginForm" class="loginForm">
    <label id="error_login" ></label>
    <div class="form-group row">
        <label for="email_address" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>
        <div class="col-md-6">
            <input id="email" type="email" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" title="Invalid email address" class="form-control" name="email-address" required autofocus>
        </div>
    </div>

    <div class="form-group row">
        <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
        <div class="col-md-6">
            <input type="password" id="password" class="form-control" name="password" required>
        </div>
    </div>

    <div class="col-md-6 offset-md-4">
        <button type="submit" class="btn btn-primary">
            login
        </button>
    </div>
</div>
</form>
</div>
    `,
    styles: `
    #error_login{
        color:red
    }
    .navbar-laravel
    {
        box-shadow: 0 2px 4px rgba(0,0,0,.04);
    }
    
    .navbar-brand , .nav-link, .my-form, .login-form
    {
        font-family: Raleway, sans-serif;
    }
    
    .my-form
    {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }
    
    .my-form .row
    {
        margin-left: 0;
        margin-right: 0;
    }
    
    .login-form
    {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }
    
    .login-form .row
    {
        margin-left: 0;
        margin-right: 0;
    }`

})