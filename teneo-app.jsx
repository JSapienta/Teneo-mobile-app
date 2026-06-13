import { useState, useEffect, useRef, useCallback } from "react";

// ===================== GLOBAL STYLES =====================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    ::-webkit-scrollbar{display:none;}
    body{overscroll-behavior:none;}
    @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.08);opacity:.9;}}
    @keyframes pulseRing{0%{transform:scale(.8);opacity:.6;}100%{transform:scale(1.5);opacity:0;}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
    @keyframes slideUp{from{transform:translateY(100%);}to{transform:translateY(0);}}
    @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
    @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
    @keyframes blink{0%,100%{opacity:1;}50%{opacity:.55;}}
    @keyframes shimmer{0%{opacity:.6;}50%{opacity:1;}100%{opacity:.6;}}
    .fade-up{animation:fadeUp .3s ease-out;}
    .gem-float{animation:float 3s ease-in-out infinite;}
    .blink{animation:blink 2.5s ease-in-out infinite;}
    .shimmer{animation:shimmer 2s ease-in-out infinite;}
  `}</style>
);

// ===================== ICONS =====================
const TeneoLogo = () => (
  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2.5px'}}>
    {[.3,1,1,.3].map((o,i)=>(
      <div key={i} style={{width:'7px',height:'7px',borderRadius:'1.5px',background:`rgba(15,23,42,${o})`}}/>
    ))}
  </div>
);

const XIcon = ({size=17})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const DiscordIcon = ({size=18})=>(
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const GemIcon = ({size=24})=>(
  <svg width={size} height={size} viewBox="0 0 32 34" fill="none">
    <defs>
      <linearGradient id="gT" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#93C5FD"/><stop offset="100%" stopColor="#818CF8"/></linearGradient>
      <linearGradient id="gM" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366F1"/><stop offset="100%" stopColor="#4F46E5"/></linearGradient>
      <linearGradient id="gB" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4338CA"/><stop offset="100%" stopColor="#312E81"/></linearGradient>
    </defs>
    <polygon points="16,1 28,11 16,11" fill="url(#gT)" opacity=".9"/>
    <polygon points="16,1 4,11 16,11" fill="#A5B4FC" opacity=".7"/>
    <polygon points="4,11 0,17 10,24 16,11" fill="url(#gM)" opacity=".8"/>
    <polygon points="28,11 32,17 22,24 16,11" fill="url(#gM)" opacity=".9"/>
    <polygon points="0,17 10,24 16,33 16,24" fill="url(#gB)"/>
    <polygon points="32,17 22,24 16,33 16,24" fill="#4F46E5"/>
    <polygon points="10,24 22,24 16,33" fill="#6366F1"/>
    <polygon points="0,17 32,17 22,24 10,24" fill="#818CF8" opacity=".4"/>
    <polygon points="16,1 28,11 21,11 18,5" fill="white" opacity=".35"/>
  </svg>
);

// ===================== CIRCULAR PROGRESS =====================
const CircleProgress = ({pct,r=14,stroke=3,color='#10B981',bg='#F3F4F6'})=>{
  const circ=2*Math.PI*r;
  return(
    <svg width={r*2+stroke*2} height={r*2+stroke*2} viewBox={`0 0 ${r*2+stroke*2} ${r*2+stroke*2}`} style={{transform:'rotate(-90deg)'}}>
      <circle cx={r+stroke} cy={r+stroke} r={r} fill="none" stroke={bg} strokeWidth={stroke}/>
      <circle cx={r+stroke} cy={r+stroke} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ*(1-pct)}
        strokeLinecap="round" style={{transition:'stroke-dashoffset 1s'}}/>
    </svg>
  );
};

// ===================== SCREENSAVER =====================
function Screensaver({fragments,nextClaimSecs,formatTime,holdProgress,onHoldStart,onHoldEnd}){
  return(
    <div style={{background:'#000',minHeight:'100vh',display:'flex',flexDirection:'column',
      alignItems:'center',justifyContent:'center',fontFamily:"'JetBrains Mono',monospace",
      color:'#00D68F',userSelect:'none',position:'relative',overflow:'hidden'}}>
      <GlobalStyles/>
      {/* ambient glow */}
      <div style={{position:'absolute',width:'320px',height:'320px',
        background:'radial-gradient(circle,rgba(0,214,143,.05) 0%,transparent 70%)',
        borderRadius:'50%',top:'45%',left:'50%',transform:'translate(-50%,-55%)',pointerEvents:'none'}}/>

      {/* Contributing badge */}
      <div style={{border:'1.5px dashed rgba(0,214,143,.55)',borderRadius:'100px',
        padding:'10px 26px',display:'flex',alignItems:'center',gap:'10px',
        marginBottom:'40px',fontSize:'14px',letterSpacing:'.04em'}}>
        <div style={{width:'8px',height:'8px',borderRadius:'50%',
          border:'1.5px solid #00D68F',flexShrink:0,
          boxShadow:'0 0 6px rgba(0,214,143,.4)'}}/>
        Contributing
      </div>

      {/* Fragment number */}
      <div className="blink" style={{border:'1.5px dashed rgba(0,214,143,.45)',
        borderRadius:'16px',padding:'20px 44px',marginBottom:'28px',textAlign:'center'}}>
        <div style={{fontSize:'62px',fontWeight:'600',letterSpacing:'-2px',
          color:'#00D68F',lineHeight:1}}>
          {fragments.toFixed(4)}
        </div>
      </div>

      {/* Next claim */}
      <div style={{fontSize:'13px',fontWeight:'500',color:'#00D68F',
        letterSpacing:'.06em',opacity:.8}}>
        Next claim: {formatTime(nextClaimSecs)}
      </div>

      {/* Hold to exit */}
      <div style={{position:'absolute',bottom:'32px',left:'20px',right:'20px'}}>
        <button onPointerDown={onHoldStart} onPointerUp={onHoldEnd} onPointerCancel={onHoldEnd}
          style={{width:'100%',padding:'16px',background:'transparent',
            border:'1.5px dashed rgba(255,255,255,.2)',borderRadius:'12px',
            color:'rgba(255,255,255,.55)',fontFamily:"'JetBrains Mono',monospace",
            fontSize:'13px',cursor:'pointer',position:'relative',overflow:'hidden',
            transition:'border-color .2s'}}>
          {holdProgress>0&&(
            <div style={{position:'absolute',left:0,top:0,bottom:0,
              width:`${holdProgress}%`,background:'rgba(0,214,143,.12)',
              transition:'width .05s linear'}}/>
          )}
          <span style={{position:'relative',zIndex:1}}>
            {holdProgress>0?`Releasing… ${Math.round(holdProgress)}%`:'Hold to exit screensaver'}
          </span>
        </button>
      </div>
    </div>
  );
}

// ===================== CLAIM MODAL =====================
function ClaimModal({fragments,beaconBoost,onClaim,onClose}){
  const total=(fragments*beaconBoost).toFixed(4);
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',
      display:'flex',alignItems:'flex-end',justifyContent:'center',zIndex:200}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:'24px 24px 0 0',
        padding:'20px 20px 40px',width:'100%',maxWidth:'430px',
        animation:'slideUp .3s ease-out'}}>
        {/* Handle */}
        <div style={{width:'40px',height:'4px',background:'#E5E7EB',
          borderRadius:'2px',margin:'0 auto 20px'}}/>

        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <div className="gem-float" style={{display:'flex',justifyContent:'center',marginBottom:'14px'}}>
            <GemIcon size={52}/>
          </div>
          <div style={{fontSize:'44px',fontWeight:'700',color:'#0F172A',
            fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-2px'}}>
            {fragments.toFixed(4)}
          </div>
          <div style={{fontSize:'14px',color:'#6B7280',marginTop:'4px'}}>Fragments available</div>
        </div>

        <div style={{background:'#F9FAFB',borderRadius:'14px',padding:'16px 18px',marginBottom:'16px'}}>
          {[
            ['Current fragments',fragments.toFixed(4),'#0F172A'],
            ['Beacon Boost',`${beaconBoost}x`,'#8B5CF6'],
          ].map(([l,v,c],i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'13px',color:'#6B7280'}}>{l}</span>
              <span style={{fontSize:'13px',fontWeight:'600',color:c}}>{v}</span>
            </div>
          ))}
          <div style={{height:'1px',background:'#E5E7EB',margin:'12px 0'}}/>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>You receive</span>
            <span style={{fontSize:'14px',fontWeight:'700',color:'#10B981'}}>{total} 💎</span>
          </div>
        </div>

        <p style={{fontSize:'12px',color:'#9CA3AF',textAlign:'center',marginBottom:'18px'}}>
          Early claiming resets your boost timer. Max boost at scheduled claim time.
        </p>

        <button onClick={onClaim} style={{width:'100%',padding:'15px',
          background:'linear-gradient(135deg,#10B981,#059669)',
          border:'none',borderRadius:'12px',color:'#fff',fontSize:'15px',
          fontWeight:'600',cursor:'pointer',fontFamily:"'Outfit',sans-serif"}}>
          Claim Now
        </button>
        <button onClick={onClose} style={{width:'100%',padding:'12px',background:'none',
          border:'none',color:'#9CA3AF',fontSize:'14px',cursor:'pointer',marginTop:'6px',
          fontFamily:"'Outfit',sans-serif"}}>
          Cancel — wait for full boost
        </button>
      </div>
    </div>
  );
}

// ===================== STATS TAB =====================
function StatsTab({points,todayPoints,claimedFragments,fragments}){
  const [period,setPeriod]=useState('week');
  const data={
    week:[{d:'Mon',v:620},{d:'Tue',v:750},{d:'Wed',v:580},{d:'Thu',v:810},{d:'Fri',v:680},{d:'Sat',v:750},{d:'Sun',v:420}],
    month:[{d:'W1',v:4200},{d:'W2',v:5100},{d:'W3',v:3800},{d:'W4',v:5900},{d:'W5',v:2300}],
  };
  const pts=data[period];
  const maxV=Math.max(...pts.map(d=>d.v));
  return(
    <div className="fade-up" style={{padding:'16px'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px'}}>
        {[
          {label:'Total Points',val:points.toLocaleString(),sub:`+${todayPoints} today`,accent:'#F59E0B'},
          {label:'Total Fragments',val:(claimedFragments+fragments).toFixed(2),sub:`${claimedFragments} claimed`,accent:'#6366F1'},
          {label:'Days Active',val:'14',sub:'current streak 🔥',accent:'#EF4444'},
          {label:'Node Tier',val:'Tier 1',sub:'1.10x base boost',accent:'#10B981'},
        ].map((s,i)=>(
          <div key={i} style={{background:'#fff',borderRadius:'16px',padding:'16px',
            border:'1px solid #E5E7EB'}}>
            <div style={{fontSize:'11px',color:'#9CA3AF',marginBottom:'5px',letterSpacing:'.03em'}}>{s.label}</div>
            <div style={{fontSize:'22px',fontWeight:'800',color:'#0F172A',
              fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-1px'}}>{s.val}</div>
            <div style={{fontSize:'11px',color:s.accent,marginTop:'4px',fontWeight:'500'}}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart card */}
      <div style={{background:'#fff',borderRadius:'18px',padding:'18px',
        border:'1px solid #E5E7EB',marginBottom:'14px'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'18px'}}>
          <div style={{fontSize:'15px',fontWeight:'700',color:'#0F172A'}}>Points Activity</div>
          <div style={{display:'flex',gap:'4px'}}>
            {['week','month'].map(p=>(
              <button key={p} onClick={()=>setPeriod(p)} style={{
                padding:'4px 12px',borderRadius:'7px',fontSize:'11px',fontWeight:'600',
                background:period===p?'#0F172A':'#F3F4F6',
                color:period===p?'#fff':'#6B7280',border:'none',cursor:'pointer',
                fontFamily:"'Outfit',sans-serif",transition:'all .15s'}}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',alignItems:'flex-end',gap:'6px',height:'110px',marginBottom:'6px'}}>
          {pts.map((d,i)=>(
            <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'4px'}}>
              <div style={{width:'100%',height:`${(d.v/maxV)*100}px`,borderRadius:'6px 6px 3px 3px',
                background:i===pts.length-2?'linear-gradient(180deg,#10B981,#059669)':'linear-gradient(180deg,#D1FAE5,#A7F3D0)',
                transition:'height .4s ease'}}/>
              <div style={{fontSize:'10px',color:'#9CA3AF'}}>{d.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Streak banner */}
      <div style={{background:'linear-gradient(135deg,#0F172A,#1E293B)',
        borderRadius:'18px',padding:'20px 22px',display:'flex',alignItems:'center',
        justifyContent:'space-between'}}>
        <div>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,.5)',letterSpacing:'.08em',marginBottom:'4px'}}>
            CURRENT STREAK
          </div>
          <div style={{fontSize:'38px',fontWeight:'900',color:'#fff',
            fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-2px',lineHeight:1}}>
            14 🔥
          </div>
          <div style={{fontSize:'13px',color:'rgba(255,255,255,.5)',marginTop:'6px'}}>days contributing</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:'11px',color:'rgba(255,255,255,.5)',marginBottom:'4px'}}>BEST</div>
          <div style={{fontSize:'24px',fontWeight:'700',color:'#F59E0B',
            fontFamily:"'JetBrains Mono',monospace"}}>21</div>
        </div>
      </div>
    </div>
  );
}

// ===================== EARN TAB =====================
function EarnTab(){
  const [done,setDone]=useState({});
  const tasks=[
    {id:'x',icon:'𝕏',title:'Link X Account',desc:'Verify your X identity',reward:100,color:'#0F172A'},
    {id:'dc',icon:'💬',title:'Link Discord',desc:'Connect your Discord',reward:100,color:'#5865F2'},
    {id:'wl',icon:'👛',title:'Link Wallet',desc:'Bind wallet for Beacon Drop',reward:'🎟️',color:'#F59E0B'},
    {id:'ref',icon:'👥',title:'Refer a Friend',desc:'Earn 8% of their fragments',reward:'8%',color:'#10B981'},
    {id:'up',icon:'⬆️',title:'Upgrade Node',desc:'Boost base earning rate',reward:'2x',color:'#8B5CF6'},
    {id:'tw',icon:'📢',title:'Share on X',desc:'Post about Teneo',reward:50,color:'#0EA5E9'},
  ];
  return(
    <div className="fade-up" style={{padding:'16px'}}>
      <div style={{fontSize:'20px',fontWeight:'800',color:'#0F172A',marginBottom:'2px'}}>Earn More</div>
      <div style={{fontSize:'13px',color:'#6B7280',marginBottom:'20px'}}>Complete tasks to boost your fragments</div>
      {tasks.map(t=>(
        <div key={t.id} style={{background:'#fff',borderRadius:'14px',padding:'16px',
          marginBottom:'10px',border:'1px solid #E5E7EB',
          display:'flex',alignItems:'center',gap:'14px',opacity:done[t.id]?.9:1,
          transition:'opacity .2s'}}>
          <div style={{width:'46px',height:'46px',borderRadius:'12px',
            background:`${t.color}15`,display:'flex',alignItems:'center',
            justifyContent:'center',fontSize:'20px',flexShrink:0}}>{t.icon}</div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{fontSize:'14px',fontWeight:'600',color:'#0F172A'}}>{t.title}</div>
            <div style={{fontSize:'12px',color:'#6B7280',marginTop:'1px'}}>{t.desc}</div>
          </div>
          {done[t.id]?(
            <div style={{color:'#10B981',fontSize:'22px',flexShrink:0}}>✓</div>
          ):(
            <button onClick={()=>setDone(d=>({...d,[t.id]:true}))} style={{
              padding:'7px 16px',borderRadius:'9px',background:t.color,
              color:'#fff',border:'none',cursor:'pointer',
              fontSize:'13px',fontWeight:'600',flexShrink:0,
              fontFamily:"'Outfit',sans-serif",transition:'opacity .15s'}}>
              {typeof t.reward==='number'?`+${t.reward}`:t.reward}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

// ===================== SETTINGS TAB =====================
function SettingsTab(){
  const [tog,setTog]=useState({notif:true,bg:true,dark:false,boost:true,haptic:true});
  const Toggle=({k})=>(
    <div onClick={()=>setTog(t=>({...t,[k]:!t[k]}))} style={{
      width:'44px',height:'24px',background:tog[k]?'#10B981':'#D1D5DB',
      borderRadius:'100px',cursor:'pointer',position:'relative',transition:'background .2s',flexShrink:0}}>
      <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#fff',
        position:'absolute',top:'2px',left:tog[k]?'22px':'2px',
        transition:'left .2s',boxShadow:'0 1px 4px rgba(0,0,0,.2)'}}/>
    </div>
  );
  const settings=[
    {k:'notif',label:'Push Notifications',sub:'Alert me at claim time'},
    {k:'bg',label:'Run in Background',sub:'Keep contributing when closed'},
    {k:'dark',label:'Dark Screensaver',sub:'Pitch-black mode on long-hold'},
    {k:'boost',label:'Auto-Boost',sub:'Automatically apply beacon boost'},
    {k:'haptic',label:'Haptic Feedback',sub:'Vibrate on interactions'},
  ];
  return(
    <div className="fade-up" style={{padding:'16px'}}>
      <div style={{fontSize:'20px',fontWeight:'800',color:'#0F172A',marginBottom:'20px'}}>Settings</div>

      {/* Profile */}
      <div style={{background:'#fff',borderRadius:'18px',padding:'18px',
        border:'1px solid #E5E7EB',marginBottom:'14px',
        display:'flex',alignItems:'center',gap:'14px'}}>
        <div style={{width:'52px',height:'52px',borderRadius:'50%',
          background:'linear-gradient(135deg,#10B981,#059669)',
          display:'flex',alignItems:'center',justifyContent:'center',
          color:'#fff',fontSize:'22px',fontWeight:'800',flexShrink:0}}>J</div>
        <div style={{flex:1}}>
          <div style={{fontSize:'16px',fontWeight:'700',color:'#0F172A'}}>@JSapienta</div>
          <div style={{fontSize:'13px',color:'#6B7280'}}>Node active · Tier 1</div>
        </div>
        <button style={{padding:'6px 16px',background:'#F3F4F6',border:'none',
          borderRadius:'9px',color:'#374151',fontSize:'13px',fontWeight:'600',
          cursor:'pointer',fontFamily:"'Outfit',sans-serif"}}>Edit</button>
      </div>

      {/* Toggles */}
      <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E5E7EB',
        overflow:'hidden',marginBottom:'14px'}}>
        {settings.map((s,i)=>(
          <div key={s.k} style={{padding:'15px 18px',display:'flex',alignItems:'center',gap:'14px',
            borderBottom:i<settings.length-1?'1px solid #F3F4F6':'none'}}>
            <div style={{flex:1}}>
              <div style={{fontSize:'14px',fontWeight:'500',color:'#0F172A'}}>{s.label}</div>
              <div style={{fontSize:'12px',color:'#9CA3AF',marginTop:'2px'}}>{s.sub}</div>
            </div>
            <Toggle k={s.k}/>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div style={{background:'#fff',borderRadius:'18px',border:'1px solid #E5E7EB',
        overflow:'hidden',marginBottom:'20px'}}>
        {['Sign Out','Reset Node','Export Data'].map((l,i)=>(
          <div key={i} style={{padding:'14px 18px',display:'flex',alignItems:'center',
            justifyContent:'space-between',cursor:'pointer',
            borderBottom:i<2?'1px solid #F3F4F6':'none'}}>
            <span style={{fontSize:'14px',color:i===1?'#EF4444':'#374151',fontWeight:'500'}}>{l}</span>
            <span style={{color:'#D1D5DB',fontSize:'16px'}}>›</span>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center',color:'#CBD5E1',fontSize:'12px'}}>
        Teneo v2.4.1 · Beta · Build 2026.05.30
      </div>
    </div>
  );
}

// ===================== HOME TAB =====================
function HomeTab({fragments,points,todayPoints,claimedFragments,beaconBoost,
  heartbeatSecs,nextClaimSecs,nextPointsPreview,formatTime,holdProgress,
  onHoldStart,onHoldEnd,onOpenClaim,lastUpdated}){

  const heartPct=1-(heartbeatSecs/(15*60));

  return(
    <>
      {/* Promo Cards - horizontal scroll */}
      <div style={{overflowX:'auto',padding:'14px 14px 4px',display:'flex',gap:'12px',
        scrollbarWidth:'none',WebkitOverflowScrolling:'touch'}}>
        {[
          {icon:'👥',title:'Refer & Earn',sub:'Earn 8% bonus on their fragments & more',
           action:'Get Bonus Fragments',accentColor:'#FBBF24',badge:null},
          {icon:'🔗',title:'Link your socials',sub:'Verify X and Discord, 100 fragments each',
           action:'Up to 200 fragments',accentColor:'#10B981',badge:'NEW'},
          {icon:'👛',title:'Link your wallet',sub:'Bind a wallet to receive Beacon Drop payouts',
           action:'Collect tickets to win',accentColor:'#60A5FA',badge:null},
        ].map((c,i)=>(
          <div key={i} style={{minWidth:'260px',background:'linear-gradient(145deg,#0F172A,#1E293B)',
            borderRadius:'18px',padding:'18px 18px 16px',flexShrink:0,cursor:'pointer',
            border:'1px solid rgba(255,255,255,.06)',
            boxShadow:'0 4px 20px rgba(0,0,0,.12)'}}>
            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'10px'}}>
              <span style={{fontSize:'22px'}}>{c.icon}</span>
              {c.badge&&(
                <span style={{background:'#10B981',color:'#fff',fontSize:'9px',fontWeight:'800',
                  padding:'3px 9px',borderRadius:'100px',letterSpacing:'.08em'}}>{c.badge}</span>
              )}
            </div>
            <div style={{fontSize:'15px',fontWeight:'700',color:'#fff',marginBottom:'6px'}}>{c.title}</div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,.55)',marginBottom:'14px',lineHeight:'1.5'}}>{c.sub}</div>
            <div style={{fontSize:'12px',fontWeight:'700',color:c.accentColor,display:'flex',alignItems:'center',gap:'5px'}}>
              {c.action} <span style={{fontSize:'11px',opacity:.8}}>↗</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Row */}
      <div style={{padding:'10px 14px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
        {/* Points */}
        <div style={{background:'#fff',borderRadius:'18px',padding:'16px',border:'1px solid #E5E7EB',
          boxShadow:'0 1px 4px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'5px',marginBottom:'8px'}}>
            <span style={{fontSize:'13px'}}>✦</span>
            <span style={{fontSize:'10px',fontWeight:'800',color:'#F59E0B',letterSpacing:'.08em'}}>
              TENEO POINTS
            </span>
          </div>
          <div style={{fontSize:'28px',fontWeight:'900',color:'#0F172A',
            fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-1.5px',lineHeight:1}}>
            {points.toLocaleString()}
          </div>
          <div style={{fontSize:'12px',color:'#10B981',marginTop:'5px',fontWeight:'600'}}>+{todayPoints} today</div>
        </div>

        {/* Heartbeat */}
        <div style={{background:'#fff',borderRadius:'18px',padding:'16px',border:'1px solid #E5E7EB',
          boxShadow:'0 1px 4px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div style={{fontSize:'10px',color:'#9CA3AF',letterSpacing:'.04em',marginBottom:'5px'}}>Heartbeat</div>
              <div style={{fontSize:'20px',fontWeight:'800',color:'#0F172A',
                fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-1px',lineHeight:1}}>
                {formatTime(heartbeatSecs)}
              </div>
              <div style={{fontSize:'10px',color:'#9CA3AF',marginTop:'8px',marginBottom:'2px'}}>Next points</div>
              <div style={{fontSize:'17px',fontWeight:'800',color:'#F59E0B',
                fontFamily:"'JetBrains Mono',monospace"}}>+{nextPointsPreview}</div>
            </div>
            <CircleProgress pct={heartPct}/>
          </div>
        </div>
      </div>

      {/* Contributing */}
      <div style={{padding:'0 14px 10px'}}>
        <div style={{background:'#F0FDF4',borderRadius:'14px',padding:'13px 18px',
          display:'flex',alignItems:'center',gap:'10px',
          border:'1px solid #BBF7D0'}}>
          <div style={{position:'relative',flexShrink:0}}>
            <div style={{position:'absolute',inset:'-4px',borderRadius:'50%',
              background:'rgba(16,185,129,.25)',animation:'pulseRing 2s ease-out infinite'}}/>
            <div style={{width:'10px',height:'10px',borderRadius:'50%',
              background:'#10B981',position:'relative',zIndex:1,
              boxShadow:'0 0 8px rgba(16,185,129,.5)'}}/>
          </div>
          <span style={{fontSize:'15px',fontWeight:'700',color:'#059669'}}>Contributing</span>
          <span style={{marginLeft:'auto',fontSize:'12px',color:'#6EE7B7',fontWeight:'500'}}>
            Active Node ↑
          </span>
        </div>
      </div>

      {/* Fragment Counter */}
      <div style={{padding:'0 14px 10px'}}>
        <div style={{background:'#fff',borderRadius:'22px',padding:'24px 20px 20px',
          border:'1px solid #E5E7EB',textAlign:'center',
          boxShadow:'0 2px 12px rgba(0,0,0,.05)'}}>
          <div className="gem-float" style={{display:'inline-flex',marginBottom:'14px'}}>
            <GemIcon size={44}/>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',
            marginBottom:'20px'}}>
            <div style={{fontSize:'52px',fontWeight:'800',color:'#0F172A',
              fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-3px',lineHeight:1}}>
              {fragments.toFixed(4)}
            </div>
            <GemIcon size={30}/>
          </div>

          {/* Next Claim button */}
          <button onClick={onOpenClaim} style={{width:'100%',padding:'14px 16px',
            background:'#F8FAFC',border:'1.5px solid #E2E8F0',borderRadius:'14px',
            cursor:'pointer',fontFamily:"'Outfit',sans-serif",transition:'background .15s'}}>
            <div style={{fontSize:'14px',fontWeight:'700',color:'#334155'}}>
              Next Claim & Boost: {formatTime(nextClaimSecs)}
            </div>
            <div style={{fontSize:'12px',color:'#94A3B8',marginTop:'3px'}}>
              Tap to claim early or view stats
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Stats */}
      <div style={{padding:'0 14px 10px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
        {/* Claimed Fragments */}
        <div style={{background:'#fff',borderRadius:'18px',padding:'18px',
          border:'1px solid #E5E7EB'}}>
          <div style={{fontSize:'10px',fontWeight:'700',color:'#9CA3AF',
            letterSpacing:'.08em',marginBottom:'12px',textTransform:'uppercase'}}>
            Claimed Fragments
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <GemIcon size={32}/>
            <div style={{fontSize:'26px',fontWeight:'900',color:'#0F172A',
              fontFamily:"'JetBrains Mono',monospace",letterSpacing:'-1px'}}>
              {claimedFragments.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Beacon Boost */}
        <div style={{background:'#fff',borderRadius:'18px',padding:'18px',
          border:'1px solid #E5E7EB'}}>
          <div style={{fontSize:'10px',fontWeight:'700',color:'#9CA3AF',
            letterSpacing:'.08em',marginBottom:'12px',textTransform:'uppercase'}}>
            Beacon Boost
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3px'}}>
              {[0,1,2,3].map(i=>(
                <div key={i} style={{width:'10px',height:'10px',borderRadius:'2px',
                  background:i<Math.ceil((beaconBoost-.9)*10)?'#F59E0B':'#E5E7EB'}}/>
              ))}
            </div>
            <div style={{fontSize:'26px',fontWeight:'900',color:'#F59E0B',
              fontFamily:"'JetBrains Mono',monospace"}}>
              {beaconBoost}x
            </div>
          </div>
        </div>
      </div>

      {/* Screensaver Button */}
      <div style={{padding:'0 14px 8px'}}>
        <button onPointerDown={onHoldStart} onPointerUp={onHoldEnd} onPointerCancel={onHoldEnd}
          style={{width:'100%',padding:'15px 18px',background:'#0F172A',
            border:'none',borderRadius:'16px',cursor:'pointer',
            fontFamily:"'Outfit',sans-serif",position:'relative',overflow:'hidden',
            textAlign:'left'}}>
          {holdProgress>0&&(
            <div style={{position:'absolute',left:0,top:0,bottom:0,
              width:`${holdProgress}%`,background:'rgba(16,185,129,.18)',
              transition:'width .05s linear'}}/>
          )}
          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontSize:'14px',fontWeight:'600',color:'#10B981'}}>
              Running in background — hold for screensaver
            </div>
            <div style={{fontSize:'11px',color:'rgba(255,255,255,.4)',marginTop:'2px'}}>
              You can close this screen, or hold for pitch-black mode
            </div>
          </div>
        </button>
      </div>

      {/* Last updated */}
      <div style={{textAlign:'center',paddingBottom:'8px',
        fontSize:'12px',color:'#CBD5E1'}}>
        Last Updated: {lastUpdated}
      </div>
    </>
  );
}

// ===================== MAIN APP =====================
export default function TeneoApp(){
  const [fragments,setFragments]=useState(0.5054);
  const [points,setPoints]=useState(218375);
  const [todayPoints]=useState(750);
  const [claimedFragments,setClaimedFragments]=useState(182.5);
  const [beaconBoost]=useState(1.10);
  const [heartbeatSecs,setHeartbeatSecs]=useState(11*60+49);
  const [nextClaimSecs,setNextClaimSecs]=useState(7*3600+56*60);
  const [nextPointsPreview]=useState(31.8);
  const [isScreensaver,setIsScreensaver]=useState(false);
  const [activeTab,setActiveTab]=useState('home');
  const [holdProgress,setHoldProgress]=useState(0);
  const [showClaimModal,setShowClaimModal]=useState(false);
  const [refreshSpin,setRefreshSpin]=useState(false);
  const holdRef=useRef(null);
  const holdTargetRef=useRef(null);

  const formatTime=useCallback((secs)=>{
    const h=Math.floor(secs/3600),m=Math.floor((secs%3600)/60),s=secs%60;
    if(h>0)return`${h}h ${m.toString().padStart(2,'0')}m`;
    return`${m}m ${s.toString().padStart(2,'0')}s`;
  },[]);

  useEffect(()=>{
    const t=setInterval(()=>{
      setHeartbeatSecs(v=>v<=0?15*60:v-1);
      setNextClaimSecs(v=>Math.max(0,v-1));
      setFragments(f=>parseFloat((f+0.0001).toFixed(4)));
    },1000);
    return()=>clearInterval(t);
  },[]);

  const startHold=useCallback((target)=>{
    holdTargetRef.current=target;
    let p=0;
    holdRef.current=setInterval(()=>{
      p=Math.min(100,p+4);
      setHoldProgress(p);
      if(p>=100){
        clearInterval(holdRef.current);
        setHoldProgress(0);
        if(target==='enter')setIsScreensaver(true);
        else setIsScreensaver(false);
      }
    },50);
  },[]);

  const endHold=useCallback(()=>{
    clearInterval(holdRef.current);
    setHoldProgress(0);
  },[]);

  const handleClaim=()=>{
    const earned=parseFloat((fragments*beaconBoost).toFixed(4));
    setClaimedFragments(c=>parseFloat((c+earned).toFixed(4)));
    setFragments(0.0000);
    setNextClaimSecs(8*3600);
    setShowClaimModal(false);
  };

  if(isScreensaver)return(
    <>
      <GlobalStyles/>
      <Screensaver fragments={fragments} nextClaimSecs={nextClaimSecs}
        formatTime={formatTime} holdProgress={holdProgress}
        onHoldStart={()=>startHold('exit')} onHoldEnd={endHold}/>
    </>
  );

  const tabs=[
    {id:'home',label:'Home',
     icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>},
    {id:'stats',label:'Stats',
     icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>},
    {id:'earn',label:'Earn',
     icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>},
    {id:'settings',label:'Settings',
     icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>},
  ];

  return(
    <>
      <GlobalStyles/>
      <div style={{fontFamily:"'Outfit',sans-serif",background:'#F5F7FA',
        minHeight:'100vh',maxWidth:'430px',margin:'0 auto',
        display:'flex',flexDirection:'column',position:'relative'}}>

        {/* HEADER */}
        <div style={{background:'#fff',padding:'13px 16px',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          borderBottom:'1px solid #F0F0F0',position:'sticky',top:0,zIndex:50,
          boxShadow:'0 1px 8px rgba(0,0,0,.04)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <TeneoLogo/>
            <span style={{fontWeight:'900',fontSize:'19px',letterSpacing:'-0.7px',color:'#0F172A'}}>
              teneo
            </span>
            <span style={{fontSize:'9px',fontWeight:'800',color:'#94A3B8',
              background:'#F1F5F9',padding:'2px 7px',borderRadius:'4px',letterSpacing:'.1em'}}>
              BETA
            </span>
          </div>
          <div style={{display:'flex',gap:'14px',alignItems:'center'}}>
            <button style={{background:'none',border:'none',cursor:'pointer',color:'#0F172A',
              display:'flex',alignItems:'center'}}><XIcon/></button>
            <button style={{background:'none',border:'none',cursor:'pointer',color:'#5865F2',
              display:'flex',alignItems:'center'}}><DiscordIcon/></button>
            <button onClick={()=>{setRefreshSpin(true);setTimeout(()=>setRefreshSpin(false),600);}}
              style={{background:'none',border:'none',cursor:'pointer',color:'#374151',
                display:'flex',alignItems:'center'}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" style={{animation:refreshSpin?'spin .6s linear':'none'}}>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M8 16H3v5"/>
              </svg>
            </button>
            <button onClick={()=>setActiveTab('settings')}
              style={{background:'none',border:'none',cursor:'pointer',color:'#374151',
                display:'flex',alignItems:'center'}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{flex:1,overflowY:'auto',paddingBottom:'72px'}}>
          {activeTab==='home'&&(
            <HomeTab
              fragments={fragments} points={points} todayPoints={todayPoints}
              claimedFragments={claimedFragments} beaconBoost={beaconBoost}
              heartbeatSecs={heartbeatSecs} nextClaimSecs={nextClaimSecs}
              nextPointsPreview={nextPointsPreview} formatTime={formatTime}
              holdProgress={holdProgress}
              onHoldStart={()=>startHold('enter')} onHoldEnd={endHold}
              onOpenClaim={()=>setShowClaimModal(true)}
              lastUpdated="30 May, 14:59"
            />
          )}
          {activeTab==='stats'&&(
            <StatsTab points={points} todayPoints={todayPoints}
              claimedFragments={claimedFragments} fragments={fragments}/>
          )}
          {activeTab==='earn'&&<EarnTab/>}
          {activeTab==='settings'&&<SettingsTab/>}
        </div>

        {/* BOTTOM NAV */}
        <div style={{position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',
          width:'100%',maxWidth:'430px',background:'#fff',
          borderTop:'1px solid #F0F0F0',display:'flex',
          padding:'8px 0 20px',zIndex:50,
          boxShadow:'0 -2px 16px rgba(0,0,0,.06)'}}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{
              flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',
              background:'none',border:'none',cursor:'pointer',padding:'4px 0',
              color:activeTab===tab.id?'#10B981':'#9CA3AF',
              fontFamily:"'Outfit',sans-serif",transition:'color .2s',
              position:'relative'}}>
              {activeTab===tab.id&&(
                <div style={{position:'absolute',top:'-8px',left:'50%',
                  transform:'translateX(-50%)',width:'28px',height:'2.5px',
                  background:'#10B981',borderRadius:'2px'}}/>
              )}
              {tab.icon}
              <span style={{fontSize:'10px',fontWeight:activeTab===tab.id?'700':'400',
                letterSpacing:'.02em'}}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* CLAIM MODAL */}
        {showClaimModal&&(
          <ClaimModal
            fragments={fragments} beaconBoost={beaconBoost}
            onClaim={handleClaim} onClose={()=>setShowClaimModal(false)}/>
        )}
      </div>
    </>
  );
}
