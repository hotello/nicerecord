(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{289:function(e,t,n){"use strict";n.d(t,"a",(function(){return nt}));var r=n(11),a=n.n(r),i=n(0),o=n.n(i),l=n(1509),c=n(3),u=n(2),s=n(257),d=n(1507),f=i.createContext({note:null,patient:null,setNote:function(){},setPatient:function(){}}),m=n(29),p=n.n(m),h=n(103),b=n.n(h);function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){p()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var v={cultured:"#f1f1f6",eerieBlack:"#1c1c1e",majorelleBlue:"#623cea",platinum:"#eaeaed",silverSand:"#c7c7cc",white:"#ffffff"},O={background:v.cultured,border:v.platinum,muted:b()(v.eerieBlack).alpha(.5).rgb().string(),primary:v.majorelleBlue,surface:v.white,text:v.eerieBlack},E=y(y({},v),O);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var x=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){p()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({unit:4},{content:16,edge:8,radius:8,text:16}),j=n(212),C=n(123),w={en:n(314)};j.a.use(C.f).init({resources:w,lng:"en",interpolation:{escapeValue:!1}});j.a;var S=n(30),D=n(20),k=n.n(D),_=n(25),I=n.n(_),N=n(37),R=n(96),T=n(76),B=n(258),L=n.n(B),F={small:36,medium:54,large:76,xlarge:146},A=["#623ceaff","#ff934fff","#d972ffff","#8cffdaff","#1b1f3bff","#e6c229ff","#00a5e0ff","#ce2d4fff","#9c89b8ff","#ceec97ff"],V=function(e){var t=function(e){for(var t=0,n=0;n<e.length;n++)t+=e.charCodeAt(n);return t}(e)%A.length;return{backgroundColor:A[t]}},W=function(e){var t=e.onPress,n=e.onLongPress,r=e.Component,a=void 0===r?t||n?T.a:u.a:r,i=e.source,l=e.size,s=e.avatarStyle,d=e.rounded,f=e.title,m=e.titleStyle,p=e.overlayContainerStyle,h=e.imageProps,b=e.placeholderStyle,g=e.ImageComponent,y=e.style,v=I()(e,["onPress","onLongPress","Component","source","size","avatarStyle","rounded","title","titleStyle","overlayContainerStyle","imageProps","placeholderStyle","ImageComponent","style"]),O="number"===typeof l?l:F[l]||F.small,E=O,P=O/2;return o.a.createElement(a,k()({onPress:t,onLongPress:n,style:[z.container,{height:E,width:O},d&&{borderRadius:O/2},f&&V(f),y]},v),i?o.a.createElement(R.a,k()({placeholderStyle:b,PlaceholderContent:PlaceholderContent,containerStyle:c.a.flatten([z.overlayContainer,d&&{borderRadius:O/2,overflow:"hidden"},p]),source:i},h,{style:c.a.flatten([z.avatar,h&&h.style,s]),ImageComponent:g})):f&&o.a.createElement(N.a,{style:c.a.flatten([z.title,{fontSize:P},m])},L()(f)))},z=c.a.create({container:{backgroundColor:"gray",alignItems:"center",justifyContent:"center"},avatar:{flex:1,width:null,height:null},overlayContainer:{flex:1},title:{backgroundColor:"transparent",color:"white"}}),H=n(9),U=n.n(H),q=n(18),J=n.n(q),M=n(15),G=n.n(M),K=n(16),Q=n.n(K),X=n(6),Y=n.n(X),Z=n(5),$=n(157);function ee(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Y()(e);if(t){var a=Y()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Q()(this,n)}}var te=function(e){G()(n,e);var t=ee(n);function n(){return U()(this,n),t.apply(this,arguments)}return J()(n,[{key:"render",value:function(){var e=this.props,t=e.accessibilityLabel,n=e.bold,r=e.color,a=e.onPress,o=e.touchSoundDisabled,l=e.title,c=e.hasTVPreferredFocus,s=e.nextFocusDown,d=e.nextFocusForward,f=e.nextFocusLeft,m=e.nextFocusRight,p=e.nextFocusUp,h=e.disabled,b=e.testID,g=[ne.button],y=[ne.text];r&&("ios"===Z.a.OS?y.push({color:r}):g.push({backgroundColor:r}));var v={};h&&(g.push(ne.buttonDisabled),y.push(ne.textDisabled),v.disabled=!0),n&&y.push(ne.bold);var O="android"===Z.a.OS?l.toUpperCase():l,E="android"===Z.a.OS?$.a:T.a;return i.createElement(E,{accessibilityLabel:t,accessibilityRole:"button",accessibilityState:v,hasTVPreferredFocus:c,nextFocusDown:s,nextFocusForward:d,nextFocusLeft:f,nextFocusRight:m,nextFocusUp:p,testID:b,disabled:h,onPress:a,touchSoundDisabled:o},i.createElement(u.a,{style:g},i.createElement(N.a,{style:y,disabled:h},O)))}}]),n}(i.Component),ne=c.a.create({bold:{fontWeight:"bold"},button:{},text:{textAlign:"center",margin:8,color:E.primary,fontSize:18},buttonDisabled:{},textDisabled:{color:E.muted}}),re=n(28);function ae(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Y()(e);if(t){var a=Y()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Q()(this,n)}}var ie=function(e){G()(n,e);var t=ae(n);function n(){return U()(this,n),t.apply(this,arguments)}return J()(n,[{key:"render",value:function(){var e=this.props,t=e.muted,n=e.style,r=I()(e,["muted","style"]),a=b()(E.text).alpha(t?.5:1).rgb().string(),o=re.a.isRTL?"rtl":"ltr";return i.createElement(N.a,k()({},r,{style:[{color:a,fontSize:x.text,textAlign:"left",writingDirection:o},n,this.props.style]}))}}]),n}(i.Component);var oe=c.a.create({content:{alignItems:"center",flexDirection:"row",justifyContent:"space-between",paddingHorizontal:x.content,paddingVertical:2*x.unit}}),le=function(e,t){var n=e.editable,r=e.label,a=e.onChange,o=void 0===a?function(){}:a,l=e.value;return I()(e,["editable","label","onChange","value"]),i.createElement(u.a,{style:oe.content},i.createElement(ie,null,r),i.createElement(u.a,null,i.createElement("input",{disabled:!n,onChange:function(e){o(e.target.value)},type:"date",value:l.toISOString?l.toISOString().substring(0,10):l})))},ce=n(1508);function ue(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=Y()(e);if(t){var a=Y()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Q()(this,n)}}var se=function(e){G()(n,e);var t=ue(n);function n(){return U()(this,n),t.apply(this,arguments)}return J()(n,[{key:"render",value:function(){var e=this.props,t=e.children,n=I()(e,["children"]),r="android"===Z.a.OS?$.a:T.a;return i.createElement(r,n,t)}}]),n}(i.Component),de=i.forwardRef((function(e,t){var n=e.color,r=void 0===n?E.primary:n,a=e.disabled,o=e.icon,l=e.onPress,c=e.pressColor,s=e.primary,d=e.style;I()(e,["color","disabled","icon","onPress","pressColor","primary","style"]);return i.createElement(se,{disabled:a,onPress:l,pressColor:c,style:fe.touchable,ref:t},i.createElement(u.a,{style:[fe.container,s&&fe.primary,a&&fe.disabled,d]},i.createElement(ce.a,{name:("android"===Z.a.OS?"md":"ios")+"-"+o,size:26,color:a?E.muted:s?"white":r,style:fe.icon})))})),fe=c.a.create({container:{borderRadius:100*x.unit,overflow:"hidden",backgroundColor:"transparent"},disabled:{backgroundColor:"transparent"},icon:{height:28,margin:4,textAlign:"center",width:28},primary:{backgroundColor:E.primary}}),me=n(64),pe=i.forwardRef((function(e,t){e.disabledUnderlineAndroid;var n=e.placeholderTextColor,r=void 0===n?E.muted:n,a=e.selectionColor,o=void 0===a?E.primary:a,l=e.style,c=e.underlineIOS,s=I()(e,["disabledUnderlineAndroid","placeholderTextColor","selectionColor","style","underlineIOS"]);return i.createElement(u.a,{style:[he.container,l]},i.createElement(me.a,k()({},s,{placeholderTextColor:r,ref:t,selectionColor:o,style:[he.input,c?he.withBorder:null]})))})),he=c.a.create({container:{paddingLeft:x.content},input:{fontSize:x.text,paddingVertical:3*x.unit},withBorder:{borderBottomWidth:c.a.hairlineWidth,borderBottomColor:E.border}}),be=pe;var ge=c.a.create({group:{backgroundColor:E.surface,borderBottomColor:E.border,borderBottomWidth:c.a.hairlineWidth,borderTopColor:E.border,borderTopWidth:c.a.hairlineWidth,marginBottom:4*x.unit}}),ye=function(e){var t=e.children,n=e.style,r=I()(e,["children","style"]);return i.createElement(u.a,k()({},r,{style:[ge.group,n]}),t)},ve=n(117),Oe=n(278),Ee=n(292);function Pe(e){var t=e.onPress,n=e.item;return i.createElement(se,{onPress:function(){return t(n)}},i.createElement(u.a,{style:Ce.item},i.createElement(W,{rounded:!0,title:n.name.text,style:Ce.picture}),i.createElement(u.a,{style:Ce.center},i.createElement(ie,null,n.name.text),i.createElement(ie,{muted:!0},Object(ve.a)(Object(Oe.a)(n.birthDate),"PP")))))}function xe(){var e=Object(l.a)().t;return i.createElement(u.a,{style:Ce.empty},i.createElement(ie,{muted:!0},e("noPatients")))}function je(e){var t,n=e.onPress,r=e.patients,a=(t=r).length<1?[]:Object.values(t.sort((function(e,t){var n=e.name.text.toUpperCase(),r=t.name.text.toUpperCase();return n<r?-1:n>r?1:0})).reduce((function(e,t){var n=t.name.text[0];return e[n]?e[n].data.push(t):e[n]={title:n,data:[t]},e}),{}));return i.createElement(Ee.a,{initialNumToRender:20,sections:a,keyExtractor:function(e){return e._id},ListEmptyComponent:xe,renderItem:function(e){var t=e.item;return i.createElement(Pe,{onPress:n,item:t})},renderSectionHeader:function(e){var t=e.section.title;return i.createElement(ie,{style:Ce.header},t)}})}var Ce=c.a.create({empty:{alignItems:"center",padding:x.content,justifyContent:"center"},header:{fontWeight:"bold",paddingHorizontal:x.content,paddingVertical:2*x.unit},item:{flexDirection:"row",alignItems:"center",paddingVertical:2*x.unit},picture:{marginHorizontal:x.content}}),we=new(n(279).a)("data");function Se(e){var t=e.navigation,n=i.useState([]),r=a()(n,2),o=r[0],l=r[1],c=Object(S.useIsFocused)();return i.useEffect((function(){t.setOptions({headerRight:function(){return i.createElement(de,{icon:"person-add",style:De.icon,onPress:function(){return t.navigate("Profile",{edit:!0,patient:null})}})}})}),[]),i.useEffect((function(){var e=function(){return we.allDocs({startkey:"Patient_",endkey:"Patient_\uffff",include_docs:!0}).then((function(e){var t=e.rows;return l(t.map((function(e){return e.doc})))})).catch(console.error)},t=we.changes({filter:function(e){return"Patient"===e.resourceType||e._deleted},live:!0});return e().then((function(){return t.on("change",e)})),function(){t.cancel()}}),[c]),i.createElement(u.a,{style:{flex:1}},i.createElement(je,{onPress:function(e){return t.navigate("Patient",{patient:e})},patients:o}))}var De=c.a.create({icon:{marginRight:x.edge}}),ke=n(138),_e=(n(442),n(254),n(167)),Ie=n(1506);function Ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Re(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ne(Object(n),!0).forEach((function(t){p()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ne(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Te=function(e){var t=e.date;return"ClinicalImpression_"+e.subject.reference+"_"+Object(ke.a)(t)};function Be(e){var t=e.navigation,n=Object(l.a)().t,r=Object(Ie.a)(),o=i.useContext(f),c=o.note,u=(o.setNote,i.useState({})),s=a()(u,2),d=s[0],m=s[1],p=i.useState(""),h=a()(p,2),b=h[0],g=h[1],y=function(e,t){var n=i.useState(e),r=a()(n,2),o=r[0],l=r[1];return i.useEffect((function(){var n=setTimeout((function(){l(e)}),t);return function(){clearTimeout(n)}}),[e,t]),o}(b,1e3);return i.useEffect((function(){c?(m(c),g((null==c?void 0:c.summary)||"")):(m({}),g(""))}),[c]),i.useEffect((function(){if(d.subject&&!d._id){var e=new Date;m(Re(Re({},d),{},{_id:Te({date:e,subject:d.subject}),date:e}))}}),[d._id,d.subject]),i.useEffect((function(){var e=d.date?new Date(d.date):new Date;t.setOptions({headerRight:function(){return i.createElement(de,{disabled:!d._id||!d.subject,onPress:function(){return we.remove(d._id,d._rev).then((function(){m({subject:d.subject}),g("")})).catch(console.error)},icon:"trash",style:Le.icon})},title:d&&d.date?Object(ve.a)(e,"PP"):n("note")})}),[d]),i.useEffect((function(){d._id&&d.subject&&y.length>0&&function(e){var t=e.date,n=e.summary,r=e.subject,a=I()(e,["date","summary","subject"]);return"string"===typeof t&&(t=new Date(t)),we.put(Re(Re({},a),{},{_id:Te({subject:r,date:t}),date:Object(ke.a)(t),subject:{reference:r.reference,type:"Patient"},status:"in-progress",summary:n,resourceType:"ClinicalImpression"}))}(Re(Re({},d),{},{summary:y})).then((function(e){var t=e.rev;return m(Re(Re({},d),{},{_rev:t}))})).catch(console.error)}),[y]),i.createElement(_e.a,{behavior:"ios"==Z.a.OS?"padding":"height",keyboardVerticalOffset:r,style:Le.screen},i.createElement(me.a,{editable:!!(null==d?void 0:d.subject),multiline:!0,onChangeText:function(e){return g(e)},placeholder:n("writeHere"),style:Le.input,textAlignVertical:"top",value:b}))}var Le=c.a.create({icon:{marginRight:x.edge},input:{flex:1,fontSize:x.text},screen:{backgroundColor:E.surface,flex:1,padding:x.content}}),Fe=n(293);function Ae(e){var t=e.item,n=e.onPress;return o.a.createElement(se,{onPress:function(){return n(t)}},o.a.createElement(u.a,{style:ze.item},o.a.createElement(ie,{style:ze.date},Object(ve.a)(new Date(t.date),"PP")),o.a.createElement(ie,null,t.summary)))}function Ve(){var e=Object(l.a)().t;return o.a.createElement(u.a,{style:ze.empty},o.a.createElement(ie,{muted:!0},e("noNotes")))}function We(e){var t=e.onPress,n=e.notes;return o.a.createElement(Fe.a,{data:n,ListEmptyComponent:Ve,renderItem:function(e){var n=e.item;return o.a.createElement(Ae,{item:n,onPress:t})},keyExtractor:function(e){return e._id}})}var ze=c.a.create({date:{fontWeight:"bold",marginBottom:2*x.unit},empty:{alignItems:"center",padding:x.content,justifyContent:"center"},item:{backgroundColor:E.surface,borderColor:E.border,borderRadius:x.radius,borderWidth:1,margin:x.edge,padding:x.content}});function He(e){var t=e.route,n=e.navigation,r=i.useState([]),o=a()(r,2),l=o[0],c=o[1],s=i.useContext(f).setNote,d=t.params.patient,m=function(){return s({subject:{reference:d._id,type:"Patient"}})};return i.useEffect((function(){n.setOptions({headerRight:function(){return i.createElement(u.a,{style:Ue.headerRight},i.createElement(de,{icon:"information-circle-outline",onPress:function(){return n.navigate("Profile",{edit:!1,patient:d})},style:Ue.icon}),i.createElement(de,{icon:"add",onPress:function(){return m()},primary:!0,style:Ue.icon}))},title:d.name.text})}),[d]),i.useEffect((function(){var e=function(){return we.allDocs({descending:!0,endkey:"ClinicalImpression_"+d._id+"_",include_docs:!0,startkey:"ClinicalImpression_"+d._id+"_\uffff"}).then((function(e){var t=e.rows;return c(t.map((function(e){return e.doc})))})).catch(console.error)},t=we.changes({filter:function(e){return"ClinicalImpression"===e.resourceType||e._deleted},live:!0});return e().then((function(){return t.on("change",e)})),function(){t.cancel()}}),[d._id]),i.useEffect((function(){return m(),function(){s(null)}}),[d._id]),i.createElement(We,{notes:l,onPress:function(e){return s(e)}})}var Ue=c.a.create({headerRight:{flexDirection:"row"},icon:{marginRight:x.edge},screen:{flex:1}}),qe=n(291),Je=n(290),Me=n(84),Ge=n(73);function Ke(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Qe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Ke(Object(n),!0).forEach((function(t){p()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ke(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Xe=Ge.b().shape({birthDate:Ge.a().max(Object(qe.a)(new Date,{days:1})).required(),email:Ge.c().max(150).email(),givenName:Ge.c().max(50).required(),familyName:Ge.c().max(50).required(),notes:Ge.c().max(1e4),genericIdentifier:Ge.c().max(100),phone:Ge.c().max(50)});function Ye(e){var t,n,r,a,o,c,s,d,f,m,p,h,b=e.route,g=e.navigation,y=Object(l.a)().t,v=Object(Ie.a)(),O=null==(t=b.params)?void 0:t.edit,E=null==(n=b.params)?void 0:n.patient,P=Object(Je.a)({initialValues:{_rev:null==E?void 0:E._rev,birthDate:(null==E?void 0:E.birthDate)?new Date(E.birthDate):new Date,email:(null==E||null==(r=E.telecom)||null==(a=r.find((function(e){return"email"===e.system})))?void 0:a.value)||"",givenName:(null==E||null==(o=E.name)?void 0:o.given.join(" "))||"",homeAddress:(null==E||null==(c=E.address)||null==(s=c.find((function(e){return"home"===e.use})))?void 0:s.text)||"",familyName:(null==E?void 0:E.name.family)||"",notes:(null==E||null==(d=E.text)?void 0:d.div)||"",genericIdentifier:(null==E||null==(f=E.identifier)||null==(m=f.find((function(e){return"usual"===e.use})))?void 0:m.value)||"",phone:(null==E||null==(p=E.telecom)||null==(h=p.find((function(e){return"phone"===e.system})))?void 0:h.value)||""},onSubmit:function(e){(function(e){var t=e.birthDate,n=e.email,r=e.familyName,a=e.genericIdentifier,i=e.givenName,o=e.homeAddress,l=e.notes,c=e.phone,u=I()(e,["birthDate","email","familyName","genericIdentifier","givenName","homeAddress","notes","phone"]);"string"===typeof t&&(t=new Date(t));var s=Object(ke.a)(t,{representation:"date"}),d=Qe(Qe({},u),{},{_id:"Patient_"+i+"_"+r+"_"+s,birthDate:s,name:{family:r,given:i.split(" "),text:i+" "+r},resourceType:"Patient"});return((null==n?void 0:n.length)>0||(null==c?void 0:c.length)>0)&&(d.telecom=[]),(null==n?void 0:n.length)>0&&d.telecom.push({system:"email",value:n}),(null==a?void 0:a.length)>0&&(d.identifier=[{use:"usual",value:a}]),(null==o?void 0:o.length)>0&&(d.address=[{text:o,type:"both",use:"home"}]),(null==l?void 0:l.length)>0&&(d.text={status:"additional",div:l}),(null==c?void 0:c.length)>0&&d.telecom.push({system:"phone",value:c}),we.put(d)})(e).then((function(e){var t=e.id;return we.get(t)})).then((function(e){return g.navigate("Profile",{edit:!1,patient:e})})).catch(console.error)},validationSchema:Xe}),x=P.handleBlur,j=P.handleChange,C=P.handleSubmit,w=P.isValid,S=P.setFieldValue,D=P.values;return i.useEffect((function(){g.setOptions({headerRight:function(){return i.createElement(u.a,{style:Ze.done},O?i.createElement(te,{disabled:!w,bold:!0,onPress:C,title:y("save")}):i.createElement(te,{onPress:function(){return g.navigate("Profile",{edit:!0})},title:y("edit")}))},title:y(O?"profileEdit":"profile")})}),[b.params,w]),i.createElement(_e.a,{behavior:"ios"==Z.a.OS?"padding":"height",keyboardVerticalOffset:v,style:Ze.screenContainer},i.createElement(Me.a,{style:Ze.screen},i.createElement(ye,{style:Ze.pictureContainer},i.createElement(W,{rounded:!0,title:D.givenName+" "+D.familyName,size:"large",style:Ze.picture})),i.createElement(ye,null,i.createElement(be,{editable:O&&!(null==E?void 0:E.givenName),maxLength:50,onBlur:x("givenName"),onChangeText:j("givenName"),placeholder:y("firstName"),underlineIOS:!0,value:D.givenName}),i.createElement(be,{editable:O&&!(null==E?void 0:E.familyName),maxLength:50,onBlur:x("familyName"),onChangeText:j("familyName"),placeholder:y("lastName"),underlineIOS:!0,value:D.familyName}),i.createElement(le,{editable:O&&!(null==E?void 0:E.birthDate),label:y("birthDate"),onChange:function(e){return S("birthDate",e)},value:D.birthDate})),i.createElement(ye,null,i.createElement(be,{editable:O,maxLength:100,onBlur:x("genericIdentifier"),onChangeText:j("genericIdentifier"),placeholder:y("patientId"),underlineIOS:!0,value:D.genericIdentifier}),i.createElement(be,{editable:O,maxLength:50,keyboardType:"phone-pad",onBlur:x("phone"),onChangeText:j("phone"),placeholder:y("phoneNumber"),underlineIOS:!0,value:D.phone}),i.createElement(be,{editable:O,maxLength:150,keyboardType:"email-address",onBlur:x("email"),onChangeText:j("email"),placeholder:y("email"),underlineIOS:!0,value:D.email}),i.createElement(be,{editable:O,maxLength:200,multiline:!0,numberOfLines:2,onBlur:x("homeAddress"),onChangeText:j("homeAddress"),placeholder:y("homeAddress"),textAlignVertical:"top",value:D.homeAddress})),i.createElement(ye,null,i.createElement(be,{editable:O,maxLength:1e4,multiline:!0,numberOfLines:10,onBlur:x("notes"),onChangeText:j("notes"),placeholder:y("notes"),textAlignVertical:"top",value:D.notes})),O&&E&&i.createElement(ye,{style:Ze.delete},i.createElement(te,{title:y("deletePatient"),onPress:function(){return we.allDocs({endkey:"ClinicalImpression_"+E._id+"_\uffff",include_docs:!0,startkey:"ClinicalImpression_"+E._id+"_"}).then((function(e){var t=e.rows;return we.bulkDocs(t.map((function(e){return Qe(Qe({},e.doc),{},{_deleted:!0})})))})).then((function(){return we.remove(E._id,E._rev)})).then((function(){return g.navigate("MyPatients")})).catch(console.error)}}))))}var Ze=c.a.create({delete:{alignItems:"flex-start",paddingHorizontal:x.unit,paddingVertical:x.unit},done:{marginRight:x.edge},picture:{borderRadius:60,height:120,marginBottom:2*x.unit,width:120},pictureContainer:{alignItems:"center",paddingVertical:x.content},screen:{paddingTop:x.content},screenContainer:{flex:1}}),$e=Object(d.a)(),et=Object(d.a)(),tt={dark:!1,colors:{primary:E.primary,background:E.background,card:E.surface,text:E.text,border:E.border}};function nt(){var e=o.a.useState(null),t=a()(e,2),n=t[0],r=t[1],i=Object(l.a)().t;return o.a.createElement(f.Provider,{value:{note:n,setNote:function(e){return r(e)}}},o.a.createElement(u.a,{style:rt.container},o.a.createElement(u.a,{style:rt.left},o.a.createElement(s.a,{theme:tt},o.a.createElement($e.Navigator,null,o.a.createElement($e.Screen,{name:"MyPatients",component:Se,options:{title:i("myPatients"),cardStyle:{backgroundColor:E.surface}}}),o.a.createElement($e.Screen,{name:"Patient",component:He,options:{title:i("patient")}}),o.a.createElement($e.Screen,{name:"Profile",component:Ye,options:{title:i("profile")}})))),o.a.createElement(u.a,{style:rt.right},o.a.createElement(s.a,{theme:tt},o.a.createElement(et.Navigator,null,o.a.createElement(et.Screen,{name:"Note",component:Be,options:{title:i("note")}}))))))}var rt=c.a.create({container:{flex:1,flexDirection:"row"},left:{flex:1/3,borderColor:E.border,borderWidth:c.a.hairlineWidth},right:{flex:2/3}})},301:function(e,t,n){n(302),e.exports=n(1493)},302:function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(e){})).catch((function(e){console.info("Failed to register service-worker",e)}))}))},314:function(e){e.exports=JSON.parse('{"translation":{"birthDate":"Birth date","deletePatient":"Delete patient","edit":"Edit","email":"E-mail","firstName":"First name","homeAddress":"Home address","lastName":"Last name","myPatients":"My patients","noNotes":"No notes","noPatients":"No patients","note":"Note","notes":"Notes","writeHere":"Write here...","patient":"Patient","patientId":"ID","phoneNumber":"Phone number","profile":"Patient profile","profileEdit":"Edit patient","save":"Save","setPicture":"Set picture"}}')}},[[301,1,2]]]);
//# sourceMappingURL=app.efa228bd.chunk.js.map