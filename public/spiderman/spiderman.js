// spiderman.js - Interactive Spider-Man Cursor Companion with Dynamic Multi-Angle Web Swinging

(function spidermanCompanion() {
  if (typeof window === 'undefined') return;

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
  let outEdge = 'top';

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;
  let animationFrameId;
  let isFacingLeft = false;
  let isLanding = false;
  let landingFrames = 0;

  let isWebShooting = false;
  let webShootFrames = 0;
  let webTargetX = posX;
  let webTargetY = posY;

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

  const spideyEl = document.createElement('div');
  spideyEl.id = 'spiderman-companion';
  spideyEl.setAttribute('aria-hidden', 'true');
  spideyEl.style.width = `${SPRITE_SIZE}px`;
  spideyEl.style.height = `${SPRITE_SIZE}px`;
  spideyEl.style.position = 'fixed';
  spideyEl.style.pointerEvents = 'none';
  spideyEl.style.imageRendering = 'pixelated';
  spideyEl.style.left = `${posX - SPRITE_SIZE / 2}px`;
  spideyEl.style.top = `${posY - SPRITE_SIZE / 2}px`;
  spideyEl.style.zIndex = '2147483647';
  spideyEl.style.backgroundImage = 'url(/spiderman/spiderman.png)';
  spideyEl.style.backgroundSize = `${SPRITE_SIZE * 8}px ${SPRITE_SIZE * 4}px`;
  spideyEl.style.backgroundRepeat = 'no-repeat';
  spideyEl.style.transformOrigin = '50% 60%';

  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.id = 'spiderman-web-canvas';
  svgEl.style.position = 'fixed';
  svgEl.style.top = '0';
  svgEl.style.left = '0';
  svgEl.style.width = '100vw';
  svgEl.style.height = '100vh';
  svgEl.style.pointerEvents = 'none';
  svgEl.style.zIndex = '2147483646';

  const webLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  webLine.setAttribute('stroke', '#ffffff');
  webLine.setAttribute('stroke-width', '2');
  webLine.setAttribute('stroke-linecap', 'round');
  webLine.style.filter = 'drop-shadow(0 0 3px rgba(255,255,255,0.95)) drop-shadow(0 0 6px rgba(56,189,248,0.7))';
  webLine.style.display = 'none';
  svgEl.appendChild(webLine);

  const anchorPoint = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  anchorPoint.setAttribute('r', '3.5');
  anchorPoint.setAttribute('fill', '#ffffff');
  anchorPoint.style.filter = 'drop-shadow(0 0 4px rgba(255,255,255,1))';
  anchorPoint.style.display = 'none';
  svgEl.appendChild(anchorPoint);

  const spriteSets = {
    idle: [[0, -3]],
    alert: [[-6, -3], [-7, -3]],
    crouch: [[-4, -2]],
    webShoot: [[-3, -3], [-4, -3]],
    scratchSelf: [[-3, -3], [-4, -3]],
    tired: [[-4, -2]],
    sleeping: [[0, -1], [-1, -1]],
    scratchWallN: [[0, 0], [-1, 0]],
    scratchWallS: [[-5, -3]],
    scratchWallE: [[-6, 0], [-7, 0]],
    scratchWallW: [[-4, 0], [-5, 0]],
    N: [[0, -2], [-1, -2]],
    NE: [[-2, -2], [-3, -2]],
    E: [[-5, -2], [-6, -2]],
    SE: [[-1, -3], [-2, -3]],
    S: [[-7, -2], [0, -3]],
    SW: [[-1, -3], [-2, -3]],
    W: [[-5, -2], [-6, -2]],
    NW: [[-2, -2], [-3, -2]],
  };

  function setSprite(name, frameIdx, flipX, rotationDeg) {
    const set = spriteSets[name] || spriteSets.idle;
    const sprite = set[frameIdx % set.length];
    spideyEl.style.backgroundPosition = `${sprite[0] * SPRITE_SIZE}px ${sprite[1] * SPRITE_SIZE}px`;

    if (flipX !== undefined) isFacingLeft = flipX;
    const rot = rotationDeg ? ` rotate(${rotationDeg}deg)` : '';
    spideyEl.style.transform = `${isFacingLeft ? 'scaleX(-1)' : 'scaleX(1)'}${rot}`;
  }

  function showWebLine(x1, y1, x2, y2) {
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

  function triggerWebShoot(targetX, targetY) {
    if (isSwinging) return;
    isWebShooting = true;
    webShootFrames = 0;
    webTargetX = targetX !== undefined ? targetX : (isFacingLeft ? posX - 180 : posX + 180);
    webTargetY = targetY !== undefined ? targetY : posY;
    isFacingLeft = webTargetX < posX;
    idleAnimation = null;
  }

  function startDynamicWebSwing(targetX, targetY) {
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

    if (dist < 180) {
      swingTotalFrames = 18;
      swingAnchorX = swingStartX + dx * 0.7;
      swingAnchorY = Math.max(0, Math.min(swingStartY, swingTargetY) - 120);
      swingControlX = (swingStartX + swingTargetX) / 2;
      swingControlY = (swingStartY + swingTargetY) / 2 - 30;
    } else if (dist > 450 || Math.abs(dx) > 350) {
      swingTotalFrames = 30;
      swingAnchorX = swingStartX + dx * 0.55 + (isFacingLeft ? -60 : 60);
      swingAnchorY = 0;
      swingControlX = swingStartX + dx * 0.45;
      swingControlY = Math.max(swingStartY, swingTargetY) + Math.min(160, dist * 0.28);
    } else {
      swingTotalFrames = 24;
      swingAnchorX = swingStartX + dx * 0.5;
      swingAnchorY = Math.max(0, Math.min(swingStartY, swingTargetY) - 150);
      swingControlX = (swingStartX + swingTargetX) / 2;
      swingControlY = Math.max(swingStartY, swingTargetY) + 70;
    }
  }

  function resetIdleAnimation() {
    idleAnimation = null;
    idleAnimationFrame = 0;
    hideWebLine();
  }

  function idle() {
    idleTime += 1;

    if (isLanding) {
      setSprite('crouch', 0, isFacingLeft, 0);
      landingFrames += 1;
      if (landingFrames > 6) {
        isLanding = false;
        landingFrames = 0;
      }
      return;
    }

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

    if (idleTime > 6 && Math.floor(Math.random() * 35) === 0 && idleAnimation === null) {
      const available = ['webShoot', 'sleeping'];
      if (posX < 80) available.push('scratchWallW');
      if (posY < 80) available.push('scratchWallN');
      if (posX > window.innerWidth - 80) available.push('scratchWallE');
      if (posY > window.innerHeight - 80) available.push('scratchWallS');
      idleAnimation = available[Math.floor(Math.random() * available.length)];
    }

    switch (idleAnimation) {
      case 'sleeping':
        if (idleAnimationFrame < 6) {
          setSprite('crouch', 0, isFacingLeft, 0);
          hideWebLine();
          break;
        }
        setSprite('sleeping', Math.floor(idleAnimationFrame / 4), isFacingLeft, 0);
        showWebLine(posX, 0, posX, posY - 10);
        if (idleAnimationFrame > 90) resetIdleAnimation();
        break;
      case 'webShoot':
      case 'scratchSelf': {
        setSprite('webShoot', Math.floor(idleAnimationFrame / 3), isFacingLeft, 0);
        const handX = isFacingLeft ? posX - 18 : posX + 18;
        const handY = posY + 2;
        const shootTargetX = isFacingLeft ? posX - 220 : posX + 220;
        showWebLine(handX, handY, shootTargetX, posY - 10);
        if (idleAnimationFrame > 15) resetIdleAnimation();
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

    if (isSwinging) {
      swingProgress += 1 / swingTotalFrames;
      const t = Math.min(1, swingProgress);

      prevPosX = posX;
      prevPosY = posY;

      const oneMinusT = 1 - t;
      posX =
        oneMinusT * oneMinusT * swingStartX +
        2 * oneMinusT * t * swingControlX +
        t * t * swingTargetX;
      posY =
        oneMinusT * oneMinusT * swingStartY +
        2 * oneMinusT * t * swingControlY +
        t * t * swingTargetY;

      const vx = posX - prevPosX;
      const vy = posY - prevPosY;
      let tiltAngle = 0;

      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
        const motionAngleRad = Math.atan2(vy, isFacingLeft ? -vx : vx);
        const motionAngleDeg = (motionAngleRad * 180) / Math.PI;
        tiltAngle = Math.min(Math.max(motionAngleDeg * 0.65, -38), 48);
      }

      const handX = isFacingLeft ? posX - 8 : posX + 8;
      const handY = posY - 12;
      showWebLine(swingAnchorX, swingAnchorY, handX, handY);

      const swingPose = isFacingLeft ? 'NW' : 'NE';
      setSprite(swingPose, Math.floor(frameCount / 2), isFacingLeft, tiltAngle);

      const half = SPRITE_SIZE / 2;
      spideyEl.style.left = `${posX - half}px`;
      spideyEl.style.top = `${posY - half}px`;

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
  function onAnimationFrame(timestamp) {
    if (!spideyEl.isConnected) return;
    if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
    if (timestamp - lastFrameTimestamp > 75) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    animationFrameId = window.requestAnimationFrame(onAnimationFrame);
  }

  let clickTimer = null;
  let clickCount = 0;

  const onMouseMove = (event) => {
    if (!mouseInside) {
      mouseInside = true;
      idleTime = 5;
    }
    mousePosX = event.clientX;
    mousePosY = event.clientY;
  };

  const onMouseLeave = (event) => {
    mouseInside = false;
    const x = event.clientX;
    const y = event.clientY;
    if (x <= 40) outEdge = 'left';
    else if (x >= window.innerWidth - 40) outEdge = 'right';
    else if (y >= window.innerHeight - 40) outEdge = 'bottom';
    else outEdge = 'top';
  };

  const onMouseDown = (event) => {
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

  const onDblClick = (event) => {
    if (clickTimer) clearTimeout(clickTimer);
    clickCount = 0;
    startDynamicWebSwing(event.clientX, event.clientY);
  };

  const onContextMenu = (event) => {
    triggerWebShoot(event.clientX, event.clientY);
  };

  setSprite('idle', 0, false, 0);
  document.body.appendChild(svgEl);
  document.body.appendChild(spideyEl);

  window.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);
  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('dblclick', onDblClick);
  window.addEventListener('contextmenu', onContextMenu);
  animationFrameId = window.requestAnimationFrame(onAnimationFrame);
})();
