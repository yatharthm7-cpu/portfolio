import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMoving = false;
    let timeout: NodeJS.Timeout;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      rotation: number;
      rotationSpeed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.floor(Math.random() * 8) + 4; // Square size 4 to 12
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2 - 1; // Slight upward drift
        this.opacity = 1;
        
        // Random tech/Minecraft colors (diamond blue, emerald green, gold, iron grey, redstone)
        const colors = ['#55FFFF', '#55FF55', '#FFAA00', '#AAAAAA', '#FF5555'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        
        // Draw a block (square)
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        
        // Draw a slight border for more blocky feel
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size);
        
        ctx.restore();
      }
    }

    const particles: Particle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      
      // Add multiple particles per mouse move event for a thicker trail
      for(let i=0; i<2; i++) {
          particles.push(new Particle(mouseX + (Math.random() - 0.5) * 10, mouseY + (Math.random() - 0.5) * 10));
      }
      
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Burst effect on click
      for(let i = 0; i < 20; i++) {
        const p = new Particle(mouseX, mouseY);
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 6 + 2;
        p.speedX = Math.cos(angle) * velocity;
        p.speedY = Math.sin(angle) * velocity;
        p.size = Math.floor(Math.random() * 10) + 6;
        particles.push(p);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      aria-hidden="true"
    />
  );
}
