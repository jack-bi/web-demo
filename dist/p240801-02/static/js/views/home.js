webpackJsonp([2],{"26dS":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e("mzkE"),a=e("0cpf"),r=(i.a,{components:{xFooter:i.a},data:function(){return{path:a.default.Util.getUploadHost()+"/image-promo",current:null,items:[{img:"menu_il.png",img_h:"menu_il_h.png",id:"il",path:"il"},{img:"menu_usdt.png",img_h:"menu_usdt_h.png",id:"usdt",href:"//bg88-usdt.com"},{img:"menu_cl.png",img_h:"menu_cl_h.png",id:"cl",path:"cl"},{img:"menu_al.png",img_h:"menu_al_h.png",id:"al",path:"al"}]}},created:function(){},methods:{redirect:function(t){t.path?this.$router.push({name:"layout",params:{id:t.path}}):window.open(t.href)}},mounted:function(){}}),s={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("img",{staticClass:"bg",attrs:{src:t.path+"/p/index/homepage_bg.jpg"}}),t._v(" "),e("div",{staticClass:"main index"},[e("header",[e("a",{attrs:{href:"https://www.bg77.com",target:"_blank"}},[e("img",{staticClass:"logo",attrs:{src:t.path+"/logo.png"}})])]),t._v(" "),e("div",{staticClass:"box"},t._l(t.items,function(n,i){return e("div",{key:i,class:["item"]},[e("div",{class:["item-box","item-"+n.id],on:{click:function(e){return t.redirect(n)},mouseenter:function(n){t.current=i},mouseout:function(n){t.current=null}}})])}),0),t._v(" "),e("x-footer",{attrs:{path:t.path}})],1)])},staticRenderFns:[]};var o=e("VU/8")(r,s,!1,function(t){e("phIg")},null,null).exports,u=(i.a,{components:{xFooter:i.a},data:function(){return{path:a.default.Util.getUploadHost()+"/image-promo",current:null,items:[{img:"menu_04.png",id:"il",path:"il"}]}},created:function(){},methods:{redirect:function(t){t.path?this.$router.push({name:"layout-m",params:{id:t.path}}):window.open(t.href)}},mounted:function(){}}),c={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("img",{staticClass:"bg",attrs:{src:t.path+"/m/index_bg.jpg"}}),t._v(" "),e("div",{staticClass:"main index"},[e("header",[e("img",{staticClass:"logo",attrs:{href:"https://www.bg77.com",target:"_blank",src:t.path+"/logo.png"}}),t._v(" "),e("div",{staticClass:"enter"},[e("img",{attrs:{src:t.path+"/back_m_btn.png"}})])]),t._v(" "),e("div",{staticClass:"box"},t._l(t.items,function(n,i){return e("div",{key:i,class:["item",n.id],on:{click:function(e){return t.redirect(n)},mouseenter:function(n){t.current=i},mouseout:function(n){t.current=null}}},[e("img",{attrs:{src:t.path+"/m/"+n.img}})])}),0),t._v(" "),e("x-footer",{attrs:{path:t.path}})],1)])},staticRenderFns:[]};var l=e("VU/8")(u,c,!1,function(t){e("AFI6")},null,null).exports,m={name:"index",components:{PC:o,H5:l},data:function(){return{skin:a.default.Util.isMobile()?"H5":"PC",show:!0}},computed:{},methods:{},created:function(){},mounted:function(){}},d={render:function(){var t=this.$createElement,n=this._self._c||t;return this.skin?n(this.skin,{tag:"component"}):this._e()},staticRenderFns:[]},p=e("VU/8")(m,d,!1,null,null,null);n.default=p.exports},AFI6:function(t,n){},phIg:function(t,n){}});