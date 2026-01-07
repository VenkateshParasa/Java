import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CodeBlock from '../../src/components/CodeBlock'

describe('CodeBlock Component', () => {
  it('renders code with language label', () => {
    const code = 'public class Hello { }'
    const language = 'java'

    render(<CodeBlock code={code} language={language} />)

    expect(screen.getByText('java')).toBeInTheDocument()
    expect(screen.getByText(/public class Hello/)).toBeInTheDocument()
  })

  it('shows copy button', () => {
    const code = 'console.log("test")'

    render(<CodeBlock code={code} language="javascript" />)

    expect(screen.getByLabelText('Copy code')).toBeInTheDocument()
  })

  it('displays code in pre element', () => {
    const code = 'const x = 10;'

    const { container } = render(<CodeBlock code={code} language="javascript" />)

    const preElement = container.querySelector('pre')
    expect(preElement).toBeInTheDocument()
  })
})
