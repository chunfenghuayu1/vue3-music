import{r as e,t,o as a,a as s,b as r,e as l,w as i,T as o,g as n,$ as d,s as m,x as u,q as c,F as p}from"./vendor-7d305bdc.js";const v={class:"relative"},g=["src"],b=["src"],y={key:0,class:"mt-2"},f={class:"font-bold mb-2 lineClamp2"},h={__name:"MvCover",props:{item:{type:Object,required:!0},showTitle:{type:Boolean,default:!0},name:{type:String,default:""},imgUrl:{type:String,required:!0},subText:{type:String,default:""}},setup(h){const x=e(!1);return(e,_)=>{var T;const j=t("router-link");return a(),s(p,null,[r("div",v,[l(j,{to:{name:"mv",params:{vid:h.item.id||h.item.vid}},onMouseenter:_[0]||(_[0]=e=>x.value=!0),onMouseleave:_[1]||(_[1]=e=>x.value=!1)},{default:i((()=>[r("img",{src:`${h.imgUrl.replace(/^http:/,"https://")}?param=285y160`,class:"rounded-lg object-cover"},null,8,g),l(o,{name:"cover",mode:"out-in"},{default:i((()=>[n(r("img",{src:`${h.imgUrl.replace(/^http:/,"https://")}?param=285y160`,class:"absolute top-3 -z-10 object-cover blur-md opacity-60 scale-95",loading:"lazy"},null,8,b),[[d,x.value]])])),_:1})])),_:1},8,["to"])]),h.showTitle?(a(),s("div",y,[r("div",f,[l(j,{to:{name:"mv",params:{vid:h.item.id||h.item.vid}},class:"hover:underline"},{default:i((()=>[m(u(h.name),1)])),_:1},8,["to"])]),l(j,{class:"text-xs text-gray-400 italic hover:underline",to:{name:"artist",params:{id:(null==(T=h.item.artist)?void 0:T.id)||h.item.artists[0].id}}},{default:i((()=>[m(u(h.subText),1)])),_:1},8,["to"])])):c("",!0)],64)}}};export{h as _};
