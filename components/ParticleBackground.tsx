import React, { useEffect, useRef } from 'react';

interface Props {
  variant?: 'dark' | 'light';
  className?: string;
}

export const ParticleBackground: React.FC<Props> = ({ variant = 'dark', className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // We need to track mouse relative to the canvas/viewport
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 200 // Radius of interaction
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleTouchMove = (event: TouchEvent) => {
       if(event.touches.length > 0) {
          const rect = canvas.getBoundingClientRect();
          mouse.x = event.touches[0].clientX - rect.left;
          mouse.y = event.touches[0].clientY - rect.top;
       }
    };

    const resize = () => {
      // Set canvas size to parent container size
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      density: number;
      length: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        
        // Velocity: Gentle drift
        this.vx = (Math.random() - 0.5) * 0.5; 
        this.vy = (Math.random() - 0.5) * 0.5;
        
        // Size: Tiny ticks (approx 0.5px - 2px width)
        this.size = Math.random() * 1.5 + 0.5; 
        
        // Shape: Short dashes/ticks
        this.length = this.size * (Math.random() * 3 + 2); 
        
        this.density = (Math.random() * 20) + 1; 

        // Dark Variant Palette (Hero Section): Neon Blues
        const darkPalette = [
          '#4285F4', // Google Blue
          '#8AB4F8', // Lighter Blue
          '#669DF6', // Mid Blue
          '#AECBFA', // Pale Blue
          '#D2E3FC', // Very Light Blue
        ];

        // Light Variant Palette (Body/White Sections): Black/Dark Greys
        // Matching "tiny black mini particles" request
        const lightPalette = [
          '#000000', // Pure Black
          '#1f2937', // Slate 800
          '#374151', // Slate 700
          '#111827', // Slate 900
          '#0f172a', // Slate 950
        ];

        const colors = variant === 'dark' ? darkPalette : lightPalette;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // --- Interaction Logic ---
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        const maxDistance = mouse.radius;
        let force = 0;
        
        if (distance < maxDistance) {
          force = (maxDistance - distance) / maxDistance;
          // Repulsion strength
          const directionX = forceDirectionX * force * this.density * 0.8;
          const directionY = forceDirectionY * force * this.density * 0.8;
          
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // --- Normal Movement ---
          this.x += this.vx;
          this.y += this.vy;
        }

        // Screen wrapping
        if (this.x < -50) this.x = canvas!.width + 50;
        if (this.x > canvas!.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas!.height + 50;
        if (this.y > canvas!.height + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        
        // Align particle with movement direction for "flow" feel
        const angle = Math.atan2(this.vy, this.vx);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle); 

        ctx.beginPath();
        
        // Draw Rounded Rectangle / Pill Shape (Dash)
        ctx.roundRect(-this.length / 2, -this.size / 2, this.length, this.size, this.size);
        
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const initParticles = () => {
      particles = [];
      // Calculate based on area
      const area = canvas!.width * canvas!.height;
      const count = Math.floor(area / 9000); 
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  );
};