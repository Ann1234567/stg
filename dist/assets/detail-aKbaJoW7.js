import{r as o,o as p,h as g,c as n,a as s,b as c,d as r,t as d,e as i}from"./index-DohTaPA9.js";import{C as f}from"./CommonHeader-D5wAUnYL.js";import{a as h}from"./hotList-XVLBxVkH.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./request-C8QZ-v7H.js";const k={class:"hotlist-detail"},w={class:"header-fixed"},I={key:0,class:"loading-container"},T={key:1,class:"content"},x={class:"title"},b={class:"issueTime"},B=["innerHTML"],C={__name:"detail",setup(H){const _=g(),l=o(null),a=o(!1),e=o({title:"",issueTime:"",backgroundImg:"",content:""});p(()=>{l.value=_.params.newsId,u()});const u=async()=>{try{a.value=!0;const t=await h(l.value);e.value=await t.data}catch(t){console.error("获取详情失败:",t)}finally{a.value=!1}};return(t,M)=>{const m=r("van-loading"),v=r("van-image");return i(),n("div",k,[s("div",w,[c(f)]),a.value?(i(),n("div",I,[c(m,{type:"spinner",color:"#1989fa"})])):(i(),n("div",T,[s("div",x,d(e.value.title),1),s("div",b,d(e.value.issueTime),1),c(v,{src:"/stg"+e.value.backgroundImg,radius:"8",class:"notice-image"},null,8,["src"]),s("div",{class:"notice-content",innerHTML:e.value.content},null,8,B)]))])}}},R=y(C,[["__scopeId","data-v-61469766"]]);export{R as default};
