import{g as M}from"./applyVendor-N7zd6jMs.js";import{C as R}from"./CommonHeader-D5wAUnYL.js";import{o as S,r as i,c as d,a as s,b as t,l as q,t as V,i as W,d as v,w as u,u as j,e as c,m as z}from"./index-DohTaPA9.js";import{_ as A}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./request-C8QZ-v7H.js";const G="/assets/sbxx-yHrahCWD.png",J={class:"scoring-page"},K={class:"header-fixed"},L={class:"content"},Q={class:"information flex flex-center"},X={key:0,class:"info-title"},Y={key:1,class:"info-title"},Z={key:2,class:"number"},ee={class:"notice-section"},se={class:"section-header"},te={class:"value-box"},oe={class:"value-box"},le={key:0,class:"qr-section"},ne={class:"qr-code"},ae={class:"qrImg"},ie=["src"],ue={__name:"index",setup(re){const N=j();S(()=>{U()});const o=i({}),U=()=>{M().then(l=>{o.value=l.data,o.value.qrCodeUrl=`/stg${l.data.qrCodePath}`})},D=()=>{N.push({path:"/applyVendor",query:{toPath:"/personalInfo"}})},C=l=>{const e=[];l==="id"?e.push(`/stg${o.value.idCardFront}`,`/stg${o.value.idCardBack}`):l==="health"&&e.push(`/stg${o.value.healthProve}`),z({images:e,closeable:!0,showIndex:!0})},h=i("生鲜、冷冻食品"),P=i("否"),B=i("否"),r=i(!1),p=i(!1),m=i(!1),O=[{text:"熟食"},{text:"水果"},{text:"蔬菜"},{text:"其他"},{text:"生鲜、冷冻食品"}],x=[{text:"是"},{text:"否"}],H=l=>{h.value=l.selectedOptions[0].text,r.value=!1},T=l=>{P.value=l.selectedOptions[0].text,p.value=!1},E=l=>{B.value=l.selectedOptions[0].text,m.value=!1};return(l,e)=>{var w,k,b,y,I,$;const g=v("van-icon"),a=v("van-cell"),_=v("van-picker"),f=v("van-popup"),F=v("van-cell-group");return c(),d("div",J,[s("div",K,[t(R)]),s("div",L,[s("div",Q,[(k=(w=o.value)==null?void 0:w.stall)!=null&&k.stallCode?(c(),d("div",X," 今日已预约摊位编号 ")):(c(),d("div",Y,"今日尚未预约")),(y=(b=o.value)==null?void 0:b.stall)!=null&&y.stallCode?(c(),d("div",Z,V(($=(I=o.value)==null?void 0:I.stall)==null?void 0:$.stallCode),1)):q("",!0)]),s("div",ee,[s("div",se,[e[10]||(e[10]=s("div",{class:"notice-icon"},[s("img",{src:G,alt:""})],-1)),s("div",{onClick:D,class:"updateInfo"},[t(g,{name:"edit",style:{"margin-right":"0.3rem"}}),e[9]||(e[9]=W("修改信息 "))])]),t(F,{border:!1},{default:u(()=>[t(a,{title:"摊位名称",value:o.value.stallName},null,8,["value"]),t(a,{title:"姓名",value:o.value.userName},null,8,["value"]),t(a,{title:"身份证",class:"idCard"},{value:u(()=>[s("div",te,[s("span",{class:"view-photo",onClick:e[0]||(e[0]=n=>C("id"))},"查看照片"),s("span",null,V(o.value.idNumber),1),t(g,{name:"arrow"})])]),_:1}),t(a,{title:"健康证"},{value:u(()=>[s("div",oe,[s("span",{class:"view-photo",onClick:e[1]||(e[1]=n=>C("health"))},"查看照片")])]),_:1}),t(a,{title:"经营种类",value:h.value,"is-link":"",onClick:e[2]||(e[2]=n=>r.value=!0)},null,8,["value"]),t(a,{title:"是否退伍军人",value:o.value.isVeteran,"is-link":""},null,8,["value"]),t(a,{title:"是否残疾人",value:o.value.isDisabled,"is-link":""},null,8,["value"]),t(f,{show:r.value,"onUpdate:show":e[4]||(e[4]=n=>r.value=n),position:"bottom"},{default:u(()=>[t(_,{columns:O,onConfirm:H,onCancel:e[3]||(e[3]=n=>r.value=!1)})]),_:1},8,["show"]),t(f,{show:p.value,"onUpdate:show":e[6]||(e[6]=n=>p.value=n),position:"bottom"},{default:u(()=>[t(_,{columns:x,onConfirm:T,onCancel:e[5]||(e[5]=n=>p.value=!1)})]),_:1},8,["show"]),t(f,{show:m.value,"onUpdate:show":e[8]||(e[8]=n=>m.value=n),position:"bottom"},{default:u(()=>[t(_,{columns:x,onConfirm:E,onCancel:e[7]||(e[7]=n=>m.value=!1)})]),_:1},8,["show"])]),_:1}),o.value.qrCodeUrl?(c(),d("div",le,[s("div",ne,[s("div",ae,[s("img",{src:o.value.qrCodeUrl,alt:"二维码"},null,8,ie)])]),e[11]||(e[11]=s("div",{class:"qr-text"},[s("span",null,"经营者二维码"),s("span",{class:"save-btn"},"长按保存")],-1))])):q("",!0)])])])}}},_e=A(ue,[["__scopeId","data-v-e1d4ec34"]]);export{_e as default};
