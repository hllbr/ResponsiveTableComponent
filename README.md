# Responsive Table Component

A responsive table component that automatically adapts to viewport size with intelligent scrolling behavior.

## Features

### 🎯 Core Functionality

- **Viewport-based sizing**: Automatically fits to available screen space
- **No page scroll**: When content fits, table extends to fill viewport
- **Smart scrolling**: Only table body scrolls when content overflows
- **Full-row snap**: Ensures complete rows are visible (no partial rows)
- **Variable row heights**: Supports different content sizes (images, long text, etc.)

### 🔧 Layout Behavior

- **Short content**: `height: auto` - no gaps, no scroll
- **Long content**: `height: viewport-fit` with tbody scroll only
- **Sticky elements**: Header, filter, and pagination remain fixed
- **Responsive**: Adapts to window resize and content changes

### 📱 Responsive Design

- Uses `ResizeObserver` and `MutationObserver` for real-time updates
- RAF (RequestAnimationFrame) for smooth layout calculations
- Handles dynamic content changes gracefully

## Usage

```tsx
import TableSim from "./components/TableSim";

<TableSim
  pageSize={20}
  totalRows={1000}
  withFilter={true}
  withPagination={true}
  loading={false}
/>;
```

## Examples

### Basic Example (`/`)

Simple table with minimal data - demonstrates auto-height behavior.

### Full Page Example (`/full-page`)

Large dataset showing scroll behavior with sticky pagination.

### Variable Height Example (`/variable-height`)

Demonstrates full-row snap with rows of different heights:

- Simple rows (1 line)
- Complex rows (2-3 lines with metadata)
- Critical rows (with status indicators)

### Large Data Example (`/large-data`)

Performance testing with large datasets.

### No Pagination Example (`/no-pagination`)

Table without pagination - shows clean bottom edge.

### Loading Example (`/loading`)

Loading state demonstration.

### No Filter Example (`/no-filter`)

Table without filter controls.

## Technical Implementation

### useMeasureLayout Hook

The core layout logic is handled by the `useMeasureLayout` hook:

1. **Viewport Calculation**: `window.innerHeight - container.top - 8`
2. **Component Heights**: Header, filter, thead, tbody, pagination
3. **Layout Decision**:
   - If `naturalHeight <= availableViewport`: `height: auto`
   - If `naturalHeight > availableViewport`: `height: viewport-fit` with scroll
4. **Full-row Snap**: Calculates how many complete rows fit in available space

### Observers

- **ResizeObserver**: Watches all layout-affecting elements
- **MutationObserver**: Monitors content changes in scroll area
- **Window resize**: Handles viewport changes

### Edge Cases Handled

- No pagination (`Hp = 0`)
- Loading/empty states
- Dynamic content changes
- Variable row heights

## Browser Support

- Modern browsers with ResizeObserver support
- Fallback to standard resize events for older browsers

## Development

```bash
npm install
npm run dev
npm run build
```

## Testing

Navigate to `/variable-height` to test the full-row snap functionality with variable content heights.
