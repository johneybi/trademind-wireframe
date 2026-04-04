import React from "react";
import "./ai-aura-indicator-v2.css";

interface AiAuraIndicatorV2Props {
  size?: number; // 스케일 조정용 (기본값: 1)
  className?: string; // 추가 클래스
  variant?: "dark" | "light"; // 테마 분기
}

/**
 * TRADEMIND의 "Rational Aura" 컨셉 V2 (Vertical Trend Metaphor)
 * 기존의 둥근 입자 결합(Metaball) 디자인을 유지하면서,
 * 회전이 아닌 "상하 수직(Y축) 운동"을 강화하여 마치 주식 차트(캔들)의 오르내림처럼
 * 유기적인 상승과 하락의 텐션을 보여줍니다.
 */
export function AiAuraIndicatorV2({ size = 1, variant = "dark", className = "" }: AiAuraIndicatorV2Props) {
  return (
    <div
      className={`ai-aura-loader-v2 variant-${variant} flex items-center justify-center ${className}`}
      style={{ "--size": size } as React.CSSProperties}
    >
      {/* SVG 마스크 영역: 엉겨 붙는 Metaball 물리 효과를 상하 움직임으로 구현 */}
      <svg width="100" height="100" viewBox="0 0 100 100">
        <defs>
          <mask id="aura-clipping-v2">
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
