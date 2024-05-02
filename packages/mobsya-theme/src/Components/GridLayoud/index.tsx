import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider, Layout as GridLayout } from 'react-grid-layout';

export interface ItemComponent {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
}

export interface Layout {
  [key: string]: ItemComponent[];
}

export interface Items {
  [key: string]: (props: { [key: string]: any }) => React.ReactNode;
}

export interface GridProps {
  layout: Layout;
  items: Items;
  breakpoints?: { [key: string]: number };
  cols?: { [key: string]: number };
  rowHeight?: number;
  margin?: [number, number];
}

const ResponsiveGridLayout = WidthProvider(Responsive);

const useBreakpoint = (breakpoints: { [key: string]: number }): string | undefined => {
  const [breakpoint, setBreakpoint] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const sortedBreakpoints = Object.entries(breakpoints).sort((a, b) => b[1] - a[1]);

      for (const [bpName, bpValue] of sortedBreakpoints) {
        if (width - 1 >= bpValue) {
          setBreakpoint(bpName);
          return;
        }
      }

      setBreakpoint(Object.keys(breakpoints)[Object.keys(breakpoints).length - 1]);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoints]);

  return breakpoint;
};

const useWindowHeight = (): number => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowHeight;
};

const defaultbreakpoints = { uw: 2300, hd: 1800, bg: 1600, lg: 1200, md: 996, sm: 800, xs: 480, xxs: 0 };
const defaultCols = { uw: 23, hd: 23, bg: 18, lg: 16, md: 12, sm: 9, xs: 7, xxs: 4 };

export function SimpleGridLayout({
  layout,
  items,
  breakpoints = defaultbreakpoints,
  cols = defaultCols,
  rowHeight,
  margin,
}: GridProps) {
  const currentBreakpoint = useBreakpoint(breakpoints);
  const height = useWindowHeight();

  // console.log('currentBreakpoint', currentBreakpoint);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveGridLayout
        className="layout"
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={rowHeight ?? height / 100}
        layouts={layout}
        allowOverlap
        margin={margin ?? [0, 0]}
        containerPadding={[0, 0]}
        preventCollision
        resizeHandles={['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw']}
        // onLayoutChange={(value) => console.log(value)}
        style={{ overflowX: 'hidden', overflowY: 'hidden', transform: 'none', transition: 'none' }}
        // useCSSTransforms={false}
      >
        {currentBreakpoint
          ? layout[currentBreakpoint].map((item) => (
              <div key={item.i} data-grid={item} style={{ transition: 'none' }}>
                {items[item.i] ? items[item.i]({}) : null}
              </div>
            ))
          : null}
      </ResponsiveGridLayout>
    </div>
  );
}
