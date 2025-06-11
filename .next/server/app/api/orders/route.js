"use strict";(()=>{var e={};e.id=9146,e.ids=[9146],e.modules={72934:e=>{e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},27790:e=>{e.exports=require("assert")},78893:e=>{e.exports=require("buffer")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},86624:e=>{e.exports=require("querystring")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},60514:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>v,patchFetch:()=>w,requestAsyncStorage:()=>y,routeModule:()=>m,serverHooks:()=>f,staticGenerationAsyncStorage:()=>b});var i={};t.r(i),t.d(i,{GET:()=>h,POST:()=>x});var o=t(49303),s=t(88716),n=t(60670),a=t(87070),l=t(75571),d=t(9133),p=t(20728),c=t(95456),u=t(20471);let g=d.z.object({type:d.z.enum(["PC_BUILD","PS5_CONTROLLER","PRODUCT","GIFT_CARD"]),items:d.z.array(d.z.object({productId:d.z.string().optional(),pcConfigId:d.z.string().optional(),ps5ConfigId:d.z.string().optional(),quantity:d.z.number().min(1),price:d.z.number().min(0),customizations:d.z.record(d.z.any()).optional()})),shippingAddress:d.z.object({name:d.z.string(),email:d.z.string().email(),phone:d.z.string(),address:d.z.string(),city:d.z.string(),postalCode:d.z.string(),country:d.z.string().default("Kosovo")}),notes:d.z.string().optional(),language:d.z.enum(["sq","en"]).default("sq")});async function h(e){try{let r=await (0,l.getServerSession)(c.L);if(!r)return a.NextResponse.json({error:"Unauthorized"},{status:401});let{searchParams:t}=new URL(e.url),i=parseInt(t.get("page")||"1"),o=parseInt(t.get("limit")||"10"),s=t.get("status"),n=t.get("type"),d=r?.user?.role,u="CLIENT"===d?r.user?.id:t.get("userId"),g=(i-1)*o,h={};u&&(h.userId=u),s&&(h.status=s),n&&(h.type=n);let[x,m]=await Promise.all([p._.order.findMany({where:h,include:{user:{select:{id:!0,name:!0,email:!0}},items:{include:{product:!0}},pcConfig:!0,ps5Config:!0,invoice:!0,timeline:{orderBy:{createdAt:"desc"}}},orderBy:{createdAt:"desc"},skip:g,take:o}),p._.order.count({where:h})]);return a.NextResponse.json({orders:x,pagination:{page:i,limit:o,total:m,pages:Math.ceil(m/o)}})}catch(e){return console.error("Get orders error:",e),a.NextResponse.json({error:"Internal server error"},{status:500})}}async function x(e){try{let r=await (0,l.getServerSession)(c.L);if(!r)return a.NextResponse.json({error:"Unauthorized"},{status:401});let t=await e.json(),{type:i,items:o,shippingAddress:s,notes:n,language:d}=g.parse(t),h=o.reduce((e,r)=>e+r.price*r.quantity,0),x=.2*h,m=h+x+0,y=await p._.order.count(),b=`PB-${new Date().getFullYear()}-${String(y+1).padStart(3,"0")}`,f=await p._.$transaction(async e=>{let t=await e.order.create({data:{orderNumber:b,userId:r.user?.id,status:"PENDING",subtotal:h,tax:x,shipping:0,total:m,shippingAddress:JSON.stringify(s),notes:n,pcConfigId:o.find(e=>e.pcConfigId)?.pcConfigId||null,ps5ConfigId:o.find(e=>e.ps5ConfigId)?.ps5ConfigId||null}});for(let r of o)r.productId&&await e.orderItem.create({data:{orderId:t.id,productId:r.productId,quantity:r.quantity,price:r.price}});return await e.timeline.create({data:{entityType:"ORDER",entityId:t.id,title:"sq"===d?"Porosi e Krijuar":"Order Created",titleAl:"Porosi e Krijuar",description:"sq"===d?"Porosit\xeb tuaj \xebsht\xeb regjistruar me sukses dhe \xebsht\xeb duke u procesuar.":"Your order has been successfully registered and is being processed.",descriptionAl:"Porosit\xeb tuaj \xebsht\xeb regjistruar me sukses dhe \xebsht\xeb duke u procesuar.",icon:"clock"}}),await e.invoice.create({data:{invoiceNumber:`INV-${b}`,orderId:t.id,amount:m,status:"DRAFT",dueDate:new Date(Date.now()+6048e5)}}),t});try{let e=u.v.orderConfirmation(b,m,d);await (0,u.C)({to:r.user.email||s.email,subject:e.subject,html:e.html})}catch(e){console.error("Failed to send email:",e)}let v=await p._.order.findUnique({where:{id:f.id},include:{user:{select:{id:!0,name:!0,email:!0}},items:{include:{product:!0}},pcConfig:!0,ps5Config:!0,invoice:!0,timeline:{orderBy:{createdAt:"desc"}}}});return a.NextResponse.json({message:"Order created successfully",order:v},{status:201})}catch(e){if(console.error("Create order error:",e),e instanceof d.z.ZodError)return a.NextResponse.json({error:"Validation failed",details:e.errors},{status:400});return a.NextResponse.json({error:"Internal server error"},{status:500})}}let m=new o.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/orders/route",pathname:"/api/orders",filename:"route",bundlePath:"app/api/orders/route"},resolvedPagePath:"/workspace/src/app/api/orders/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:y,staticGenerationAsyncStorage:b,serverHooks:f}=m,v="/api/orders/route";function w(){return(0,n.patchFetch)({serverHooks:f,staticGenerationAsyncStorage:b})}},95456:(e,r,t)=>{t.d(r,{L:()=>a});var i=t(53797),o=t(42023),s=t.n(o),n=t(20728);let a={providers:[(0,i.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email"},password:{label:"Password",type:"password"}},async authorize(e){if(!e?.email||!e?.password)return null;try{let r=await n._.user.findUnique({where:{email:e.email}});if(!r||!r.isActive||!await s().compare(e.password,r.password))return null;return{id:r.id,email:r.email,name:r.name,role:r.role}}catch(e){return console.error("Auth error:",e),null}}})],session:{strategy:"jwt",maxAge:2592e3},callbacks:{jwt:async({token:e,user:r})=>(r&&(e.role=r?.role),e),session:async({session:e,token:r})=>(r&&(e.user.id=r.sub,e.user.role=r.role),e)},pages:{signIn:"/auth/login"},secret:process.env.NEXTAUTH_SECRET}},20471:(e,r,t)=>{t.d(r,{C:()=>o,v:()=>s});let i=t(55245).createTransport({host:process.env.EMAIL_HOST,port:parseInt(process.env.EMAIL_PORT||"587"),secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASSWORD}});async function o({to:e,subject:r,html:t,text:o}){try{let s=await i.sendMail({from:process.env.EMAIL_FROM||"Petabyte Tech <noreply@petabyte.al>",to:e,subject:r,html:t,text:o||t.replace(/<[^>]*>/g,"")});return console.log("Email sent:",s.messageId),{success:!0,messageId:s.messageId}}catch(e){return console.error("Email error:",e),{success:!1,error:e}}}let s={welcome:(e,r="sq")=>({sq:{subject:"Mir\xebsevini n\xeb Petabyte Tech!",html:`
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
        `}})[t]}},20728:(e,r,t)=>{t.d(r,{_:()=>o});let i=require("@prisma/client"),o=global.prisma||new i.PrismaClient({log:["query"]})}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),i=r.X(0,[9276,5972,2023,1790,9133,5245],()=>t(60514));module.exports=i})();