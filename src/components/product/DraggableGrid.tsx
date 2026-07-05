"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

gsap.registerPlugin(ScrollTrigger);

export interface PhysicsCardData {
  id: string;
  metric: string;
  title: string;
  label: string;
}

const SortableCard = ({ spec, isGrabbingGlobal }: { spec: PhysicsCardData, isGrabbingGlobal: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: spec.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    // Use a spring-like cubic-bezier transition for the "crazy physics" feel
    transition: transition || 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)',
    zIndex: isDragging ? 50 : 1,
  };

  const cardRef = useRef<HTMLDivElement>(null);
  
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "touch-none focus:outline-none"
      )}
    >
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className={cn(
          "cursor-grab active:cursor-grabbing p-8 rounded-2xl bg-renox-surface border border-renox-line/70 group relative overflow-hidden transition-[background-color,border-color,box-shadow,transform] duration-300",
          isDragging && "bg-renox-copper/20 border-renox-copper shadow-[0_0_40px_rgba(255,122,50,0.3)] scale-[1.05]"
        )}
      >
        {/* Mouse Glow Background Effect */}
        <div 
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
            !isGrabbingGlobal && "group-hover:opacity-100",
            isDragging && "opacity-100"
          )}
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 122, 50, 0.15), transparent 40%)`
          }}
        />
        
        <div className="relative z-10 pointer-events-none select-none">
          <p className="text-renox-copper font-mono text-sm md:text-base mb-4">{spec.metric}</p>
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-renox-ivory mb-2 leading-tight">{spec.title}</h3>
          <p className="text-renox-muted text-base md:text-lg">{spec.label}</p>
        </div>
      </div>
    </div>
  );
};

export function DraggableGrid({ cards }: { cards: PhysicsCardData[] }) {
  const [items, setItems] = useState(cards);
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires a 5px drag to start, preventing accidental clicks
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!containerRef.current) return;
    
    // GSAP ScrollTrigger Entrance Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });
    
    tl.fromTo(containerRef.current, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SortableContext 
            items={items.map(i => i.id)}
            strategy={rectSortingStrategy}
          >
            {items.map((spec) => (
              <SortableCard 
                key={spec.id} 
                spec={spec} 
                isGrabbingGlobal={activeId !== null} 
              />
            ))}
          </SortableContext>
        </div>
      </DndContext>
    </div>
  );
}
