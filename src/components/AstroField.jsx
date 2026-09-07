import { useEffect, useRef } from 'react'

const GRID = 44

const CONSTELLATIONS = [
  { name: 'φ', color: 'rgba(201,173,120,0.22)', hiColor: 'rgba(201,173,120,0.52)', dot: 'rgba(233,223,201,0.85)', anchor: [0.78, 0.20], points: [[0,0],[28,-18],[52,-6],[38,22],[12,30]], links: [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]] },
  { name: 'Σ', anchor: [0.18, 0.27], color: 'rgba(198,94,46,0.18)', hiColor: 'rgba(198,94,46,0.44)', dot: 'rgba(233,223,201,0.75)', points: [[0,0],[36,0],[14,14],[32,28],[0,28]], links: [[0,1],[1,2],[2,3],[3,4]] },
  { name: '∫', anchor: [0.72, 0.72], color: 'rgba(111,143,127,0.18)', hiColor: 'rgba(111,143,127,0.42)', dot: 'rgba(233,223,201,0.75)', points: [[10,-28],[18,-14],[8,0],[-6,14],[-10,28]], links: [[0,1],[1,2],[2,3],[3,4]] },
  { name: 'π', anchor: [0.42, 0.12], color: 'rgba(173,160,140,0.14)', hiColor: 'rgba(173,160,140,0.36)', dot: 'rgba(233,223,201,0.70)', points: [[0,0],[22,0],[22,22],[0,22],[0,0],[11,0],[11,22]], links: [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6]] },
  { name: '∞', anchor: [0.52, 0.84], color: 'rgba(201,173,120,0.11)', hiColor: 'rgba(201,173,120,0.34)', dot: 'rgba(233,223,201,0.68)', points: [[-16,0],[-8,-10],[0,0],[8,10],[16,0],[8,-10],[0,0],[-8,10]], links: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]] },
]

const ORBITS = [
  { rx: 68,  ry: 46,  ecc: 0.18, tilt: -0.21, period: 9000,  color: 'rgba(198,94,46,0.24)', dot: 'rgba(198,94,46,0.98)', r: 2.8 },
  { rx: 104, ry: 70,  ecc: 0.28, tilt: 0.31,  period: 14400, color: 'rgba(201,173,120,0.16)', dot: 'rgba(233,223,201,0.92)', r: 2.3 },
  { rx: 146, ry: 98,  ecc: 0.12, tilt: -0.48, period: 21000, color: 'rgba(111,143,127,0.16)', dot: 'rgba(111,143,127,0.96)', r: 2.0 },
  { rx: 196, ry: 132, ecc: 0.34, tilt: 0.15,  period: 30000, color: 'rgba(173,160,140,0.11)', dot: 'rgba(173,160,140,0.92)', r: 1.8 },
  { rx: 248, ry: 168, ecc: 0.22, tilt: -0.28, period: 42000, color: 'rgba(201,173,120,0.08)', dot: 'rgba(233,223,201,0.62)', r: 1.5 },
  { rx: 310, ry: 210, ecc: 0.08, tilt: 0.08,  period: 56000, color: 'rgba(233,223,201,0.05)', dot: 'rgba(233,223,201,0.42)', r: 1.3 },
]

const GLYPH_SET = ['e','π','φ','Σ','∫','∞','λ','ψ','Ω','Δ','α','β','∑','∏','∂','∇','∈','√','±','≈','≠','0','1','2','9']

function solveKepler(M, e) { let E = M; for(let i=0;i<4;i++) E = E - (E - e*Math.sin(E)-M)/(1 - e*Math.cos(E)); return E }

