import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  pulseOffset: number;
  isBeacon: boolean;
}

export const NetworkGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const radius = Math.min(width, height) * 0.48;
    const points: Point3D[] = [];
    const numPoints = 120;
    
    const beaconIndices = new Set();
    while (beaconIndices.size < 8) {
      beaconIndices.add(Math.floor(Math.random() * numPoints));
    }

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        lat: phi,
        lng: theta,
        pulseOffset: Math.random() * Math.PI * 2,
        isBeacon: beaconIndices.has(i)
      });
    }

    let rotationY = 0;
    const rotationSpeed = 0.002;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      // Subtle dark radial gradient behind the globe
      const bgGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
      bgGradient.addColorStop(0, 'rgba(246, 130, 31, 0.1)');
      bgGradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.05)');
      bgGradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw sphere outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw Latitude/Longitude Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      
      rotationY += rotationSpeed;
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      // Latitudes
      for(let i = 1; i < 6; i++) {
        const yOffset = radius * Math.cos(i * Math.PI / 6);
        const rLat = radius * Math.sin(i * Math.PI / 6);
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + yOffset, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      const projected = points.map(p => {
        const xRot = p.x * cosY - p.z * sinY;
        const zRot = p.z * cosY + p.x * sinY;
        
        const fov = 800;
        const scale = fov / (fov + zRot);
        
        return {
          x: centerX + xRot * scale,
          y: centerY + p.y * scale,
          z: zRot,
          scale,
          orig: p
        };
      });

      projected.sort((a, b) => b.z - a.z);

      ctx.lineWidth = 1.5;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        if (p1.z > 0) continue; 

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          if (p2.z > 0) continue;

          const dx = p1.orig.x - p2.orig.x;
          const dy = p1.orig.y - p2.orig.y;
          const dz = p1.orig.z - p2.orig.z;
          const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

          if (dist < radius * 0.45) {
            const opacity = Math.max(0, 1 - (dist / (radius * 0.45))) * 0.4;
            ctx.strokeStyle = `rgba(246, 130, 31, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            
            const ctrlX = (p1.x + p2.x) / 2 + (Math.abs(p1.x - p2.x) * 0.2);
            const ctrlY = (p1.y + p2.y) / 2 - (Math.abs(p1.y - p2.y) * 0.2);
            ctx.quadraticCurveTo(ctrlX, ctrlY, p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      const time = Date.now() / 1000;
      projected.forEach(p => {
        const isBack = p.z > 0;
        const alpha = isBack ? 0.05 : 0.6 + (p.scale * 0.4);
        const pulse = Math.sin(time * 2 + p.orig.pulseOffset) * 0.5 + 0.5;
        
        if (p.orig.isBeacon && !isBack) {
          ctx.fillStyle = `rgba(246, 130, 31, ${alpha + 0.2})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(246, 130, 31, ${pulse * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, (8 + pulse * 6) * p.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvasRef.current) return;
      width = canvasRef.current.clientWidth;
      height = canvasRef.current.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px]"
    />
  );
};