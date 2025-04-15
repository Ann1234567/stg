import{r as _,o as z,h as B,c as x,a as t,b as s,w as r,d as i,u as R,e as C,l as k,i as f,t as I,s as m}from"./index-DohTaPA9.js";import{g as T}from"./regulatoryScoring-BFvUh8l1.js";import{a as H}from"./applyVendor-N7zd6jMs.js";import{s as M}from"./request-C8QZ-v7H.js";import{C as P}from"./CommonHeader-D5wAUnYL.js";import{_ as j}from"./_plugin-vue_export-helper-DlAUqK2U.js";function G(V){return M({url:"/stg/complaintEvaluation/submit",method:"post",data:V})}const J={class:"complaint"},K={class:"header-fixed"},O={class:"content"},Q={class:"form-card",style:{"margin-top":"7rem"}},W={key:0,class:"qr-info flex flex-between"},X={class:"color-black"},Y={class:"color-gray"},Z={class:"color-black"},$={class:"color-gray"},L={class:"form-card"},ee={class:"upload-section"},oe={class:"submit-btn"},ae={__name:"index",setup(V){const y=R(),g=B(),u=_(),h=_({userName:"",stall:{stallCode:""}}),o=_({type:"1",content:"",images:[],name:"",phone:"",score:0}),D=()=>{y.push({path:"/history",query:{userId:u.value}})},N=()=>{y.replace({path:"/scaner",query:{toPath:"/complaint"}})},E=()=>{if(!u.value){m("请先扫描摊位二维码");return}if(b.value){m("图片上传中，请稍候...");return}if(!o.value.type){m("请选择类型");return}if(!o.value.score){m("请进行评分");return}if(!o.value.content){m("请输入内容");return}let l={userId:u.value,type:o.value.type,content:o.value.content,score:o.value.score,files:o.value.files};G(l).then(e=>{e.code===200&&y.replace({path:"/submitSuccess"})})},b=_(!1),F=l=>{b.value=!0;const e=new FormData,v=Array.isArray(l)?l:[l];v.forEach(a=>{e.append("files",a.file)}),H(e).then(a=>{if(a.code===200){o.value.files||(o.value.files=[]);const n=Array.isArray(a.data)?a.data:[a.data];o.value.files.push(...n)}else m(a.msg||"上传失败"),v.forEach(n=>{const d=o.value.images.findIndex(p=>p.file===n.file);d!==-1&&o.value.images.splice(d,1)})}).catch(a=>{m("上传失败"),v.forEach(n=>{const d=o.value.images.findIndex(p=>p.file===n.file);d!==-1&&o.value.images.splice(d,1)})}).finally(()=>{b.value=!1})};return z(async()=>{console.log(g.query,"route.queryroute.query"),g.query.userId&&(u.value=g.query.userId,T(u.value).then(l=>{h.value=l.data}))}),(l,e)=>{const v=i("van-icon"),a=i("van-field"),n=i("van-radio"),d=i("van-radio-group"),p=i("van-rate"),U=i("van-uploader"),A=i("van-button"),S=i("van-form");return C(),x("div",J,[t("div",K,[s(P,{title:"投诉评价"})]),t("div",O,[s(S,{"input-align":"right"},{default:r(()=>{var q,w;return[t("div",Q,[s(a,{"label-width":"8rem",required:"",readonly:"",label:"请扫描摊位二维码"},{"right-icon":r(()=>[s(v,{name:"scan",color:"#1677FF",size:"20",onClick:N})]),_:1}),u.value?(C(),x("div",W,[t("div",X,[e[4]||(e[4]=f(" 摊主姓名：")),t("span",Y,I(h.value.userName),1)]),t("div",Z,[e[5]||(e[5]=f(" 摊位编号：")),t("span",$,I((w=(q=h.value)==null?void 0:q.stall)==null?void 0:w.stallCode),1)])])):k("",!0),u.value?(C(),x("div",{key:1,class:"history",onClick:D}," 查看历史信息 >> ")):k("",!0)]),t("div",L,[s(a,{name:"radio",label:"类型"},{input:r(()=>[s(d,{required:"",modelValue:o.value.type,"onUpdate:modelValue":e[0]||(e[0]=c=>o.value.type=c),direction:"horizontal"},{default:r(()=>[s(n,{name:"1"},{default:r(()=>e[6]||(e[6]=[f("投诉")])),_:1}),s(n,{name:"2"},{default:r(()=>e[7]||(e[7]=[f("评价")])),_:1})]),_:1},8,["modelValue"])]),_:1}),s(a,{name:"radio",label:"评分"},{input:r(()=>[s(p,{modelValue:o.value.score,"onUpdate:modelValue":e[1]||(e[1]=c=>o.value.score=c),size:15,color:"#F22D22","void-icon":"star","void-color":"#CCCCCC"},null,8,["modelValue"])]),_:1}),s(a,{modelValue:o.value.content,"onUpdate:modelValue":e[2]||(e[2]=c=>o.value.content=c),rows:"4",type:"textarea",required:"",maxlength:"200",placeholder:"请输入，不超过200字","show-word-limit":"",label:"内容"},null,8,["modelValue"]),t("div",ee,[e[8]||(e[8]=t("div",{class:"flex flex-between"},[t("div",{class:"section-title"},"上传照片（选填，最多4张）"),t("div",{class:"upload-tip"},"上传的照片不能超过20M")],-1)),s(U,{modelValue:o.value.images,"onUpdate:modelValue":e[3]||(e[3]=c=>o.value.images=c),"max-count":4,accept:"image/*",multiple:"","after-read":F},null,8,["modelValue"])]),t("div",oe,[s(A,{block:"",type:"primary","native-type":"submit",onClick:E},{default:r(()=>e[9]||(e[9]=[f(" 确认提交 ")])),_:1})])])]}),_:1})])])}}},ue=j(ae,[["__scopeId","data-v-0d49c28a"]]);export{ue as default};
