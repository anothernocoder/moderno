import { Splitter } from '@moderno/react'

export default function SplitterDemo() {
  return (
    <div style={{ height: '260px' }}>
      <Splitter
        panels={[
          { id: 'sidebar', minSize: 20, maxSize: 50, children: <div style={{ padding: 'var(--md-spacing-6)' }}>Sidebar</div> },
          { id: 'main', children: <div style={{ padding: 'var(--md-spacing-6)' }}>Main content</div> },
        ]}
        defaultSize={[30, 70]}
      />
    </div>
  )
}
