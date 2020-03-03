import { SNComponent, http, snu, router } from "@socialNetwork";


class TabsComponent extends SNComponent {
    constructor(config) {
        super(config);
        this.data = {
            ip: ''
        }
    }
    afterInit() {
        let comp = document.querySelector('.nav-pills');
        let url = router.getUrl().split('/')[1];
        comp.querySelectorAll('.nav-link').forEach(el => {
            el.classList.remove('active');

            if (el.innerText.toLowerCase() === url)
                el.classList.add('active');
        })
    }
    events() {
        return {
            'click .nav': 'onTabClick',
        }
    }
    onTabClick({ target }) {

        if (!target.classList.contains('nav-link')) return;
        if (target.classList.contains('active')) return;

        router.navigate(`#tabs/${target.innerText.toLowerCase()}`);

    }
}

export const tabsComponent = new TabsComponent({
    selector: 'app-tabs',
    template: `
    <ul class="nav nav-pills">
  <li class="nav-item padding-nav-item">
    <a class="nav-link btn btn-bd-download active" >Users</a>
  </li>
  <li class="nav-item padding-nav-item">
    <a class="nav-link btn btn-bd-download " >Friends</a>
  </li>
</ul>
    `,
    styles: `
    .btn-bd-download{
        border: 0px solid transparent;
    padding: .375rem .75rem;
    
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
    color: #ffffff;
    }
    .nav-pills .nav-link.active{
    color: #6f42c0;
    background-color: #ffffff;
    }
    .padding-nav-item{
       padding-right:20px;
    }
    `

})