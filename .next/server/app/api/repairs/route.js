"use strict";(()=>{var e={};e.id=6729,e.ids=[6729],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},86624:e=>{e.exports=require("querystring")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},2650:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>f,patchFetch:()=>w,requestAsyncStorage:()=>m,routeModule:()=>y,serverHooks:()=>v,staticGenerationAsyncStorage:()=>b});var i={};t.r(i),t.d(i,{GET:()=>h,POST:()=>x});var s=t(49303),a=t(88716),n=t(60670),o=t(87070),l=t(75571),d=t(9133),p=t(20728),c=t(95456),u=t(20471);let g=d.z.object({deviceType:d.z.string().min(1,"Device type is required"),deviceModel:d.z.string().optional(),issueDescription:d.z.string().min(10,"Issue description must be at least 10 characters"),urgency:d.z.enum(["LOW","MEDIUM","HIGH","URGENT"]).default("MEDIUM"),isEasyMailIn:d.z.boolean().default(!1),estimatedValue:d.z.number().optional(),shippingAddress:d.z.object({name:d.z.string(),email:d.z.string().email(),phone:d.z.string(),address:d.z.string(),city:d.z.string(),postalCode:d.z.string(),country:d.z.string().default("Kosovo")}).optional(),language:d.z.enum(["sq","en"]).default("sq")});async function h(e){try{let r=await (0,l.getServerSession)(c.L);if(!r)return o.NextResponse.json({error:"Unauthorized"},{status:401});let{searchParams:t}=new URL(e.url),i=parseInt(t.get("page")||"1"),s=parseInt(t.get("limit")||"10"),a=t.get("status"),n=t.get("isEasyMailIn"),d=r?.user?.role,u="CLIENT"===d?r.user?.id:t.get("userId"),g=(i-1)*s,h={};u&&(h.userId=u),a&&(h.status=a),null!==n&&(h.isEasyMailIn="true"===n);let[x,y]=await Promise.all([p._.repair.findMany({where:h,include:{user:{select:{id:!0,name:!0,email:!0}},timelineEntries:{where:{isVisible:!0},orderBy:{createdAt:"desc"}},assignedTechnician:{select:{id:!0,name:!0,email:!0}}},orderBy:{createdAt:"desc"},skip:g,take:s}),p._.repair.count({where:h})]);return o.NextResponse.json({repairs:x,pagination:{page:i,limit:s,total:y,pages:Math.ceil(y/s)}})}catch(e){return console.error("Get repairs error:",e),o.NextResponse.json({error:"Internal server error"},{status:500})}}async function x(e){try{let r=await (0,l.getServerSession)(c.L);if(!r)return o.NextResponse.json({error:"Unauthorized"},{status:401});let t=await e.json(),{deviceType:i,deviceModel:s,issueDescription:a,urgency:n,isEasyMailIn:d,estimatedValue:h,shippingAddress:x,language:y}=g.parse(t),m=await p._.repair.count(),b=`PR-${new Date().getFullYear()}-${String(m+1).padStart(3,"0")}`,v=await p._.$transaction(async e=>{let t=await e.repair.create({data:{repairNumber:b,userId:r.user?.id,deviceType:i,deviceModel:s,issueDescription:a,urgency:n,status:"PENDING",isEasyMailIn:d,estimatedValue:h,shippingAddress:x?JSON.stringify(x):null,language:y}});return await e.timelineEntry.create({data:{repairId:t.id,status:"PENDING",title:"sq"===y?"K\xebrkesa e Riparimit e Krijuar":"Repair Request Created",description:"sq"===y?"K\xebrkesa juaj p\xebr riparim \xebsht\xeb regjistruar me sukses dhe \xebsht\xeb duke u shqyrtuar.":"Your repair request has been successfully registered and is being reviewed.",isVisible:!0,createdBy:r.user?.id}}),d&&await e.timelineEntry.create({data:{repairId:t.id,status:"SHIPPING_ARRANGED",title:"sq"===y?"Transporti EasyMail-In":"EasyMail-In Shipping",description:"sq"===y?"Kuti transporti do t\xeb d\xebrgohet n\xeb adres\xebn tuaj brenda 24 or\xebve.":"Shipping box will be sent to your address within 24 hours.",isVisible:!0,createdBy:r.user?.id}}),t}),f=u.v.repairUpdate(b,"PENDING",y);await (0,u.C)({to:r.user.email,subject:f.subject,html:f.html});let w=await p._.repair.findUnique({where:{id:v.id},include:{user:{select:{id:!0,name:!0,email:!0}},timelineEntries:{where:{isVisible:!0},orderBy:{createdAt:"desc"}},assignedTechnician:{select:{id:!0,name:!0,email:!0}}}});return o.NextResponse.json({message:"Repair request created successfully",repair:w},{status:201})}catch(e){if(console.error("Create repair error:",e),e instanceof d.z.ZodError)return o.NextResponse.json({error:"Validation failed",details:e.errors},{status:400});return o.NextResponse.json({error:"Internal server error"},{status:500})}}let y=new s.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/repairs/route",pathname:"/api/repairs",filename:"route",bundlePath:"app/api/repairs/route"},resolvedPagePath:"/workspace/src/app/api/repairs/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:m,staticGenerationAsyncStorage:b,serverHooks:v}=y,f="/api/repairs/route";function w(){return(0,n.patchFetch)({serverHooks:v,staticGenerationAsyncStorage:b})}},95456:(e,r,t)=>{t.d(r,{L:()=>o});var i=t(53797),s=t(42023),a=t.n(s),n=t(20728);let o={providers:[(0,i.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;try{let r=await n._.user.findUnique({where:{email:e.email}});if(!r||!r.isActive||!await a().compare(e.password,r.password))return null;return{id:r.id,email:r.email,name:r.name,role:r.role}}catch(e){return console.error("Auth error:",e),null}}})],session:{strategy:"jwt",maxAge:2592e3},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.role=r?.role),e),session:async({session:e,token:r})=>(r&&(e.user.id=r.sub,e.user.role=r.role),e)},pages:{signIn:"/auth/login"},secret:process.env.NEXTAUTH_SECRET}},20471:(e,r,t)=>{t.d(r,{C:()=>s,v:()=>a});let i=t(55245).createTransport({host:process.env.EMAIL_HOST,port:parseInt(process.env.EMAIL_PORT||"587"),secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASSWORD}});async function s({to:e,subject:r,html:t,text:s}){try{let a=await i.sendMail({from:process.env.EMAIL_FROM||"Petabyte Tech <noreply@petabyte.al>",to:e,subject:r,html:t,text:s||t.replace(/<[^>]*>/g,"")});return console.log("Email sent:",a.messageId),{success:!0,messageId:a.messageId}}catch(e){return console.error("Email error:",e),{success:!1,error:e}}}let a={welcome:(e,r="sq")=>({sq:{subject:"Mir\xebsevini n\xeb Petabyte Tech!",html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Mir\xebsevini, ${e}!</h2>
              <p style="color: #333; line-height: 1.6;">
                Ju fal\xebnderojm\xeb q\xeb u regjistruat n\xeb Petabyte Tech. Ne jemi t\xeb lumtur t'ju kemi si pjes\xeb t\xeb komunitetit ton\xeb.
              </p>
              <p style="color: #333; line-height: 1.6;">
                Tani mund t\xeb:
              </p>
              <ul style="color: #333; line-height: 1.6;">
                <li>Konfiguroni PC-n\xeb tuaj t\xeb personalizuar</li>
                <li>Personalizoni kontrollerin tuaj PS5</li>
                <li>D\xebrgoni pajisjet p\xebr riparim</li>
                <li>Aksesoni mb\xebshtetjen 24/7</li>
              </ul>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Hyni n\xeb Panel
                </a>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; color: #666;">
              <p>&copy; 2024 Petabyte Tech. T\xeb gjitha t\xeb drejtat e rezervuara.</p>
            </div>
          </div>
        `},en:{subject:"Welcome to Petabyte Tech!",html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Welcome, ${e}!</h2>
              <p style="color: #333; line-height: 1.6;">
                Thank you for registering with Petabyte Tech. We're excited to have you as part of our community.
              </p>
              <p style="color: #333; line-height: 1.6;">
                You can now:
              </p>
              <ul style="color: #333; line-height: 1.6;">
                <li>Configure your custom PC</li>
                <li>Customize your PS5 controller</li>
                <li>Send devices for repair</li>
                <li>Access 24/7 support</li>
              </ul>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Go to Dashboard
                </a>
              </div>
            </div>
            <div style="padding: 20px; text-align: center; color: #666;">
              <p>&copy; 2024 Petabyte Tech. All rights reserved.</p>
            </div>
          </div>
        `}})[r],orderConfirmation:(e,r,t="sq")=>({sq:{subject:`Konfirmim Porosie #${e}`,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Porosia juaj \xebsht\xeb konfirmuar!</h2>
              <p style="color: #333; line-height: 1.6;">
                Numri i porosis\xeb: <strong>#${e}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                Totali: <strong>€${r.toFixed(2)}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard/orders/${e}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Shiko Porosin\xeb
                </a>
              </div>
            </div>
          </div>
        `},en:{subject:`Order Confirmation #${e}`,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Your order is confirmed!</h2>
              <p style="color: #333; line-height: 1.6;">
                Order number: <strong>#${e}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                Total: <strong>€${r.toFixed(2)}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/dashboard/orders/${e}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View Order
                </a>
              </div>
            </div>
          </div>
        `}})[t],repairUpdate:(e,r,t="sq")=>({sq:{subject:`P\xebrdit\xebsim p\xebr Riparimin #${e}`,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">P\xebrdit\xebsim p\xebr riparimin tuaj</h2>
              <p style="color: #333; line-height: 1.6;">
                Numri i riparimit: <strong>#${e}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                Statusi i ri: <strong>${r}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/timeline/${e}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Shiko Timeline
                </a>
              </div>
            </div>
          </div>
        `},en:{subject:`Repair Update #${e}`,html:`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #171542 0%, #7C56A3 50%, #ACD036 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0;">Petabyte Tech</h1>
            </div>
            <div style="padding: 40px; background: #f5f5f5;">
              <h2 style="color: #171542;">Update on your repair</h2>
              <p style="color: #333; line-height: 1.6;">
                Repair number: <strong>#${e}</strong>
              </p>
              <p style="color: #333; line-height: 1.6;">
                New status: <strong>${r}</strong>
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.APP_URL}/timeline/${e}" 
                   style="background: #7C56A3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  View Timeline
                </a>
              </div>
            </div>
          </div>
        `}})[t]}},20728:(e,r,t)=>{t.d(r,{_:()=>s});let i=require("@prisma/client"),s=global.prisma||new i.PrismaClient({log:["query"]})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),i=r.X(0,[9276,5972,2023,1790,9133,5245],()=>t(2650));module.exports=i})();