export default function AstroField() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = 0, w=0, h=0
    const dpr = Math.min(window.devicePixelRatio||1,2)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const stars = Array.from({length: 360}, () => {
      const t=Math.random(); let col='233,223,201'
      if(t<0.11) col='201,173,120'
      else if(t<0.19) col='180,200,225'
      else if(t<0.23) col='210,150,110'
      return { nx:Math.random(), ny:Math.random(), r:0.52+Math.random()*1.15, phase:Math.random()*Math.PI*2, speed:0.45+Math.random()*1.7, base:0.28+Math.random()*0.62, col, twA:0.16+Math.random()*0.26 }
    })
    const dust = Array.from({length: 48}, () => ({ nx:Math.random(), ny:Math.random(), r:0.6+Math.random()*1.0, drift:0.04+Math.random()*0.09, phase:Math.random()*Math.PI*2 }))
    // glyphs that can be sucked by BH — huruf/angka melayang
    const glyphs = Array.from({length: 30}, () => ({
      x: Math.random(), y: Math.random(),
      ch: GLYPH_SET[Math.floor(Math.random()*GLYPH_SET.length)],
      size: 10 + Math.random()*7,
      baseA: 0.18 + Math.random()*0.22,
      drift: (Math.random()-0.5)*0.04,
      phase: Math.random()*Math.PI*2,
    }))

    let mx=0,my=0,tx=0,ty=0
    let mouseX = -9999, mouseY = -9999
    let mouseDown = false, mass = 1, massTarget = 1
    let hasMoved = false

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      hasMoved = true
      document.documentElement.classList.add('bh-active')
      if(reduce || w < 700) return
      const cx=(e.clientX/w-0.5)*2, cy=(e.clientY/h-0.5)*2
      tx=cx*12; ty=cy*10
    }
    const onDown = () => { mouseDown=true; massTarget=2.2 }
    const onUp = () => { mouseDown=false; massTarget=1 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', (e)=>{ if(e.touches[0]) onMove(e.touches[0]) }, {passive:true})
    window.addEventListener('touchstart', onDown, {passive:true})
    window.addEventListener('touchend', onUp)

    const novas=[]
    const onClick = (e) => {
      if(reduce) return
      const isBH = Math.hypot(e.clientX - mouseX, e.clientY - mouseY) < 22
      if(isBH) return
      novas.push({x:e.clientX, y:e.clientY, t0:performance.now(), dur:1400})
      if(novas.length>6) novas.shift()
    }
    window.addEventListener('click', onClick)

    let shootings=[]; let nextShoot=performance.now()+2600+Math.random()*3000
    const spawnShoot=(now)=>{
      const fromLeft=Math.random()>0.42
      shootings.push({t0:now, dur:760+Math.random()*520, x0:fromLeft?-60:w*(0.24+Math.random()*0.56), y0:h*(0.06+Math.random()*0.36), vx:(fromLeft?1:-0.68)*(640+Math.random()*360), vy:150+Math.random()*140})
      nextShoot=now+5000+Math.random()*6200
    }

    const resize=()=>{
      w=window.innerWidth; h=window.innerHeight
      canvas.width=w*dpr; canvas.height=h*dpr
      canvas.style.width=w+'px'; canvas.style.height=h+'px'
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }

    const drawWarpGrid=(cx0,cy0,bhX,bhY,bhMass)=>{
      ctx.strokeStyle='rgba(201,173,120,0.042)'; ctx.lineWidth=1; ctx.beginPath()
      for(let x=0.5;x<=w;x+=GRID){
        ctx.moveTo(x,0)
        for(let y=0;y<=h;y+=12){
          const dx=x-cx0, dy=y-cy0, dist=Math.sqrt(dx*dx+dy*dy)
          let bend=20*Math.exp(-dist/260)*(dx/(Math.abs(dx)+160))
          if(!reduce && hasMoved){
            const bdx=x-bhX, bdy=y-bhY, bd=Math.hypot(bdx,bdy)
            bend += bhMass*14*Math.exp(-bd/96)*(bdx/(Math.abs(bdx)+42))*(1-bd/260)
          }
          ctx.lineTo(x + bend*(1-Math.abs(dy)/h*0.28), y)
        }
      }
      ctx.stroke()
      ctx.beginPath()
      for(let y=0.5;y<=h;y+=GRID){
        ctx.moveTo(0,y)
        for(let x=0;x<=w;x+=12){
          const dx=x-cx0, dy=y-cy0, dist=Math.sqrt(dx*dx+dy*dy)
          let bend=20*Math.exp(-dist/260)*(dy/(Math.abs(dy)+160))
          if(!reduce && hasMoved){
            const bdx=x-bhX, bdy=y-bhY, bd=Math.hypot(bdx,bdy)
            bend += bhMass*14*Math.exp(-bd/96)*(bdy/(Math.abs(bdy)+42))*(1-bd/260)
          }
          ctx.lineTo(x, y + bend*(1-Math.abs(dx)/w*0.28))
        }
      }
      ctx.stroke()
      ctx.strokeStyle='rgba(201,173,120,0.016)'; ctx.beginPath()
      for(let x=GRID/2+0.5;x<=w;x+=GRID){ctx.moveTo(x,0); ctx.lineTo(x,h)}
      for(let y=GRID/2+0.5;y<=h;y+=GRID){ctx.moveTo(0,y); ctx.lineTo(w,y)}
      ctx.stroke()
    }

    const drawMilkyWay=(cx0,cy0)=>{
      ctx.save(); ctx.globalAlpha=0.055; ctx.translate(cx0,cy0); ctx.rotate(-0.38)
      const grad=ctx.createRadialGradient(0,0,30,0,0,Math.max(w,h)*0.62)
      grad.addColorStop(0,'rgba(233,223,201,0.11)'); grad.addColorStop(0.28,'rgba(201,173,120,0.06)'); grad.addColorStop(0.62,'rgba(111,143,127,0.03)'); grad.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=grad; ctx.beginPath(); ctx.ellipse(0,0,w*0.74,h*0.12,0,0,Math.PI*2); ctx.fill()
      ctx.strokeStyle='rgba(18,16,12,0.28)'; ctx.lineWidth=h*0.019; ctx.beginPath(); ctx.ellipse(0,0,w*0.7,h*0.048,0,0,Math.PI*2); ctx.stroke()
      ctx.fillStyle='rgba(233,223,201,0.035)'; ctx.beginPath(); ctx.ellipse(w*0.18, -h*0.012, w*0.04, h*0.02, 0,0,Math.PI*2); ctx.fill()
      ctx.beginPath(); ctx.ellipse(-w*0.12, h*0.01, w*0.03, h*0.015, 0,0,Math.PI*2); ctx.fill()
      ctx.restore()
    }

    const drawBlackHole=(bx,by,m)=>{
      // minimal — kecil, tidak dominan
      const R = 11 + m*2.6
      const inner = 7 + m*1.2
      // outer faint halo — sangat tipis
      const grad = ctx.createRadialGradient(bx,by, inner, bx,by, R*2.4)
      grad.addColorStop(0,'rgba(0,0,0,0)')
      grad.addColorStop(0.58,'rgba(201,173,120,0.04)')
      grad.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(bx,by,R*2.4,0,Math.PI*2); ctx.fill()
      // accretion disk — minimal tipis
      ctx.save(); ctx.translate(bx,by); ctx.rotate(-0.18)
      ctx.fillStyle=`rgba(198,94,46,${0.06 + m*0.015})`; ctx.strokeStyle=`rgba(201,173,120,${0.10 + m*0.02})`; ctx.lineWidth=0.7
      ctx.beginPath(); ctx.ellipse(0, 1.6, R*1.25, R*0.36, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke()
      ctx.setLineDash([2,4]); ctx.strokeStyle='rgba(201,173,120,0.13)'; ctx.lineWidth=0.5
      ctx.beginPath(); ctx.ellipse(0, 1.6, R*1.25, R*0.36, 0, Math.PI, Math.PI*2); ctx.stroke(); ctx.setLineDash([])
      ctx.restore()
      // photon ring — tipis, minimalis
      ctx.strokeStyle = mouseDown ? 'rgba(233,223,201,0.34)' : 'rgba(233,223,201,0.18)'; ctx.lineWidth = mouseDown ? 1.0 : 0.8
      ctx.beginPath(); ctx.arc(bx,by,R,0,Math.PI*2); ctx.stroke()
      // shadow
      ctx.fillStyle='rgba(8,7,6,0.98)'; ctx.beginPath(); ctx.arc(bx,by,inner,0,Math.PI*2); ctx.fill()
      ctx.strokeStyle='rgba(233,223,201,0.07)'; ctx.lineWidth=0.6; ctx.beginPath(); ctx.arc(bx,by,inner,0,Math.PI*2); ctx.stroke()
      // core dot — sangat kecil
      ctx.fillStyle='rgba(198,94,46,0.88)'; ctx.beginPath(); ctx.arc(bx,by,1.1,0,Math.PI*2); ctx.fill()
      // minimal label
      ctx.fillStyle='rgba(201,173,120,0.32)'; ctx.font='6px ui-monospace, monospace'; ctx.textAlign='center'
      ctx.fillText(mouseDown ? '◉ ×2.2' : '◉', bx, by + R + 9)
      ctx.textAlign='left'
    }

    const draw=(now)=>{
      mass += (massTarget - mass)*0.08
      ctx.clearRect(0,0,w,h)
      mx+=(tx-mx)*0.04; my+=(ty-my)*0.04
      ctx.save(); ctx.translate(mx,my)
      const cx0=w/2, cy0=h/2
      const bhX = mouseX - mx, bhY = mouseY - my

      // aizen elastic suck — seperti butiran debu kesedot, balik normal pas menjauh
      if (!reduce && hasMoved) {
        const el = document.querySelector('.aizen-frame')
        if (el) {
          const r = el.getBoundingClientRect()
          const ax = r.left + r.width/2
          const ay = r.top + r.height/2
          const dx = mouseX - ax
          const dy = mouseY - ay
          const d = Math.hypot(dx, dy)
          if (d < 260) {
            const pull = (260 - d) / 260
            const s = 1 - pull * 0.14 * mass * 0.55
            const tx = dx * 0.055 * pull * mass * 0.42
            const ty = dy * 0.055 * pull * mass * 0.42
            el.style.transform = `translate(${tx}px, ${ty}px) scale(${s})`
            el.style.filter = `brightness(${1 - pull*0.10})`
            el.style.transition = 'transform 0.12s linear, filter 0.12s linear'
          } else {
            el.style.transform = ''
            el.style.filter = ''
            el.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease'
          }
        }
      } else if (!hasMoved) {
        const el = document.querySelector('.aizen-frame')
        if (el) { el.style.transform=''; el.style.filter=''; }
      }

      drawMilkyWay(cx0,cy0)
      drawWarpGrid(cx0,cy0,bhX,bhY,mass)

      ctx.strokeStyle='rgba(201,173,120,0.11)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,cy0); ctx.lineTo(w,cy0); ctx.moveTo(cx0,0); ctx.lineTo(cx0,h); ctx.stroke()
      ctx.strokeStyle='rgba(201,173,120,0.055)'; ctx.beginPath()
      for(let x=cx0%GRID;x<w;x+=GRID){ctx.moveTo(x,cy0-4); ctx.lineTo(x,cy0+4)}
      for(let y=cy0%GRID;y<h;y+=GRID){ctx.moveTo(cx0-4,y); ctx.lineTo(cx0+4,y)}
      ctx.stroke()
      ctx.fillStyle='rgba(201,173,120,0.28)'; ctx.font='9px ui-monospace, monospace'; ctx.fillText('0,0',cx0+7,cy0-7)

      // glyphs — huruf/angka elastic kesedot BH (balik normal pas BH menjauh)
      for(const g of glyphs){
        // base drift sangat pelan (permanen tapi halus)
        g.x += g.drift*0.004
        g.y += Math.sin(now*0.0003+g.phase)*0.0006
        if(g.x<0) g.x=1; if(g.x>1) g.x=0
        if(g.y<0) g.y=1; if(g.y>1) g.y=0
        const basePx = g.x*w + mx*0.06
        const basePy = g.y*h + my*0.06
        let px = basePx
        let py = basePy
        let scale = 1
        let alpha = g.baseA + 0.08*Math.sin(now*0.0012+g.phase)
        // BH elastic pull — tidak permanen, balik pas menjauh
        if(!reduce && hasMoved){
          const dx=bhX-basePx, dy=bhY-basePy, d=Math.hypot(dx,dy)
          const horizon = 11+mass*2.6
          if(d < 150){
            const pull = mass * 0.38 * Math.exp(-d/62) // 0..0.38
            // elastic offset toward BH (tidak ubah g.x)
            px = basePx + dx * pull
            py = basePy + dy * pull
            const ang = Math.atan2(dy,dx)
            // mengecil + stretch pas dekat
            if(d < 58){
              scale = Math.max(0.42, 0.42 + (d-12)/(58-12)*0.58)
              alpha *= (0.55 + scale*0.45)
            }
            if(d < 78 && d > horizon){
              ctx.strokeStyle=`rgba(201,173,120,${alpha*0.18})`
              ctx.lineWidth=0.6
              ctx.beginPath()
              ctx.moveTo(basePx,basePy)
              ctx.lineTo(px,py)
              ctx.stroke()
              // spaghettification trail
              ctx.strokeStyle=`rgba(201,173,120,${alpha*0.10})`
              ctx.beginPath()
              ctx.moveTo(px,py)
              ctx.lineTo(px + Math.cos(ang)*(78-d)*0.22, py + Math.sin(ang)*(78-d)*0.22)
              ctx.stroke()
            }
          }
        }
        if(alpha < 0.04) continue
        ctx.save()
        ctx.translate(px,py)
        // slight rotation toward BH when close
        if(!reduce && hasMoved){
          const dx=bhX-px, dy=bhY-py, d=Math.hypot(dx,dy)
          if(d<90){
            const ang=Math.atan2(dy,dx)
            ctx.rotate(ang*0.18)
          }
        }
        ctx.scale(scale, scale)
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha))
        ctx.fillStyle = d3lq(g.ch)
        ctx.font = `${g.size}px ui-monospace, monospace`
        ctx.textAlign='center'; ctx.textBaseline='middle'
        ctx.fillText(g.ch, 0, 0)
        ctx.restore()
      }
      function d3lq(ch){
        // color by type
        if(/[0-9]/.test(ch)) return 'rgba(201,173,120,0.62)'
        if(/[πφΣ∫∞λψΩΔαβ]/.test(ch)) return 'rgba(198,94,46,0.55)'
        return 'rgba(233,223,201,0.58)'
      }

      // stars with lensing toward BH — more subtle now
      for(const s of stars){
        let x=s.nx*w, y=s.ny*h
        const dCenter=Math.hypot(x-cx0,y-cy0); if(dCenter<32) continue
        const tw=reduce?1:0.76 + s.twA*Math.sin(now*0.001*s.speed + s.phase) + 0.08*Math.cos(now*0.00037*s.speed*1.7)
        let a=Math.max(0,Math.min(1,s.base*tw))
        let px=x + mx*(0.12+s.r*0.07), py=y + my*(0.12+s.r*0.07)
        if(!reduce && hasMoved){
          const dx=bhX-px, dy=bhY-py, d=Math.hypot(dx,dy)
          if(d<220){
            const horizon=11+mass*2.6
            if(d < horizon+1.2){
              a *= 0.06
              px += dx * 0.03 * mass
              py += dy * 0.03 * mass
            } else {
              const lens = mass * 10 * Math.exp(-d/118)
              const ang = Math.atan2(dy,dx)
              px += Math.cos(ang)* lens * 0.45
              py += Math.sin(ang)* lens * 0.45
              if(d < horizon*2.1) a = Math.min(1, a*1.22 + 0.12)
            }
          }
        }
        ctx.fillStyle=`rgba(${s.col},${a})`
        ctx.beginPath(); ctx.arc(px,py,s.r,0,Math.PI*2); ctx.fill()
        if(s.r>1.22 && a>0.66){
          ctx.fillStyle=`rgba(${s.col},${a*0.10})`; ctx.beginPath(); ctx.arc(px,py,s.r*3.4,0,Math.PI*2); ctx.fill()
          if(s.r>1.52){
            ctx.strokeStyle=`rgba(${s.col},${a*0.17})`; ctx.lineWidth=0.65
            ctx.beginPath(); ctx.moveTo(px-s.r*4.0,py); ctx.lineTo(px+s.r*4.0,py); ctx.moveTo(px,py-s.r*4.0); ctx.lineTo(px,py+s.r*4.0); ctx.stroke()
          }
        }
      }

      if(!reduce){
        for(const d of dust){
          const driftX=Math.sin(now*0.00006*(1+d.drift)+d.phase)*11 + mx*0.32
          const driftY=Math.cos(now*0.00005*(1+d.drift*0.72)+d.phase)*7 + my*0.32
          let x=d.nx*w+driftX, y=d.ny*h+driftY
          if(hasMoved){
            const dx=bhX-x, dy=bhY-y, dist=Math.hypot(dx,dy)
            if(dist<160){ x+=dx*0.003*mass; y+=dy*0.003*mass }
          }
          const a=0.13+0.08*Math.sin(now*0.0008+d.phase)
          ctx.fillStyle=`rgba(201,173,120,${a})`; ctx.beginPath(); ctx.arc(x,y,d.r,0,Math.PI*2); ctx.fill()
        }
      }

      for(const c of CONSTELLATIONS){
        const ax=c.anchor[0]*w, ay=c.anchor[1]*h
        const pts=c.points.map(([dx,dy])=>[ax+dx, ay+dy])
        const distMouse=Math.hypot(mouseX-ax, mouseY-ay)
        const hover=Math.max(0,1-distMouse/170)
        const isHover=hover>0.09
        let lensedPts=pts
        if(!reduce && hasMoved){
          lensedPts=pts.map(([x,y])=>{
            const dx=bhX-x, dy=bhY-y, d=Math.hypot(dx,dy)
            if(d<120){ const f=mass*4.2*Math.exp(-d/68); return [x+dx/d*f, y+dy/d*f] }
            return [x,y]
          })
        }
        ctx.strokeStyle=isHover?c.hiColor:c.color; ctx.lineWidth=isHover?1.32:1; ctx.beginPath()
        for(const [a,b] of c.links){ctx.moveTo(lensedPts[a][0],lensedPts[a][1]); ctx.lineTo(lensedPts[b][0],lensedPts[b][1])}
        ctx.stroke()
        if(c.name==='φ' && isHover){ctx.fillStyle='rgba(201,173,120,0.05)'; ctx.beginPath(); ctx.moveTo(lensedPts[0][0],lensedPts[0][1]); for(let i=1;i<lensedPts.length;i++) ctx.lineTo(lensedPts[i][0],lensedPts[i][1]); ctx.closePath(); ctx.fill()}
        for(let i=0;i<lensedPts.length;i++){
          const [x,y]=lensedPts[i]
          const pulse=reduce?1:0.90+0.10*Math.sin(now*0.0011+i*0.9)
          ctx.fillStyle=c.dot; ctx.globalAlpha=Math.min(1,pulse+hover*0.45)
          ctx.beginPath(); ctx.arc(x,y,i===0?1.95:1.28,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1
          if(isHover && i===0){ctx.strokeStyle=c.hiColor; ctx.lineWidth=0.85; ctx.beginPath(); ctx.arc(x,y,5.4,0,Math.PI*2); ctx.stroke()}
        }
        ctx.fillStyle=isHover?'rgba(233,223,201,0.72)':'rgba(201,173,120,0.44)'; ctx.font=(isHover?'700 11px':'10px')+' ui-monospace, monospace'
        ctx.fillText(c.name, lensedPts[0][0]+10, lensedPts[0][1]-10)
        if(isHover){ctx.fillStyle='rgba(201,173,120,0.34)'; ctx.font='8px ui-monospace, monospace'; ctx.fillText('↗ hover to focus', lensedPts[0][0]+10, lensedPts[0][1]-22)}
      }

      for(let idx=0; idx<ORBITS.length; idx++){
        const o=ORBITS[idx]; ctx.save(); ctx.translate(cx0,cy0)
        const precess=reduce?0:now*0.000015*(idx%2?1:-1)*(idx+1)*0.12
        ctx.rotate(o.tilt+precess)
        const fs=o.ecc*o.rx
        ctx.strokeStyle=o.color; ctx.lineWidth=idx===0?1.12:1; ctx.beginPath(); ctx.ellipse(fs,0,o.rx,o.ry,0,0,Math.PI*2); ctx.stroke()
        ctx.fillStyle=idx===0?'rgba(198,94,46,0.56)':'rgba(201,173,120,0.20)'; ctx.beginPath(); ctx.arc(fs+o.rx,0,1.2,0,Math.PI*2); ctx.fill()
        if(o.rx>300){ctx.setLineDash([3,7]); ctx.strokeStyle='rgba(201,173,120,0.042)'; ctx.beginPath(); ctx.ellipse(fs,0,o.rx+14,o.ry+10,0,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([])}
        const M=((now%o.period)/o.period)*Math.PI*2 - Math.PI/5*idx
        const E=solveKepler((M%(Math.PI*2)+Math.PI*2)%(Math.PI*2), o.ecc)
        const px=fs+o.rx*Math.cos(E), py=o.ry*Math.sin(E)
        const behind=Math.sin(E)<-0.12
        ctx.fillStyle=behind?o.dot.replace(/[\d.]+\)$/,'0.44)'):o.dot; ctx.shadowColor=behind?'transparent':o.dot; ctx.shadowBlur=o.rx<120?9:idx<3?5:0
        ctx.beginPath(); ctx.arc(px,py,o.r,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0
        if(!reduce && idx<3){
          ctx.strokeStyle=o.color.replace('0.','0.0'); ctx.lineWidth=0.62; ctx.globalAlpha=0.16; ctx.beginPath()
          for(let t=-0.18;t<=0;t+=0.022){const Mm=M+t; const Em=solveKepler((Mm%(Math.PI*2)+Math.PI*2)%(Math.PI*2), o.ecc); const xx=fs+o.rx*Math.cos(Em), yy=o.ry*Math.sin(Em); if(t===-0.18) ctx.moveTo(xx,yy); else ctx.lineTo(xx,yy)}
          ctx.stroke(); ctx.globalAlpha=1
        }
        ctx.restore()
      }

      ctx.save(); ctx.translate(cx0,cy0); ctx.rotate(-0.38); ctx.strokeStyle='rgba(201,173,120,0.044)'; ctx.setLineDash([5,9]); ctx.lineWidth=0.9; ctx.beginPath(); ctx.ellipse(0,0,w*0.42,h*0.42,0,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]); ctx.restore()
      ctx.fillStyle='rgba(201,173,120,0.20)'; ctx.font='8px ui-monospace, monospace'; ctx.fillText('ecliptic', cx0+w*0.28, cy0-w*0.12)

      const pulse=0.88+0.12*Math.sin(now*0.0011)
      ctx.fillStyle=`rgba(198,94,46,${0.052*pulse})`; ctx.beginPath(); ctx.ellipse(cx0,cy0,22*pulse,9*pulse,0,0,Math.PI*2); ctx.fill()
      ctx.strokeStyle='rgba(198,94,46,0.13)'; ctx.lineWidth=0.7; ctx.beginPath(); ctx.ellipse(cx0,cy0,22,9,0,0,Math.PI*2); ctx.stroke()
      ctx.fillStyle='rgba(18,16,12,0.97)'; ctx.strokeStyle='rgba(198,94,46,0.58)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx0,cy0,7.4,0,Math.PI*2); ctx.fill(); ctx.stroke()
      ctx.fillStyle='rgba(198,94,46,0.94)'; ctx.beginPath(); ctx.arc(cx0,cy0,1.55,0,Math.PI*2); ctx.fill()
      ctx.strokeStyle='rgba(201,173,120,0.17)'; ctx.lineWidth=0.8; ctx.setLineDash([2,4]); ctx.beginPath(); ctx.arc(cx0,cy0,13.8,-0.34*Math.PI,0.34*Math.PI); ctx.stroke(); ctx.setLineDash([])

      const amp=54, phase=reduce?0:now*0.0005
      ctx.strokeStyle='rgba(233,223,201,0.10)'; ctx.lineWidth=1.32; ctx.beginPath()
      for(let px=0;px<=w;px+=3){const u=(px-cx0)/240, env=Math.exp(-Math.abs(u)*0.32), y=cy0-Math.sin(u+phase)*amp*env; if(px===0) ctx.moveTo(px,y); else ctx.lineTo(px,y)}
      ctx.stroke()
      ctx.strokeStyle='rgba(233,223,201,0.038)'; ctx.lineWidth=6; ctx.beginPath()
      for(let px=0;px<=w;px+=4){const u=(px-cx0)/240, y=cy0-Math.sin(u+phase)*amp*Math.exp(-Math.abs(u)*0.32); if(px===0) ctx.moveTo(px,y); else ctx.lineTo(px,y)}
      ctx.stroke()
      ctx.fillStyle='rgba(198,94,46,0.40)'; for(let k=-2;k<=2;k++){const px=cx0+k*110, u=k*0.46, y=cy0-Math.sin(u+phase)*amp*Math.exp(-Math.abs(u)*0.32); ctx.beginPath(); ctx.arc(px,y,1.75,0,Math.PI*2); ctx.fill()}

      for(let i=novas.length-1;i>=0;i--){const n=novas[i]; const p=(now-n.t0)/n.dur; if(p>=1){novas.splice(i,1); continue} const r=p*96, a=(1-p)*0.44; ctx.strokeStyle=`rgba(233,223,201,${a})`; ctx.lineWidth=1.15; ctx.beginPath(); ctx.arc(n.x-mx,n.y-my,r,0,Math.PI*2); ctx.stroke(); ctx.strokeStyle=`rgba(198,94,46,${a*0.52})`; ctx.lineWidth=0.7; ctx.beginPath(); ctx.arc(n.x-mx,n.y-my,r*0.62,0,Math.PI*2); ctx.stroke(); if(p<0.12){ctx.fillStyle=`rgba(255,255,255,${(1-p/0.12)*0.9})`; ctx.beginPath(); ctx.arc(n.x-mx,n.y-my,2.3,0,Math.PI*2); ctx.fill()}}

      if(!reduce){
        if(shootings.length<2 && now>nextShoot) spawnShoot(now)
        for(let i=shootings.length-1;i>=0;i--){const s=shootings[i]; const p=(now-s.t0)/s.dur; if(p>=1){shootings.splice(i,1); continue} const x=s.x0+s.vx*p, y=s.y0+s.vy*p+200*p*p, alpha=p<0.10?p/0.10:1-(p-0.10)/0.90, trail=22; const grad=ctx.createLinearGradient(x-s.vx*0.022*trail, y-s.vy*0.022*trail, x,y); grad.addColorStop(0,'rgba(233,223,201,0)'); grad.addColorStop(0.5,`rgba(201,173,120,${alpha*0.42})`); grad.addColorStop(1,`rgba(255,255,255,${alpha*0.98})`); ctx.strokeStyle=grad; ctx.lineWidth=1.75; ctx.beginPath(); ctx.moveTo(x-s.vx*0.019*trail, y-s.vy*0.019*trail); ctx.lineTo(x,y); ctx.stroke(); ctx.fillStyle=`rgba(255,255,255,${alpha})`; ctx.beginPath(); ctx.arc(x,y,1.7,0,Math.PI*2); ctx.fill(); ctx.fillStyle=`rgba(233,223,201,${alpha*0.17})`; ctx.beginPath(); ctx.arc(x,y,5.2,0,Math.PI*2); ctx.fill()}
      }

      if(!reduce && hasMoved && mouseX>-9000){
        drawBlackHole(bhX,bhY,mass)
      }

      const vig=ctx.createRadialGradient(cx0,cy0, Math.min(w,h)*0.42, cx0,cy0, Math.max(w,h)*0.78)
      vig.addColorStop(0,'rgba(0,0,0,0)'); vig.addColorStop(1,'rgba(6,5,4,0.34)')
      ctx.fillStyle=vig; ctx.fillRect(-mx,-my,w,h)

      ctx.restore()
    }

    const step=(now)=>{draw(now); raf=requestAnimationFrame(step)}
    resize(); draw(0); if(!reduce) raf=requestAnimationFrame(step)
    window.addEventListener('resize', resize)
    return ()=>{cancelAnimationFrame(raf); window.removeEventListener('resize',resize); window.removeEventListener('mousemove',onMove); window.removeEventListener('mousedown',onDown); window.removeEventListener('mouseup',onUp); window.removeEventListener('touchmove',onMove); window.removeEventListener('touchstart',onDown); window.removeEventListener('touchend',onUp); window.removeEventListener('click',onClick)}
  },[])
  return <canvas id="axis-field" ref={ref} aria-hidden="true" />
}
