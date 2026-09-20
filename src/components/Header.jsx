import Icon from "./Icon";
const nav=[['home','Overview','Compass'],['explore','Explore','BookOpen'],['threads','Threads','Network'],['stories','Stories','Sparkles'],['places','Places','Map'],['insights','Insights','BarChart3']];
export default function Header({page,setPage,dark,setDark}){
  return <header className="topbar">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <button className="brand" aria-label="LIFE//THREADS home" onClick={()=>setPage('home')}>LIFE<span>//</span>THREADS</button>
    <nav aria-label="Primary navigation">{nav.map(([id,l,i])=><button type="button" key={id} className={page===id?'active':''} aria-current={page===id?'page':undefined} onClick={()=>setPage(id)}><Icon name={i} size={15}/>{l}</button>)}</nav>
    <div className="top-actions"><button type="button" className="icon-btn" aria-label={dark?'Switch to light theme':'Switch to dark theme'} aria-pressed={!dark} onClick={()=>setDark(v=>!v)}><Icon name={dark?'Sun':'Moon'} size={16}/></button><span className="avatar" aria-label="Profile">R</span></div>
  </header>
}
