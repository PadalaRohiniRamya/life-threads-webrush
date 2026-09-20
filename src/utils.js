export const TYPE_META={music:{label:"Music",icon:"Music2",tone:"violet"},purchase:{label:"Purchases",icon:"ShoppingBag",tone:"orange"},photo:{label:"Photos",icon:"Camera",tone:"blue"},message:{label:"Messages",icon:"MessageCircle",tone:"purple"},place:{label:"Places",icon:"MapPin",tone:"cyan"},event:{label:"Events",icon:"CalendarDays",tone:"green"},search:{label:"Searches",icon:"Search",tone:"teal"},note:{label:"Notes",icon:"NotebookPen",tone:"yellow"}};
export const SOURCE_META={spotify:{label:"Spotify",icon:"Music2"},household:{label:"Household",icon:"Home"},india:{label:"Transactions",icon:"CreditCard"}};
export function dateKey(x){return x.date||x.dateTime?.slice(0,10)||""}
export function hour(x){const n=Number(String(x.time||x.dateTime?.slice(11,13)||0).slice(0,2));return Number.isFinite(n)&&n>=0&&n<24?n:0}
export function money(n){return Number.isFinite(Number(n))?new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(n)):"—"}
export function formatDate(s){if(!s)return"—";const d=new Date(`${s}T12:00:00`);return Number.isNaN(d.getTime())?s:d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
export function minutes(x){const [h,m]=(x||"00:00").split(":").map(Number);return (h||0)*60+(m||0)}
export function groupBy(arr,keyFn){const m=new Map();for(const x of arr){const k=keyFn(x);if(!m.has(k))m.set(k,[]);m.get(k).push(x)}return m}
export function topEntries(obj,n=5){return Object.entries(obj).sort((a,b)=>b[1]-a[1]).slice(0,n)}
export function searchableText(r){return r.searchText||[r.title,r.artist,r.album,r.merchant,r.category,r.subcategory,r.note,r.city,r.state,r.location,r.platform,r.date,r.time].filter(Boolean).join(" ").toLowerCase()}
export function downloadText(name,text,type="application/json"){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
