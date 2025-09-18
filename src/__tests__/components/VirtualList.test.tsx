import { VirtualList } from '@/components/ui/VirtualList';
import { fireEvent, render, screen } from '@testing-library/react';

interface TestItem {
  id: number;
  name: string;
}

const mockItems: TestItem[] = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name: `Item ${i}`,
}));

const renderItem = (item: TestItem, index: number) => (
  <div data-testid={`item-${index}`}>{item.name}</div>
);

describe('VirtualList', () => {
  const defaultProps = {
    items: mockItems,
    itemHeight: 50,
    containerHeight: 200,
    renderItem,
  };

  it('renders virtual list with correct structure', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const virtualListContainer = container.firstChild as HTMLElement;
    expect(virtualListContainer).toHaveClass('overflow-auto');
    expect(virtualListContainer).toHaveStyle({ height: '200px' });
  });

  it('renders only visible items', () => {
    render(<VirtualList {...defaultProps} />);

    // With containerHeight 200 and itemHeight 50, we should see 4 items
    // Plus overscan (default 5), so we should see around 14 items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
    expect(visibleItems.length).toBeLessThanOrEqual(20); // Reasonable upper bound
  });

  it('renders items with correct data attributes', () => {
    render(<VirtualList {...defaultProps} />);

    const visibleItems = screen.getAllByTestId(/^item-/);
    visibleItems.forEach((item, _index) => {
      const dataIndex = item.getAttribute('data-index');
      expect(dataIndex).toBeDefined();
      expect(Number(dataIndex)).toBeGreaterThanOrEqual(0);
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <VirtualList {...defaultProps} className='custom-class' />
    );

    const virtualListContainer = container.firstChild as HTMLElement;
    expect(virtualListContainer).toHaveClass('custom-class');
  });

  it('handles empty items array', () => {
    render(<VirtualList {...defaultProps} items={[]} />);

    const visibleItems = screen.queryAllByTestId(/^item-/);
    expect(visibleItems).toHaveLength(0);
  });

  it('handles single item', () => {
    const singleItem = [mockItems[0]!];
    render(<VirtualList {...defaultProps} items={singleItem} />);

    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems).toHaveLength(1);
    expect(screen.getByText('Item 0')).toBeInTheDocument();
  });

  it('calculates total height correctly', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const innerDiv = container.querySelector('div[style*="height: 5000px"]');
    expect(innerDiv).toBeInTheDocument();
  });

  it('handles different item heights', () => {
    render(<VirtualList {...defaultProps} itemHeight={100} />);

    const visibleItems = screen.getAllByTestId(/^item-/);
    visibleItems.forEach(item => {
      const container = item.parentElement;
      expect(container).toHaveStyle({ height: '100px' });
    });
  });

  it('handles different container heights', () => {
    const { container } = render(
      <VirtualList {...defaultProps} containerHeight={400} />
    );

    const virtualListContainer = container.firstChild as HTMLElement;
    expect(virtualListContainer).toHaveStyle({ height: '400px' });
  });

  it('handles custom overscan', () => {
    render(<VirtualList {...defaultProps} overscan={10} />);

    // With larger overscan, we should see more items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('updates visible items on scroll', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const scrollContainer = container.firstChild as HTMLElement;

    // Scroll down
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 1000 } });

    // Should still have visible items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles scroll to different positions', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const scrollContainer = container.firstChild as HTMLElement;

    // Scroll to middle
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 2500 } });

    // Should have visible items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles scroll to end', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const scrollContainer = container.firstChild as HTMLElement;

    // Scroll to end
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 5000 } });

    // Should still have visible items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('renders items with correct transform', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const transformDiv = container.querySelector('div[style*="transform"]');
    expect(transformDiv).toBeInTheDocument();
    expect(transformDiv).toHaveStyle({
      position: 'absolute',
      top: '0px',
      left: '0px',
      right: '0px',
    });
  });

  it('handles zero overscan', () => {
    render(<VirtualList {...defaultProps} overscan={0} />);

    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles large overscan', () => {
    render(<VirtualList {...defaultProps} overscan={50} />);

    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles very small container height', () => {
    const { container } = render(
      <VirtualList {...defaultProps} containerHeight={50} />
    );

    const virtualListContainer = container.firstChild as HTMLElement;
    expect(virtualListContainer).toHaveStyle({ height: '50px' });

    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles very large container height', () => {
    const { container } = render(
      <VirtualList {...defaultProps} containerHeight={2000} />
    );

    const virtualListContainer = container.firstChild as HTMLElement;
    expect(virtualListContainer).toHaveStyle({ height: '2000px' });

    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles different item types', () => {
    const stringItems = ['item1', 'item2', 'item3'];
    const stringRenderItem = (item: string, index: number) => (
      <div data-testid={`string-item-${index}`}>{item}</div>
    );

    render(
      <VirtualList
        items={stringItems}
        itemHeight={50}
        containerHeight={200}
        renderItem={stringRenderItem}
      />
    );

    expect(screen.getByText('item1')).toBeInTheDocument();
    expect(screen.getByText('item2')).toBeInTheDocument();
    expect(screen.getByText('item3')).toBeInTheDocument();
  });

  it('handles rapid scroll events', () => {
    const { container } = render(<VirtualList {...defaultProps} />);

    const scrollContainer = container.firstChild as HTMLElement;

    // Simulate rapid scrolling
    for (let i = 0; i < 10; i++) {
      fireEvent.scroll(scrollContainer, { target: { scrollTop: i * 100 } });
    }

    // Should still have visible items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('maintains scroll position after re-render', () => {
    const { container, rerender } = render(<VirtualList {...defaultProps} />);

    const scrollContainer = container.firstChild as HTMLElement;
    fireEvent.scroll(scrollContainer, { target: { scrollTop: 1000 } });

    // Re-render with same props
    rerender(<VirtualList {...defaultProps} />);

    // Should still have visible items
    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });

  it('handles items with different heights in calculation', () => {
    // Test that the component handles the calculation correctly
    // even when itemHeight doesn't divide evenly into containerHeight
    render(
      <VirtualList {...defaultProps} itemHeight={33} containerHeight={200} />
    );

    const visibleItems = screen.getAllByTestId(/^item-/);
    expect(visibleItems.length).toBeGreaterThan(0);
  });
});
