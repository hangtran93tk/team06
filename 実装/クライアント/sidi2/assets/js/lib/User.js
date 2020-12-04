export default {
    obj: {
        name: '',
        email: '',
        password: '',
        birthday:'',
        sex:'',
        height: '',
        goal_weight:'',       
        active_level:''
    },
    load() {
        const obj = sessionStorage.getItem('user');
        if (obj) {
            this.obj = JSON.parse(obj);
        }
    },
    save() {
        const val = JSON.stringify(this.obj);
        sessionStorage.setItem('user', val);
    }
};
