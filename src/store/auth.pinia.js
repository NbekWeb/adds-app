import {defineStore} from "pinia";
import {api} from "@/utils/api/index.js";
import useCore from "@/store/core.pinia.js";


const useAuth = defineStore('auth',{
    state: ()=>({
        user: null,
        loadingLogin: false,
        mainState: false,

        list: []
    }),
    actions:{
        setMainState(){
            this.mainState = !this.mainState;
        },

        getList(){
            // API
            this.list = []
        },
        login(){
            this.loadingLogin =true;
            api({
                url: 'auth'
            })
                .then(({data})=>{
                useCore().setToast({
                    message:`Zo'r`,
                    type: 'success'
                })
                useCore().redirect('/dashboard/board');
            })
                .catch((err)=>useCore().switchStatus(err))
                .finally(()=>{
                this.loadingLogin =false;
            })
        }
    }
})
export default useAuth;