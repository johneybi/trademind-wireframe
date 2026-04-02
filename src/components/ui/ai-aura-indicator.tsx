import React from "react";
import "./ai-aura-indicator.css";

interface AiAuraIndicatorProps {
  size?: number; // 스케일 조정용 (기본값: 1)
  className?: string; // 추가 클래스
  variant?: "dark" | "light"; // 테마 분기
}

/**
 * TRADEMIND의 "Rational Aura" 컨셉을 반영한 AI 반응/타이핑 인디케이터.
 * 블러와 폴리곤 마스킹을 활용하여 살아 움직이는 듯한 메쉬(Mesh) 효과를 만들어냅니다.
 */
export function AiAuraIndicator({ size = 1, variant = "dark", className = "" }: AiAuraIndicatorProps) {
  return (
    <div 
      className={`ai-aura-loader variant-${variant} flex items-center justify-center ${className}`} 
      style={{ "--size": size } as React.CSSProperties}
    >
      {/* SVG 마스크 영역: 엉겨 붙는 Metaball 물리 효과를 위해 contrast와 blur를 조합 */}
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <mask id="aura-clipping">
            <polygon points="0,0 100,0 100,100 0,100" fill="black"></polygon>
            <polygon points="25,25 75,25 50,75" fill="white"></polygon>
            <polygon points="50,25 75,75 25,75" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
            <polygon points="35,35 65,35 50,65" fill="white"></polygon>
          </mask>
        </defs>
      </svg>
      {/* 실제 그라데이션이 입혀지는 박스 */}
      <div className="aura-box"></div>
    </div>
  );
}
