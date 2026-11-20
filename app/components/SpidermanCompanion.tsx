'use client';

import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface SpidermanCompanionProps {
  spriteUrl?: string;
  enabled?: boolean;
  /** Speech bubble shown when the companion is clicked. */
  greeting?: string;
}

// What Peter says when you open a page (exact path first, then its first segment)
const PAGE_LINES: Record<string, string> = {
  '/': 'back at HQ 🕸️',
  about: 'the guy behind the mask 🎭',
  projects: 'spidey-sense says: cool builds 🕷️',
  '/projects/echo': 'Echo replies faster than my web 💬',
  '/projects/serea': 'Serea talks to your PDFs 📚',
  '/projects/itantra': 'iTantra — no towers needed 📡',
  '/projects/awefill': 'forms filled… thwip! ⚡',
  '/projects/maid': 'Maid plans his whole day 🗓️',
  '/projects/jntugvcev': 'he built the college site 🏛️',
  experience: 'internships > patrol shifts 💼',
  skills: 'with great skills… 🕸️',
  blog: 'the trophy wall 🏆',
  contact: 'send up a signal 📨',
  life: 'origin story 📖',
  'beyond-classroom': 'the college arc 🎓',
  'why-ai': 'how he found AI 🤖',
  n: 'pocket dev tricks 🧰',
};
const lineFor = (path: string) => PAGE_LINES[path] ?? PAGE_LINES[path.split('/')[1]];

const PATROL_AFTER_MS = 10_000; // no mouse movement this long -> he drops to the floor and runs around

