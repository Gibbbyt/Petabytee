"use strict";(()=>{var e={};e.id=3002,e.ids=[3002],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},61282:e=>{e.exports=require("child_process")},84770:e=>{e.exports=require("crypto")},80665:e=>{e.exports=require("dns")},17702:e=>{e.exports=require("events")},92048:e=>{e.exports=require("fs")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},98216:e=>{e.exports=require("net")},19801:e=>{e.exports=require("os")},55315:e=>{e.exports=require("path")},76162:e=>{e.exports=require("stream")},82452:e=>{e.exports=require("tls")},17360:e=>{e.exports=require("url")},21764:e=>{e.exports=require("util")},71568:e=>{e.exports=require("zlib")},22024:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>v,patchFetch:()=>f,requestAsyncStorage:()=>m,routeModule:()=>x,serverHooks:()=>b,staticGenerationAsyncStorage:()=>y});var i={};t.r(i),t.d(i,{POST:()=>h});var o=t(49303),a=t(88716),s=t(60670),n=t(87070),l=t(42023),d=t.n(l),p=t(9133),c=t(20728),u=t(20471);let g=p.z.object({name:p.z.string().min(2,"Name must be at least 2 characters"),email:p.z.string().email("Invalid email address"),password:p.z.string().min(6,"Password must be at least 6 characters"),language:p.z.enum(["sq","en"]).optional().default("sq")});async function h(e){try{let r=await e.json(),{name:t,email:i,password:o,language:a}=g.parse(r);if(await c._.user.findUnique({where:{email:i}}))return n.NextResponse.json({error:"User already exists"},{status:400});let s=await d().hash(o,12),l=await c._.user.create({data:{name:t,email:i,password:s,role:"CLIENT"}}),p=u.v.welcome(t,a);await (0,u.C)({to:i,subject:p.subject,html:p.html});let{password:h,...x}=l;return n.NextResponse.json({message:"User created successfully",user:x})}catch(e){if(console.error("Registration error:",e),e instanceof p.z.ZodError)return n.NextResponse.json({error:"Validation failed",details:e.errors},{status:400});return n.NextResponse.json({error:"Internal server error"},{status:500})}}let x=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/auth/register/route",pathname:"/api/auth/register",filename:"route",bundlePath:"app/api/auth/register/route"},resolvedPagePath:"/workspace/src/app/api/auth/register/route.ts",nextConfigOutput:"",userland:i}),{requestAsyncStorage:m,staticGenerationAsyncStorage:y,serverHooks:b}=x,v="/api/auth/register/route";function f(){return(0,s.patchFetch)({serverHooks:b,staticGenerationAsyncStorage:y})}},20471:(e,r,t)=>{t.d(r,{C:()=>o,v:()=>a});let i=t(55245).createTransport({host:process.env.EMAIL_HOST,port:parseInt(process.env.EMAIL_PORT||"587"),secure:!1,auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASSWORD}});async function o({to:e,subject:r,html:t,text:o}){try{let a=await i.sendMail({from:process.env.EMAIL_FROM||"Petabyte Tech <noreply@petabyte.al>",to:e,subject:r,html:t,text:o||t.replace(/<[^>]*>/g,"")});return console.log("Email sent:",a.messageId),{success:!0,messageId:a.messageId}}catch(e){return console.error("Email error:",e),{success:!1,error:e}}}let a={welcome:(e,r="sq")=>({sq:{subject:"Mir\xebsevini n\xeb Petabyte Tech!",html:`
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
        `}})[t]}},20728:(e,r,t)=>{t.d(r,{_:()=>o});let i=require("@prisma/client"),o=global.prisma||new i.PrismaClient({log:["query"]})}};var r=require("../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),i=r.X(0,[9276,5972,2023,9133,5245],()=>t(22024));module.exports=i})();