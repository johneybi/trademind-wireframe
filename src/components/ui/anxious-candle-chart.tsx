import React from 'react';
import './anxious-candle-chart.css';

interface CandleData {
  b: string;
  h: string;
  wb: string;
  wh: string;
}

const candleData: CandleData[] = [
  { b: '7.1%', h: '18.93%', wb: '0%', wh: '31.95%' },
  { b: '26.04%', h: '2.37%', wb: '19.41%', wh: '14.91%' },
  { b: '28.64%', h: '4.5%', wb: '16.92%', wh: '21.66%' },
  { b: '31.42%', h: '3.43%', wb: '19.76%', wh: '27.93%' },
  { b: '31.42%', h: '15.44%', wb: '27.43%', wh: '28.07%' },
  { b: '46.54%', h: '0.28%', wb: '43.43%', wh: '24.38%' },
  { b: '35.86%', h: '8.7%', wb: '29.7%', wh: '24.5%' },
  { b: '11.67%', h: '24.19%', wb: '5.33%', wh: '31.83%' },
  { b: '11.83%', h: '15.1%', wb: '7.93%', wh: '24.97%' },
  { b: '27.81%', h: '12.04%', wb: '27.69%', wh: '28.17%' },
  { b: '39.85%', h: '28.25%', wb: '39.53%', wh: '28.58%' },
  { b: '70.8%', h: '6.27%', wb: '60.96%', wh: '24.84%' },
  { b: '75.8%', h: '2.71%', wb: '68.38%', wh: '31.62%' },
  { b: '67.23%', h: '8.71%', wb: '64.8%', wh: '24.97%' },
  { b: '67.81%', h: '7.85%', wb: '57.54%', wh: '27.55%' },
  { b: '70.08%', h: '6.14%', wb: '55.68%', wh: '21.83%' },
  { b: '66.39%', h: '3.69%', wb: '58.11%', wh: '26.11%' },
  { b: '64.8%', h: '9.78%', wb: '45.47%', wh: '29.61%' },
];

interface AnxiousCandleChartProps {
  variant?: 'light' | 'dark';
}

export const AnxiousCandleChart: React.FC<AnxiousCandleChartProps> = ({ variant = 'light' }) => {
  return (
    <div className={`anxious-candle-wrapper ${variant === 'dark' ? 'variant-dark' : 'variant-light'}`}>
      <div className="anxious-candle-chart">
        {candleData.map((candle, index) => {
          // 파도(wave) 딜레이 - 인덱스 비례로 차례대로 파도치며 깜박임
          const waveDelay = `${index * 0.15}s`;
          
          // 거시적 추세 변화 (Macro Drift)
          // 캔들 간 찢어짐을 방지하기 위해 랜덤 딜레이 대신 인접한 캔들과 매끄럽게 이어지는 순차 파동 딜레이 사용
          const driftDelay = `${index * -0.8}s`;
          const driftDur = `18s`; // 거대하고 느리게 변하는 18초 주기 추세 사이클

          return (
            <div
              key={index}
              className="anxious-candle"
              style={{
                // @ts-ignore - CSS Custom Properties
                '--b': candle.b,
                '--h': candle.h,
                '--wb': candle.wb,
                '--wh': candle.wh,
                '--wave-delay': waveDelay,
                '--drift-delay': driftDelay,
                '--drift-dur': driftDur,
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
};