export default function SpidermanCompanion({
  spriteUrl = '/spiderman/spiderman.png',
  enabled = true,
  greeting = 'Hi, this is Peter! 👋',
}: SpidermanCompanionProps) {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);
  const triggerEntranceRef = useRef<(() => void) | null>(null);
  const sayRef = useRef<((text: string) => void) | null>(null);

  // Trigger acrobatic entrance swing on page/route change, and comment on the new page
  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      triggerEntranceRef.current?.();
      const line = lineFor(pathname);
      if (line) sayRef.current?.(line);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Clean up any existing instances
    const oldSpidey = document.getElementById('spiderman-companion');
    if (oldSpidey) oldSpidey.remove();
    const oldWeb = document.getElementById('spiderman-web-canvas');
    if (oldWeb) oldWeb.remove();

    const SPRITE_SIZE = 42;
    const speed = 12;

    let posX = Math.floor(window.innerWidth / 2);
    let posY = Math.floor(window.innerHeight / 2);
    let prevPosX = posX;
    let prevPosY = posY;
    let mousePosX = posX;
    let mousePosY = posY;
    let mouseInside = true;
    let outEdge: 'top' | 'right' | 'left' | 'bottom' = 'top';

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: string | null = null;
    let idleAnimationFrame = 0;
    let animationFrameId: number;
    let isFacingLeft = false;
    let isLanding = false;
    let landingFrames = 0;

    // Web-shooting state
    let isWebShooting = false;
    let webShootFrames = 0;
    let webTargetX = posX;
    let webTargetY = posY;

    // Dynamic Multi-Angle Web Swing State
    let isSwinging = false;
    let swingProgress = 0;
    let swingStartX = posX;
    let swingStartY = posY;
    let swingTargetX = posX;
    let swingTargetY = posY;
    let swingAnchorX = posX;
    let swingAnchorY = 0;
    let swingControlX = posX;
    let swingControlY = posY;
    let swingTotalFrames = 26;
    let swingStyle: 'high-swoop' | 'pendulum' | 'web-zip' = 'pendulum';

    // 1. Spiderman Element
    const spideyEl = document.createElement('div');
    spideyEl.id = 'spiderman-companion';
    spideyEl.setAttribute('aria-hidden', 'true');
    spideyEl.style.width = `${SPRITE_SIZE}px`;
    spideyEl.style.height = `${SPRITE_SIZE}px`;
    spideyEl.style.position = 'fixed';
    // Desktop: clickable, says hi. Touch screens: taps go through him to whatever is underneath,
    // so he never blocks a button while running along the bottom.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    spideyEl.style.pointerEvents = isTouch ? 'none' : 'auto';
    spideyEl.style.cursor = 'pointer';
    spideyEl.title = 'Spider-Man';
    spideyEl.style.imageRendering = 'pixelated';
    spideyEl.style.left = `${posX - SPRITE_SIZE / 2}px`;
    spideyEl.style.top = `${posY - SPRITE_SIZE / 2}px`;
    spideyEl.style.zIndex = '2147483647';
    spideyEl.style.backgroundImage = `url(${spriteUrl})`;
    spideyEl.style.backgroundSize = `${SPRITE_SIZE * 8}px ${SPRITE_SIZE * 4}px`;
    spideyEl.style.backgroundRepeat = 'no-repeat';
    spideyEl.style.transformOrigin = '50% 60%';

    // 1b. Speech bubble shown when he's clicked
    const bubbleEl = document.createElement('div');
    bubbleEl.id = 'spiderman-bubble';
    bubbleEl.setAttribute('role', 'status');
    Object.assign(bubbleEl.style, {
      position: 'fixed',
      zIndex: '2147483647',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      font: '600 14px/1.2 system-ui, sans-serif',
      color: '#111',
      background: '#fff',
      border: '2px solid #111',
      borderRadius: '12px',
      padding: '5px 11px',
      boxShadow: '0 6px 16px -6px rgba(0,0,0,.45)',
      transform: 'translate(-50%, -100%) scale(.6)',
      opacity: '0',
      transition: 'opacity .2s, transform .3s cubic-bezier(.34,1.5,.5,1)',
    });
    const bubbleTail = document.createElement('span');
    Object.assign(bubbleTail.style, {
      position: 'absolute',
      left: '50%',
      bottom: '-7px',
      width: '10px',
      height: '10px',
      marginLeft: '-5px',
      background: '#fff',
      borderRight: '2px solid #111',
      borderBottom: '2px solid #111',
      transform: 'rotate(45deg)',
    });
    const bubbleText = document.createElement('span');
    bubbleText.textContent = greeting;
    bubbleEl.append(bubbleText, bubbleTail);
    let bubbleVisible = false;
    let bubbleTimer: ReturnType<typeof setTimeout> | null = null;

    // 2. SVG Web Canvas for Dynamic Web Strands & Web Splats
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgEl.id = 'spiderman-web-canvas';
    svgEl.style.position = 'fixed';
    svgEl.style.top = '0';
    svgEl.style.left = '0';
    svgEl.style.width = '100vw';
    svgEl.style.height = '100vh';
    svgEl.style.pointerEvents = 'none';
    svgEl.style.zIndex = '2147483646';

    // Primary Web Line
    const webLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    webLine.setAttribute('stroke', '#ffffff');
    webLine.setAttribute('stroke-width', '2');
    webLine.setAttribute('stroke-linecap', 'round');
    webLine.style.filter = 'drop-shadow(0 0 3px rgba(255,255,255,0.95)) drop-shadow(0 0 6px rgba(244,63,94,0.75)) drop-shadow(0 0 8px rgba(56,189,248,0.5))';
    webLine.style.display = 'none';
    svgEl.appendChild(webLine);

    // Anchor Splat Point
    const anchorPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    anchorPoint.setAttribute('r', '3.5');
    anchorPoint.setAttribute('fill', '#ffffff');
    anchorPoint.style.filter = 'drop-shadow(0 0 4px rgba(255,255,255,1)) drop-shadow(0 0 6px rgba(244,63,94,0.8))';
    anchorPoint.style.display = 'none';
    svgEl.appendChild(anchorPoint);

    // Verify image with fallback
    const testImg = new Image();
    testImg.src = spriteUrl;
    testImg.onerror = () => {
      spideyEl.style.backgroundImage = 'url(/spiderman/oneko.gif)';
    };

    // 8x4 Grid coordinates for sprite animations
    const spriteSets: Record<string, number[][]> = {
      idle: [[0, -3]],
      alert: [[-6, -3], [-7, -3]], // Spider-Sense alert with wavy lines
      crouch: [[-4, -2]],          // Superhero 3-point landing crouch
      webShoot: [
        [-3, -3],                  // Web shooting thwip gesture
        [-4, -3],
      ],
      scratchSelf: [
        [-3, -3],
        [-4, -3],
      ],
      tired: [[-4, -2]],
      sleeping: [
        [0, -1],                   // Upside-down web hanging
        [-1, -1],
      ],
      scratchWallN: [              // Ceiling crawl
        [0, 0],
        [-1, 0],
      ],
      scratchWallS: [              // Floor crawl
        [-5, -3],
      ],
      scratchWallE: [              // Right wall crawl
        [-6, 0],
        [-7, 0],
      ],
      scratchWallW: [              // Left wall crawl
        [-4, 0],
        [-5, 0],
      ],
      N: [
        [0, -2],
        [-1, -2],
      ],
      NE: [
        [-2, -2],
        [-3, -2],
      ],
      E: [
        [-5, -2],
        [-6, -2],
      ],
      SE: [
        [-1, -3],
        [-2, -3],
      ],
      S: [
        [-7, -2],
        [0, -3],
      ],
      SW: [
        [-1, -3],
        [-2, -3],
      ],
      W: [
        [-5, -2],
        [-6, -2],
      ],
      NW: [
        [-2, -2],
        [-3, -2],
      ],
    };

    function setSprite(name: string, frameIdx: number, flipX?: boolean, rotationDeg?: number) {
      const set = spriteSets[name] || spriteSets.idle;
      const sprite = set[frameIdx % set.length];
      spideyEl.style.backgroundPosition = `${sprite[0] * SPRITE_SIZE}px ${
        sprite[1] * SPRITE_SIZE
      }px`;

      if (flipX !== undefined) {
        isFacingLeft = flipX;
      }
      const rot = rotationDeg ? ` rotate(${rotationDeg}deg)` : '';
      spideyEl.style.transform = `${isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)'}${rot}`;
    }

    function showWebLine(x1: number, y1: number, x2: number, y2: number) {
      webLine.setAttribute('x1', String(x1));
      webLine.setAttribute('y1', String(y1));
      webLine.setAttribute('x2', String(x2));
      webLine.setAttribute('y2', String(y2));
      webLine.style.display = 'block';

      anchorPoint.setAttribute('cx', String(x1));
      anchorPoint.setAttribute('cy', String(y1));
      anchorPoint.style.display = 'block';
    }

    function hideWebLine() {
      webLine.style.display = 'none';
      anchorPoint.style.display = 'none';
    }

    // Trigger Single Click Web Shooting Thwip
    function triggerWebShoot(targetX?: number, targetY?: number) {
      if (isSwinging) return;
      isWebShooting = true;
      webShootFrames = 0;
      webTargetX = targetX ?? (isFacingLeft ? posX - 180 : posX + 180);
      webTargetY = targetY ?? posY;
      isFacingLeft = webTargetX < posX;
      idleAnimation = null;
    }

    // Start Dynamic Multi-Angle Web Swing
    function startDynamicWebSwing(targetX: number, targetY: number) {
      isWebShooting = false;
      isSwinging = true;
      swingProgress = 0;
      swingStartX = posX;
      swingStartY = posY;
      swingTargetX = Math.min(Math.max(40, targetX), window.innerWidth - 40);
      swingTargetY = Math.min(Math.max(60, targetY), window.innerHeight - 60);

      const dx = swingTargetX - swingStartX;
      const dy = swingTargetY - swingStartY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      isFacingLeft = dx < 0;
      idleAnimation = null;

      // Decide dynamic swing style & anchor based on distance & angle:
      if (dist < 180) {
        // Short distance: Fast Web-Zip Slingshot
        swingStyle = 'web-zip';
        swingTotalFrames = 18;
        swingAnchorX = swingStartX + dx * 0.7;
        swingAnchorY = Math.max(0, Math.min(swingStartY, swingTargetY) - 120);
        swingControlX = (swingStartX + swingTargetX) / 2;
        swingControlY = (swingStartY + swingTargetY) / 2 - 30;
      } else if (dist > 450 || Math.abs(dx) > 350) {
        // High-altitude wide swooping arc
        swingStyle = 'high-swoop';
        swingTotalFrames = 30;
        // Anchor point is high up in the forward swing direction
        swingAnchorX = swingStartX + dx * 0.55 + (isFacingLeft ? -60 : 60);
        swingAnchorY = 0; // Ceiling anchor
        swingControlX = swingStartX + dx * 0.45;
        // Deep downward swooping arc
        swingControlY = Math.max(swingStartY, swingTargetY) + Math.min(160, dist * 0.28);
      } else {
        // Classic pendulum dynamic swing
        swingStyle = 'pendulum';
        swingTotalFrames = 24;
        swingAnchorX = swingStartX + dx * 0.5;
        swingAnchorY = Math.max(0, Math.min(swingStartY, swingTargetY) - 150);
        swingControlX = (swingStartX + swingTargetX) / 2;
        swingControlY = Math.max(swingStartY, swingTargetY) + 70;
      }
    }

    // Trigger Dynamic Route Change Entrance
    function triggerPageEntranceStunt() {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -30 : window.innerWidth + 30;
      const startY = Math.floor(window.innerHeight * 0.15);
      const targetX = Math.floor(window.innerWidth * (fromLeft ? 0.4 : 0.6));
      const targetY = Math.floor(window.innerHeight * 0.38);

      posX = startX;
      posY = startY;
      startDynamicWebSwing(targetX, targetY);
    }
    triggerEntranceRef.current = triggerPageEntranceStunt;

    // Keep the bubble above his head, but never off-screen
    function placeBubble() {
      const half = bubbleEl.offsetWidth / 2 + 8;
      bubbleEl.style.left = `${Math.min(Math.max(posX, half), window.innerWidth - half)}px`;
      bubbleEl.style.top = `${Math.max(posY - SPRITE_SIZE / 2 - 10, bubbleEl.offsetHeight + 16)}px`;
    }

    function say(text: string) {
      bubbleText.textContent = text;
      bubbleVisible = true;
      placeBubble();
      bubbleEl.style.opacity = '1';
      bubbleEl.style.transform = 'translate(-50%, -100%) scale(1)';
      isWebShooting = false;
      idleAnimation = null;
      idleTime = 0;
      setSprite('alert', 0, isFacingLeft, 0);
      if (bubbleTimer) clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(() => {
        bubbleVisible = false;
        bubbleEl.style.opacity = '0';
        bubbleEl.style.transform = 'translate(-50%, -100%) scale(.6)';
      }, 2600);
    }
    sayRef.current = say;

    // Idle patrol: slide down the web to the floor, then run back and forth, hopping now and then.
    // Phones have no cursor to chase, so there he goes back to running soon after a tap.
    const patrolAfterMs = isTouch ? 3000 : PATROL_AFTER_MS;
    let lastActivity = performance.now();
    let patrolling = false;
    let descending = false;
    let patrolVx = 0;
    let patrolVy = 0;
    let landFrames = 0;

    function patrol() {
      const half = SPRITE_SIZE / 2;
      const ground = window.innerHeight - half;
      if (!patrolling) {
        patrolling = true;
        descending = posY < ground - 4;
        patrolVx = posX < window.innerWidth / 2 ? 9 : -9;
        patrolVy = 0;
        landFrames = 0;
        idleAnimation = null;
        isLanding = false;
      }

      if (descending) {
        posY = Math.min(posY + 14, ground);
        setSprite('S', frameCount, isFacingLeft, 0);
        showWebLine(posX, 0, posX, posY - 12);
        if (posY >= ground) {
          descending = false;
          landFrames = 4;
          hideWebLine();
        }
      } else if (landFrames > 0) {
        landFrames -= 1;
        setSprite('crouch', 0, isFacingLeft, 0);
      } else {
        posX += patrolVx;
        if (posX < half + 8 || posX > window.innerWidth - half - 8) {
          patrolVx = -patrolVx; // turn around at the screen edge
          posX = Math.min(Math.max(half + 8, posX), window.innerWidth - half - 8);
        }
        const left = patrolVx < 0;
        if (patrolVy === 0 && Math.random() < 0.08) patrolVy = -20; // hop (~once a second)
        if (patrolVy !== 0) {
          patrolVy += 3.5;
          posY = Math.min(posY + patrolVy, ground);
          setSprite(patrolVy < 0 ? (left ? 'NW' : 'NE') : left ? 'SW' : 'SE', frameCount, left, 0);
          if (posY >= ground) {
            patrolVy = 0;
            landFrames = 2;
          }
        } else {
          setSprite(left ? 'W' : 'E', frameCount, left, 0);
        }
      }
      spideyEl.style.left = `${posX - half}px`;
      spideyEl.style.top = `${posY - half}px`;
    }

    function resetIdleAnimation() {
      idleAnimation = null;
      idleAnimationFrame = 0;
      hideWebLine();
    }

    function idle() {
      idleTime += 1;

      // 1. Superhero landing pose after swing
      if (isLanding) {
        setSprite('crouch', 0, isFacingLeft, 0);
        landingFrames += 1;
        if (landingFrames > 6) {
          isLanding = false;
          landingFrames = 0;
        }
        return;
      }

      // 2. Out-of-page behavior: hang upside down at ceiling or cling to wall
      if (!mouseInside) {
        if (outEdge === 'top') {
          setSprite('sleeping', Math.floor(frameCount / 4), isFacingLeft, 0);
          showWebLine(posX, 0, posX, posY - 10);
          return;
        } else if (outEdge === 'right') {
          setSprite('scratchWallE', Math.floor(frameCount / 3), false, 0);
          hideWebLine();
          return;
        } else if (outEdge === 'left') {
          setSprite('scratchWallW', Math.floor(frameCount / 3), true, 0);
          hideWebLine();
          return;
        } else {
          setSprite('scratchWallS', 0, isFacingLeft, 0);
          hideWebLine();
          return;
        }
      }

      // 3. Spontaneous idle stunts
      if (
        idleTime > 6 &&
        Math.floor(Math.random() * 35) === 0 &&
        idleAnimation === null
      ) {
        const availableIdleAnimations = ['webShoot', 'sleeping'];
        if (posX < 80) availableIdleAnimations.push('scratchWallW');
        if (posY < 80) availableIdleAnimations.push('scratchWallN');
        if (posX > window.innerWidth - 80) availableIdleAnimations.push('scratchWallE');
        if (posY > window.innerHeight - 80) availableIdleAnimations.push('scratchWallS');
        
        idleAnimation =
          availableIdleAnimations[
            Math.floor(Math.random() * availableIdleAnimations.length)
          ];
      }

      switch (idleAnimation) {
        case 'sleeping': // Hanging upside-down on web strand
          if (idleAnimationFrame < 6) {
            setSprite('crouch', 0, isFacingLeft, 0);
            hideWebLine();
            break;
          }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4), isFacingLeft, 0);
          showWebLine(posX, 0, posX, posY - 10);
          if (idleAnimationFrame > 90) {
            resetIdleAnimation();
          }
          break;
        case 'webShoot':
        case 'scratchSelf': {
          setSprite('webShoot', Math.floor(idleAnimationFrame / 3), isFacingLeft, 0);
          const handX = isFacingLeft ? posX - 18 : posX + 18;
          const handY = posY + 2;
          const shootTargetX = isFacingLeft ? posX - 220 : posX + 220;
          showWebLine(handX, handY, shootTargetX, posY - 10);
          if (idleAnimationFrame > 15) {
            resetIdleAnimation();
          }
          break;
        }
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
          setSprite(idleAnimation, idleAnimationFrame, isFacingLeft, 0);
          hideWebLine();
          if (idleAnimationFrame > 18) resetIdleAnimation();
          break;
        default:
          setSprite('idle', 0, isFacingLeft, 0);
          hideWebLine();
          return;
      }
      idleAnimationFrame += 1;
    }

    function frame() {
      frameCount += 1;

      // 1. Dynamic Web-Swinging Arc Physics & Multi-Angle Body Tilting
      if (isSwinging) {
        swingProgress += 1 / swingTotalFrames;
        const t = Math.min(1, swingProgress);

        prevPosX = posX;
        prevPosY = posY;

        // Quadratic Bezier Curve with Pendulum Easing
        // B(t) = (1-t)^2 * Start + 2*(1-t)*t * Control + t^2 * Target
        const oneMinusT = 1 - t;
        posX =
          oneMinusT * oneMinusT * swingStartX +
          2 * oneMinusT * t * swingControlX +
          t * t * swingTargetX;
        posY =
          oneMinusT * oneMinusT * swingStartY +
          2 * oneMinusT * t * swingControlY +
          t * t * swingTargetY;

        // Calculate dynamic velocity vector & body tilt angle
        const vx = posX - prevPosX;
        const vy = posY - prevPosY;
        let tiltAngle = 0;

        if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
          // Angle of motion trajectory
          const motionAngleRad = Math.atan2(vy, isFacingLeft ? -vx : vx);
          const motionAngleDeg = (motionAngleRad * 180) / Math.PI;
          // Smoothly tilt body with the swing arc (-35deg to +45deg)
          tiltAngle = Math.min(Math.max(motionAngleDeg * 0.65, -38), 48);
        }

        // Connect glowing web strand to hand
        const handX = isFacingLeft ? posX - 8 : posX + 8;
        const handY = posY - 12;
        showWebLine(swingAnchorX, swingAnchorY, handX, handY);

        // Pick dynamic acrobatic aerial pose
        const swingPose = isFacingLeft ? 'NW' : 'NE';
        setSprite(swingPose, Math.floor(frameCount / 2), isFacingLeft, tiltAngle);

        const half = SPRITE_SIZE / 2;
        spideyEl.style.left = `${posX - half}px`;
        spideyEl.style.top = `${posY - half}px`;

        // Finished swing: superhero landing impact!
        if (t >= 1) {
          isSwinging = false;
          hideWebLine();
          isLanding = true;
          landingFrames = 0;
          idleTime = 5;
          setSprite('crouch', 0, isFacingLeft, 0);
        }
        return;
      }

      // 2. Web-Shooting Action Lock
      if (isWebShooting) {
        webShootFrames += 1;
        setSprite('webShoot', Math.floor(webShootFrames / 3), webTargetX < posX, 0);
        const handX = isFacingLeft ? posX - 18 : posX + 18;
        const handY = posY + 2;
        showWebLine(handX, handY, webTargetX, webTargetY);

        if (webShootFrames > 10) {
          isWebShooting = false;
          webShootFrames = 0;
          hideWebLine();
        }
        return;
      }

      // 3. Nobody's moved the mouse for a while: run around the floor
      if (performance.now() - lastActivity > patrolAfterMs) {
        patrol();
        return;
      }

      // 4. Normal Movement / Chasing Target
      let destX = mousePosX;
      let destY = mousePosY;

      if (!mouseInside) {
        if (outEdge === 'top') {
          destX = posX;
          destY = 32;
        } else if (outEdge === 'right') {
          destX = window.innerWidth - 24;
          destY = posY;
        } else if (outEdge === 'left') {
          destX = 24;
          destY = posY;
        } else {
          destX = posX;
          destY = window.innerHeight - 28;
        }
      }

      const diffX = posX - destX;
      const diffY = posY - destY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < speed || distance < 48) {
        idle();
        return;
      }

      hideWebLine();
      isLanding = true;
      landingFrames = 0;
      idleAnimation = null;
      idleAnimationFrame = 0;

      // Spider-Sense Alert before running
      if (idleTime > 1) {
        setSprite('alert', frameCount, isFacingLeft, 0);
        idleTime = Math.min(idleTime, 4);
        idleTime -= 1;
        return;
      }

      let direction = '';
      direction += diffY / distance > 0.5 ? 'N' : '';
      direction += diffY / distance < -0.5 ? 'S' : '';
      direction += diffX / distance > 0.5 ? 'W' : '';
      direction += diffX / distance < -0.5 ? 'E' : '';

      const shouldFaceLeft = diffX > 0;
      setSprite(direction || 'idle', frameCount, shouldFaceLeft, 0);

      posX -= (diffX / distance) * speed;
      posY -= (diffY / distance) * speed;

      const half = SPRITE_SIZE / 2;
      posX = Math.min(Math.max(half, posX), window.innerWidth - half);
      posY = Math.min(Math.max(half, posY), window.innerHeight - half);

      spideyEl.style.left = `${posX - half}px`;
      spideyEl.style.top = `${posY - half}px`;
    }

    let lastFrameTimestamp = 0;
    function onAnimationFrame(timestamp: number) {
      if (!spideyEl.isConnected) return;
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 75) {
        lastFrameTimestamp = timestamp;
        frame();
        if (bubbleVisible) placeBubble(); // bubble follows him
      }
      animationFrameId = window.requestAnimationFrame(onAnimationFrame);
    }

    let clickTimer: NodeJS.Timeout | null = null;
    let clickCount = 0;

    const wake = () => {
      lastActivity = performance.now();
      if (patrolling) {
        patrolling = false;
        hideWebLine();
        idleTime = 5; // spider-sense tingle, then chase the cursor again
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      wake();
      if (!mouseInside) {
        mouseInside = true;
        idleTime = 5;
      }
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    const onMouseLeave = (event: MouseEvent) => {
      mouseInside = false;
      const x = event.clientX;
      const y = event.clientY;

      if (x <= 40) outEdge = 'left';
      else if (x >= window.innerWidth - 40) outEdge = 'right';
      else if (y >= window.innerHeight - 40) outEdge = 'bottom';
      else outEdge = 'top';
    };

    // Double-Click anywhere triggers Dynamic Multi-Angle Web Swing
    // Clicking Spider-Man himself says hi instead of shooting a web
    const onSpideyClick = (event: MouseEvent) => {
      event.stopPropagation();
      say(greeting);
    };

    const onMouseDown = (event: MouseEvent) => {
      wake();
      if (event.target === spideyEl) return;
      clickCount += 1;
      const targetX = event.clientX;
      const targetY = event.clientY;

      if (clickCount === 1) {
        clickTimer = setTimeout(() => {
          clickCount = 0;
          triggerWebShoot(targetX, targetY);
        }, 220);
      } else if (clickCount >= 2) {
        if (clickTimer) clearTimeout(clickTimer);
        clickCount = 0;
        startDynamicWebSwing(targetX, targetY);
      }
    };

    const onDblClick = (event: MouseEvent) => {
      if (event.target === spideyEl) return;
      if (clickTimer) clearTimeout(clickTimer);
      clickCount = 0;
      startDynamicWebSwing(event.clientX, event.clientY);
    };

    const onContextMenu = (event: MouseEvent) => {
      triggerWebShoot(event.clientX, event.clientY);
    };

    setSprite('idle', 0, false, 0);
    document.body.appendChild(svgEl);
    document.body.appendChild(spideyEl);
    document.body.appendChild(bubbleEl);
    spideyEl.addEventListener('click', onSpideyClick);

    // Initial page load dynamic entrance stunt
    triggerPageEntranceStunt();

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('dblclick', onDblClick);
    window.addEventListener('contextmenu', onContextMenu);
    animationFrameId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      if (clickTimer) clearTimeout(clickTimer);
      if (bubbleTimer) clearTimeout(bubbleTimer);
      sayRef.current = null;
      spideyEl.removeEventListener('click', onSpideyClick);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('dblclick', onDblClick);
      window.removeEventListener('contextmenu', onContextMenu);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      if (spideyEl.parentNode) spideyEl.parentNode.removeChild(spideyEl);
      if (svgEl.parentNode) svgEl.parentNode.removeChild(svgEl);
      if (bubbleEl.parentNode) bubbleEl.parentNode.removeChild(bubbleEl);
    };
  }, [enabled, spriteUrl, greeting]);

  return null;
}
